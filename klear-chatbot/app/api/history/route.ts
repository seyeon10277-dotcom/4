import { NextRequest, NextResponse } from "next/server";
import { getHistory } from "@/lib/memory";
import { clearHistory } from "@/lib/memory";

export const runtime = "nodejs";

// GET /api/history?sessionId=...&supabaseUrl=...&supabaseKey=...
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("sessionId");
    const supabaseUrl = searchParams.get("supabaseUrl");
    const supabaseKey = searchParams.get("supabaseKey");

    if (!sessionId || !supabaseUrl || !supabaseKey) {
      return NextResponse.json({ messages: [] });
    }

    const messages = await getHistory(sessionId, supabaseUrl, supabaseKey, 50);
    return NextResponse.json({ messages });
  } catch (err) {
    console.error("[history/route] GET error:", err);
    return NextResponse.json({ messages: [] });
  }
}

// DELETE /api/history - clear session history
export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId, supabaseUrl, supabaseKey } = body as {
      sessionId: string;
      supabaseUrl: string;
      supabaseKey: string;
    };

    if (!sessionId || !supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: "필수 파라미터가 누락되었습니다." },
        { status: 400 }
      );
    }

    await clearHistory(sessionId, supabaseUrl, supabaseKey);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[history/route] DELETE error:", err);
    return NextResponse.json(
      { error: "기록 삭제 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
