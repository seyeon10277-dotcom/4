import fs from "fs";
import path from "path";
import OpenAI from "openai";
import { getSupabaseClient } from "./supabase";
import { retrieveContext } from "./rag"; // keyword fallback

// ─────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────
interface Chunk {
  content: string;
  source: string;
}

interface SupabaseDocRow {
  id: number;
  content: string;
  source: string;
  similarity: number;
}

// ─────────────────────────────────────────────────────────────────
// Document loading (reused from rag.ts logic)
// ─────────────────────────────────────────────────────────────────
function parseCsvLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      inQuotes = !inQuotes;
    } else if (ch === "," && !inQuotes) {
      result.push(current);
      current = "";
    } else {
      current += ch;
    }
  }
  result.push(current);
  return result;
}

function loadTxtChunks(): Chunk[] {
  const filePath = path.join(process.cwd(), "data", "Klear_brand_guide.txt");
  const raw = fs.readFileSync(filePath, "utf-8");
  const sections = raw.split(/\n---\n/g).map((s) => s.trim()).filter(Boolean);

  const chunks: Chunk[] = [];
  for (const section of sections) {
    if (section.length <= 1200) {
      chunks.push({ content: section, source: "brand_guide" });
    } else {
      const parts = section.split(/\n{2,}/g);
      let buffer = "";
      for (const part of parts) {
        if ((buffer + part).length > 1000 && buffer.length > 0) {
          chunks.push({ content: buffer.trim(), source: "brand_guide" });
          buffer = part;
        } else {
          buffer += (buffer ? "\n\n" : "") + part;
        }
      }
      if (buffer.trim()) {
        chunks.push({ content: buffer.trim(), source: "brand_guide" });
      }
    }
  }
  return chunks;
}

function loadCsvChunks(): Chunk[] {
  const filePath = path.join(process.cwd(), "data", "klear_chatbot_db.csv");
  const raw = fs.readFileSync(filePath, "utf-8");
  const lines = raw.split(/\r?\n/).filter(Boolean);
  if (lines.length < 2) return [];

  const header = parseCsvLine(lines[0]);
  const chunks: Chunk[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCsvLine(lines[i]);
    if (values.length < 2) continue;
    const pairs: string[] = [];
    for (let j = 0; j < header.length; j++) {
      const key = header[j]?.trim();
      const val = values[j]?.trim();
      if (key && val && val !== "") {
        pairs.push(`${key}: ${val}`);
      }
    }
    if (pairs.length > 0) {
      chunks.push({ content: pairs.join("\n"), source: "chatbot_db" });
    }
  }
  return chunks;
}

// ─────────────────────────────────────────────────────────────────
// OpenAI Embedding
// ─────────────────────────────────────────────────────────────────

/**
 * Create a 1536-dim embedding vector for a given text.
 */
export async function embedText(
  text: string,
  apiKey: string
): Promise<number[]> {
  const openai = new OpenAI({ apiKey });
  const response = await openai.embeddings.create({
    model: "text-embedding-3-small", // 1536 dimensions
    input: text.slice(0, 8191), // token limit guard
  });
  return response.data[0].embedding;
}

// ─────────────────────────────────────────────────────────────────
// Setup: embed all documents and store in Supabase
// ─────────────────────────────────────────────────────────────────

export interface SetupResult {
  success: boolean;
  message: string;
  count?: number;
}

/**
 * Check if documents are already indexed in Supabase.
 */
export async function isAlreadySetup(
  supabaseUrl: string,
  supabaseKey: string
): Promise<boolean> {
  try {
    const supabase = getSupabaseClient(supabaseUrl, supabaseKey);
    const { count, error } = await supabase
      .from("klear_documents")
      .select("*", { count: "exact", head: true });
    if (error) return false;
    return (count ?? 0) > 0;
  } catch {
    return false;
  }
}

/**
 * Embed all Klear documents and store them in Supabase pgvector.
 * Skips if documents are already indexed.
 */
export async function setupDocuments(
  supabaseUrl: string,
  supabaseKey: string,
  openaiKey: string
): Promise<SetupResult> {
  const supabase = getSupabaseClient(supabaseUrl, supabaseKey);

  // Skip if already indexed
  const { count: existingCount, error: countError } = await supabase
    .from("klear_documents")
    .select("*", { count: "exact", head: true });

  if (countError) {
    return {
      success: false,
      message: `Supabase 연결 오류: ${countError.message}. supabase_setup.sql을 먼저 실행했는지 확인해주세요.`,
    };
  }

  if ((existingCount ?? 0) > 0) {
    return {
      success: true,
      message: `이미 ${existingCount}개의 문서가 인덱싱되어 있습니다.`,
      count: existingCount ?? 0,
    };
  }

  // Load all chunks
  const chunks = [...loadTxtChunks(), ...loadCsvChunks()];

  // Embed in batches of 10
  const BATCH_SIZE = 10;
  let inserted = 0;

  for (let i = 0; i < chunks.length; i += BATCH_SIZE) {
    const batch = chunks.slice(i, i + BATCH_SIZE);

    // Embed all in parallel
    const rows = await Promise.all(
      batch.map(async (chunk) => ({
        content: chunk.content,
        source: chunk.source,
        embedding: await embedText(chunk.content, openaiKey),
      }))
    );

    const { error: insertError } = await supabase
      .from("klear_documents")
      .insert(rows);

    if (insertError) {
      return {
        success: false,
        message: `문서 저장 오류 (batch ${i}): ${insertError.message}`,
      };
    }

    inserted += rows.length;
  }

  return {
    success: true,
    message: `✅ ${inserted}개의 문서를 벡터 DB에 인덱싱했습니다.`,
    count: inserted,
  };
}

// ─────────────────────────────────────────────────────────────────
// Vector search
// ─────────────────────────────────────────────────────────────────

/**
 * Search for the most relevant document chunks using pgvector.
 * Falls back to keyword search if Supabase search fails.
 */
export async function vectorSearch(
  query: string,
  supabaseUrl: string,
  supabaseKey: string,
  openaiKey: string,
  topK = 5
): Promise<string> {
  try {
    const embedding = await embedText(query, openaiKey);
    const supabase = getSupabaseClient(supabaseUrl, supabaseKey);

    const { data, error } = await supabase.rpc("match_klear_documents", {
      query_embedding: embedding,
      match_threshold: 0.4,
      match_count: topK,
    });

    if (error) {
      console.error("[vectorSearch] RPC error:", error.message);
      return retrieveContext(query, topK);
    }

    if (!data || (data as SupabaseDocRow[]).length === 0) {
      // Low similarity — fall back to keyword search
      return retrieveContext(query, topK);
    }

    return (data as SupabaseDocRow[])
      .map((d) => d.content)
      .join("\n\n---\n\n");
  } catch (err) {
    console.error("[vectorSearch] Error:", err);
    return retrieveContext(query, topK);
  }
}
