import { NextRequest, NextResponse } from "next/server";
import { setupDocuments, isAlreadySetup } from "@/lib/embeddings";

export const runtime = "nodejs";

interface SetupRequest {
  apiKey: string;
  supabaseUrl: string;
  supabaseKey: string;
  force?: boolean;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as SetupRequest;
    const { apiKey, supabaseUrl, supabaseKey, force = false } = body;

    if (!apiKey || !apiKey.startsWith("sk-")) {
      return NextResponse.json(
        { error: "유효하지 않은 OpenAI API Key입니다." },
        { status: 400 }
      );
    }
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: "Supabase URL과 API Key를 모두 입력해주세요." },
        { status: 400 }
      );
    }

    // Check if already set up (unless force re-index)
    if (!force) {
      const already = await isAlreadySetup(supabaseUrl, supabaseKey);
      if (already) {
        return NextResponse.json({
          success: true,
          message: "이미 벡터 DB가 초기화되어 있습니다. 바로 사용 가능합니다.",
          alreadyDone: true,
        });
      }
    }

    // Embed and store all documents
    const result = await setupDocuments(supabaseUrl, supabaseKey, apiKey);

    return NextResponse.json(result, { status: result.success ? 200 : 500 });
  } catch (err: unknown) {
    console.error("[setup/route] Error:", err);
    return NextResponse.json(
      {
        success: false,
        error: "초기화 중 오류가 발생했습니다. Supabase 설정을 확인해주세요.",
      },
      { status: 500 }
    );
  }
}
