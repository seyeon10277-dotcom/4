import fs from "fs";
import path from "path";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
interface Chunk {
  content: string;
  source: string;
}

// ─────────────────────────────────────────────
// 1. Load & chunk the brand guide TXT
// ─────────────────────────────────────────────
function loadTxtChunks(): Chunk[] {
  const filePath = path.join(process.cwd(), "data", "Klear_brand_guide.txt");
  const raw = fs.readFileSync(filePath, "utf-8");

  // Split on markdown heading separators (---) to get product/section blocks
  const sections = raw.split(/\n---\n/g).map((s) => s.trim()).filter(Boolean);

  const chunks: Chunk[] = [];
  for (const section of sections) {
    // Further split large sections into ~800-char pieces
    if (section.length <= 1200) {
      chunks.push({ content: section, source: "brand_guide" });
    } else {
      // Split on double newlines
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

// ─────────────────────────────────────────────
// 2. Load & chunk the CSV chatbot DB
// ─────────────────────────────────────────────
function loadCsvChunks(): Chunk[] {
  const filePath = path.join(process.cwd(), "data", "klear_chatbot_db.csv");
  const raw = fs.readFileSync(filePath, "utf-8");

  const lines = raw.split(/\r?\n/).filter(Boolean);
  if (lines.length < 2) return [];

  // Parse header
  const header = parseCsvLine(lines[0]);
  const chunks: Chunk[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCsvLine(lines[i]);
    if (values.length < 2) continue;

    // Convert row to key:value text block
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

// Minimal CSV line parser (handles quoted fields)
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

// ─────────────────────────────────────────────
// 3. Simple TF-IDF-like retrieval
// ─────────────────────────────────────────────
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s가-힣]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1);
}

function scoreSimilarity(query: string, chunk: string): number {
  const qTokens = new Set(tokenize(query));
  const cTokens = tokenize(chunk);

  let matchCount = 0;
  for (const token of cTokens) {
    if (qTokens.has(token)) matchCount++;
  }

  // Normalize by query length to avoid bias toward long chunks
  return matchCount / (qTokens.size + 1);
}

// ─────────────────────────────────────────────
// 4. Public API
// ─────────────────────────────────────────────
let _cachedChunks: Chunk[] | null = null;

function getAllChunks(): Chunk[] {
  if (!_cachedChunks) {
    _cachedChunks = [...loadTxtChunks(), ...loadCsvChunks()];
  }
  return _cachedChunks;
}

/**
 * Retrieve the top-k most relevant chunks for a given query.
 */
export function retrieveContext(query: string, topK = 5): string {
  const chunks = getAllChunks();

  const scored = chunks.map((chunk) => ({
    chunk,
    score: scoreSimilarity(query, chunk.content),
  }));

  scored.sort((a, b) => b.score - a.score);

  const topChunks = scored
    .slice(0, topK)
    .filter((s) => s.score > 0)
    .map((s) => s.chunk.content);

  // If nothing matched, return the first few chunks as fallback
  if (topChunks.length === 0) {
    return chunks
      .slice(0, 3)
      .map((c) => c.content)
      .join("\n\n---\n\n");
  }

  return topChunks.join("\n\n---\n\n");
}
