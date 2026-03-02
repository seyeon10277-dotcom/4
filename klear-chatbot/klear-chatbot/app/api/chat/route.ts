import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { retrieveContext } from "@/lib/rag";
import { vectorSearch } from "@/lib/embeddings";
import { getHistory, saveTurn } from "@/lib/memory";

export const runtime = "nodejs";

interface ChatRequest {
  message: string;
  apiKey: string;
  supabaseUrl?: string;
  supabaseKey?: string;
  sessionId?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ChatRequest;
    const { message, apiKey, supabaseUrl, supabaseKey, sessionId } = body;

    if (!apiKey || !apiKey.startsWith("sk-")) {
      return NextResponse.json(
        { error: "유효하지 않은 OpenAI API Key입니다. sk-로 시작하는 키를 입력하세요." },
        { status: 400 }
      );
    }
    if (!message?.trim()) {
      return NextResponse.json({ error: "메시지가 비어있습니다." }, { status: 400 });
    }

    const useSupabase = Boolean(supabaseUrl) && Boolean(supabaseKey) && Boolean(sessionId);

    // 1. Retrieve context
    let context: string;
    if (useSupabase) {
      context = await vectorSearch(message, supabaseUrl!, supabaseKey!, apiKey);
    } else {
      context = retrieveContext(message, 5);
    }

    // 2. Load conversation history from Supabase
    let history: { role: "user" | "assistant"; content: string }[] = [];
    if (useSupabase && sessionId) {
      history = await getHistory(sessionId, supabaseUrl!, supabaseKey!, 20);
    }

    // 3. Build system prompt
    const systemPrompt = `You are a 'Klear Brand Expert'. 
Answer the following question using only the provided context. 
If the information is not in the context, say "I don't have specific data on that, but I can check with the Klear team for you." 
Maintain a transparent, professional, and helpful tone.

--- Klear Brand Knowledge Base ---
${context}
--- End of Knowledge Base ---

Always answer in the same language as the user's question (Korean or English).
When answering in Korean, be professional and clear.`;

    // 4. Call OpenAI
    const openai = new OpenAI({ apiKey });

    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      { role: "system", content: systemPrompt },
      ...history.slice(-10).map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
      { role: "user", content: message },
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.2,
      messages,
    });

    const answer = completion.choices[0]?.message?.content ?? "응답을 생성할 수 없습니다.";

    // 5. Save to Supabase (non-blocking)
    if (useSupabase && sessionId) {
      saveTurn(sessionId, message, answer, supabaseUrl!, supabaseKey!).catch((err) =>
        console.error("[chat] saveTurn failed:", err)
      );
    }

    return NextResponse.json({ answer });
  } catch (err: unknown) {
    console.error("[chat/route] Error:", err);

    if (err && typeof err === "object" && "status" in err) {
      const apiErr = err as { status: number; message: string };
      if (apiErr.status === 401) {
        return NextResponse.json(
          { error: "OpenAI API Key가 유효하지 않습니다." },
          { status: 401 }
        );
      }
      if (apiErr.status === 429) {
        return NextResponse.json(
          { error: "API 요청 한도를 초과했습니다. 잠시 후 다시 시도해주세요." },
          { status: 429 }
        );
      }
    }

    return NextResponse.json(
      { error: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요." },
      { status: 500 }
    );
  }
}
