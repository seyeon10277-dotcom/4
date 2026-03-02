"use client";

import { useState, useRef, useEffect, useCallback } from "react";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
interface Message {
  role: "user" | "assistant";
  content: string;
}

type DbStatus = "idle" | "checking" | "ready" | "error";

// ─────────────────────────────────────────────
// Loading dots
// ─────────────────────────────────────────────
function LoadingDots() {
  return (
    <div className="flex items-center gap-1 py-1">
      <span className="dot" />
      <span className="dot" />
      <span className="dot" />
    </div>
  );
}

// ─────────────────────────────────────────────
// Status badge
// ─────────────────────────────────────────────
function StatusBadge({ status }: { status: DbStatus }) {
  const map: Record<DbStatus, { color: string; label: string }> = {
    idle:     { color: "bg-gray-300",   label: "미연결" },
    checking: { color: "bg-yellow-400", label: "확인 중..." },
    ready:    { color: "bg-green-500",  label: "벡터 DB 준비완료" },
    error:    { color: "bg-red-400",    label: "오류" },
  };
  const { color, label } = map[status];
  return (
    <div className="flex items-center gap-1.5">
      <span className={`inline-block w-2 h-2 rounded-full ${color}`} />
      <span className="text-xs text-gray-500">{label}</span>
    </div>
  );
}

// ─────────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────────
export default function Home() {
  // Credentials
  const [apiKey, setApiKey]         = useState("");
  const [supabaseUrl, setSupabaseUrl] = useState("");
  const [supabaseKey, setSupabaseKey] = useState("");

  // Session
  const [sessionId, setSessionId]   = useState("");

  // Chat state
  const [messages, setMessages]     = useState<Message[]>([]);
  const [input, setInput]           = useState("");
  const [isLoading, setIsLoading]   = useState(false);
  const [error, setError]           = useState("");

  // DB state
  const [dbStatus, setDbStatus]     = useState<DbStatus>("idle");
  const [dbMessage, setDbMessage]   = useState("");
  const [isSettingUp, setIsSettingUp] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);

  // UI
  const [sidebarOpen, setSidebarOpen]   = useState(true);
  const [showSupabase, setShowSupabase] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLTextAreaElement>(null);

  const hasSupabase = Boolean(supabaseUrl && supabaseKey);

  // ── On mount: restore from localStorage ──────────────────────
  useEffect(() => {
    const savedApiKey      = localStorage.getItem("klear_api_key") ?? "";
    const savedSupabaseUrl = localStorage.getItem("klear_supabase_url") ?? "";
    const savedSupabaseKey = localStorage.getItem("klear_supabase_key") ?? "";

    setApiKey(savedApiKey);
    setSupabaseUrl(savedSupabaseUrl);
    setSupabaseKey(savedSupabaseKey);

    if (savedSupabaseUrl || savedSupabaseKey) {
      setShowSupabase(true);
    }

    // Session ID
    let sid = localStorage.getItem("klear_session_id");
    if (!sid) {
      sid = crypto.randomUUID();
      localStorage.setItem("klear_session_id", sid);
    }
    setSessionId(sid);
  }, []);

  // ── Auto-scroll ───────────────────────────────────────────────
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // ── Load history when session + supabase credentials are ready ─
  const loadHistory = useCallback(
    async (sid: string, url: string, key: string) => {
      if (!sid || !url || !key) return;
      setIsLoadingHistory(true);
      try {
        const params = new URLSearchParams({
          sessionId: sid,
          supabaseUrl: url,
          supabaseKey: key,
        });
        const res = await fetch(`/api/history?${params.toString()}`);
        const data = await res.json();
        if (data.messages && data.messages.length > 0) {
          setMessages(data.messages);
        }
      } catch (e) {
        console.error("Failed to load history:", e);
      } finally {
        setIsLoadingHistory(false);
      }
    },
    []
  );

  // Trigger history load when all three are available
  useEffect(() => {
    if (sessionId && supabaseUrl && supabaseKey) {
      loadHistory(sessionId, supabaseUrl, supabaseKey);
    }
  }, [sessionId, supabaseUrl, supabaseKey, loadHistory]);

  // ── Setup vector DB ───────────────────────────────────────────
  const handleSetup = async () => {
    if (!apiKey || !supabaseUrl || !supabaseKey) {
      setError("OpenAI API Key와 Supabase 정보를 모두 입력해주세요.");
      return;
    }
    setIsSettingUp(true);
    setDbStatus("checking");
    setDbMessage("");
    setError("");

    try {
      const res = await fetch("/api/setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiKey, supabaseUrl, supabaseKey }),
      });
      const data = await res.json();

      if (data.success) {
        setDbStatus("ready");
        setDbMessage(data.message);
      } else {
        setDbStatus("error");
        setDbMessage(data.message ?? data.error ?? "초기화 실패");
      }
    } catch {
      setDbStatus("error");
      setDbMessage("네트워크 오류. 다시 시도해주세요.");
    } finally {
      setIsSettingUp(false);
    }
  };

  // ── Send message ──────────────────────────────────────────────
  const handleSend = async () => {
    const text = input.trim();
    if (!text || isLoading) return;
    if (!apiKey) {
      setError("OpenAI API Key를 먼저 입력해주세요.");
      return;
    }

    setError("");
    const optimistic: Message[] = [...messages, { role: "user", content: text }];
    setMessages(optimistic);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          apiKey,
          ...(hasSupabase && sessionId
            ? { supabaseUrl, supabaseKey, sessionId }
            : {}),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "오류가 발생했습니다.");
        setMessages(messages); // rollback
      } else {
        setMessages([...optimistic, { role: "assistant", content: data.answer }]);
      }
    } catch {
      setError("네트워크 오류가 발생했습니다.");
      setMessages(messages);
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  };

  // ── Reset chat ────────────────────────────────────────────────
  const handleReset = async () => {
    setMessages([]);
    setError("");

    if (hasSupabase && sessionId) {
      try {
        await fetch("/api/history", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId, supabaseUrl, supabaseKey }),
        });
      } catch {
        // ignore
      }
    }
  };

  // ── New session ───────────────────────────────────────────────
  const handleNewSession = () => {
    const newId = crypto.randomUUID();
    localStorage.setItem("klear_session_id", newId);
    setSessionId(newId);
    setMessages([]);
    setError("");
  };

  // ── Credential helpers ────────────────────────────────────────
  const updateApiKey = (val: string) => {
    setApiKey(val);
    localStorage.setItem("klear_api_key", val);
  };
  const updateSupabaseUrl = (val: string) => {
    setSupabaseUrl(val);
    localStorage.setItem("klear_supabase_url", val);
    if (dbStatus !== "idle") setDbStatus("idle");
  };
  const updateSupabaseKey = (val: string) => {
    setSupabaseKey(val);
    localStorage.setItem("klear_supabase_key", val);
    if (dbStatus !== "idle") setDbStatus("idle");
  };

  // ── Enter key ─────────────────────────────────────────────────
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // ── Sample questions ──────────────────────────────────────────
  const sampleQuestions = [
    "Snail Mucin 제품의 주요 성분은?",
    "KLR-001의 TikTok 훅 문구를 알려줘",
    "What are the brand values of Klear?",
    "어성초 토너 패드 사용법 알려줘",
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-klear-cream">

      {/* ── Sidebar ──────────────────────────────────────────── */}
      <aside
        className={`flex flex-col bg-white border-r border-gray-200 transition-all duration-300 flex-shrink-0 ${
          sidebarOpen ? "w-72" : "w-0 overflow-hidden"
        }`}
      >
        <div className="flex flex-col h-full p-5 gap-4 overflow-y-auto">

          {/* Brand */}
          <div className="flex items-center gap-2 pt-1">
            <span className="text-2xl">🌿</span>
            <div>
              <h1 className="text-base font-bold text-klear-darkGreen leading-tight">Klear Brand AI</h1>
              <p className="text-xs text-gray-400">Intelligence System v2</p>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* OpenAI API Key */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              🔑 OpenAI API Key
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => updateApiKey(e.target.value)}
              placeholder="sk-..."
              className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-klear-green bg-gray-50 placeholder-gray-300"
            />
          </div>

          <hr className="border-gray-100" />

          {/* Supabase section */}
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setShowSupabase((v) => !v)}
              className="flex items-center justify-between text-xs font-semibold text-gray-500 uppercase tracking-wide hover:text-klear-green"
            >
              <span>🗄️ Supabase (영구 메모리)</span>
              <span>{showSupabase ? "▲" : "▼"}</span>
            </button>

            {showSupabase && (
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  value={supabaseUrl}
                  onChange={(e) => updateSupabaseUrl(e.target.value)}
                  placeholder="https://xxxx.supabase.co"
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-klear-green bg-gray-50 placeholder-gray-300"
                />
                <input
                  type="password"
                  value={supabaseKey}
                  onChange={(e) => updateSupabaseKey(e.target.value)}
                  placeholder="Supabase Anon Key"
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-klear-green bg-gray-50 placeholder-gray-300"
                />

                <StatusBadge status={dbStatus} />
                {dbMessage && (
                  <p className={`text-xs ${dbStatus === "error" ? "text-red-500" : "text-klear-green"}`}>
                    {dbMessage}
                  </p>
                )}

                <button
                  onClick={handleSetup}
                  disabled={isSettingUp || !apiKey || !supabaseUrl || !supabaseKey}
                  className="w-full py-2 text-xs font-medium bg-klear-green text-white rounded-lg hover:bg-klear-darkGreen disabled:bg-gray-200 disabled:cursor-not-allowed transition-colors"
                >
                  {isSettingUp ? "⏳ 초기화 중..." : "🚀 벡터 DB 초기화"}
                </button>

                <p className="text-xs text-gray-400">
                  처음 1회만 실행. 이후엔 자동으로 벡터 검색 + 대화 기억이 활성화됩니다.
                </p>
              </div>
            )}
          </div>

          <hr className="border-gray-100" />

          {/* Session info */}
          {hasSupabase && sessionId && (
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                🔁 세션
              </label>
              <p className="text-xs text-gray-400 break-all font-mono">
                {sessionId.slice(0, 8)}...
              </p>
              {isLoadingHistory && (
                <p className="text-xs text-klear-green">📂 이전 대화 불러오는 중...</p>
              )}
              <button
                onClick={handleNewSession}
                className="text-xs text-gray-400 hover:text-klear-green text-left"
              >
                + 새 세션 시작
              </button>
            </div>
          )}

          {/* Klear identity */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              🌿 Klear Identity
            </label>
            <div className="bg-klear-lightGreen rounded-lg p-3 flex flex-col gap-1">
              <span className="text-xs text-klear-darkGreen font-medium">Target</span>
              <span className="text-xs text-gray-600">US Gen Z &amp; Millennials</span>
              <span className="text-xs text-klear-darkGreen font-medium mt-1">Values</span>
              <span className="text-xs text-gray-600">Radical Transparency · Barrier Science</span>
            </div>
          </div>

          {/* Sample questions */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              💬 예시 질문
            </label>
            {sampleQuestions.map((q) => (
              <button
                key={q}
                onClick={() => { setInput(q); inputRef.current?.focus(); }}
                className="text-left text-xs text-klear-green bg-klear-lightGreen hover:bg-klear-green hover:text-white rounded-lg px-3 py-2 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>

          <div className="flex-1" />

          {/* Reset */}
          <button
            onClick={handleReset}
            className="w-full py-2 text-sm text-red-500 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
          >
            🗑️ 대화 기록 초기화
          </button>

          <p className="text-xs text-gray-300 text-center">
            {hasSupabase ? "pgvector RAG · 영구 메모리" : "키워드 RAG · 임시 메모리"}
          </p>
        </div>
      </aside>

      {/* ── Main chat ─────────────────────────────────────────── */}
      <div className="flex flex-col flex-1 overflow-hidden">

        {/* Header */}
        <header className="flex items-center gap-3 bg-white border-b border-gray-200 px-5 py-3 shadow-sm">
          <button
            onClick={() => setSidebarOpen((v) => !v)}
            className="text-gray-400 hover:text-klear-green p-1 rounded"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <span className="text-xl">🌿</span>
          <div className="flex-1">
            <h2 className="text-sm font-bold text-klear-darkGreen">Klear Intelligence</h2>
            <p className="text-xs text-gray-400">
              {hasSupabase
                ? "🔗 Supabase 연결됨 · 벡터 검색 + 영구 대화 기억"
                : "Klear 브랜드 AI · 키워드 검색 모드"}
            </p>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-5 flex flex-col gap-4">

          {/* Welcome */}
          {messages.length === 0 && !isLoading && !isLoadingHistory && (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <div className="text-5xl">🌿</div>
              <div>
                <h3 className="text-xl font-bold text-klear-darkGreen mb-1">
                  Klear Brand AI에 오신 것을 환영합니다
                </h3>
                <p className="text-sm text-gray-500 max-w-md">
                  Klear 브랜드 제품, 성분, 마케팅 전략에 대해 무엇이든 질문하세요.
                  <br />
                  한국어·영어 모두 지원합니다.
                </p>
              </div>

              {!apiKey && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-3 text-sm text-amber-700 max-w-sm">
                  ⚠️ 사이드바에서 <strong>OpenAI API Key</strong>를 먼저 입력해주세요.
                </div>
              )}

              {apiKey && !hasSupabase && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl px-5 py-3 text-sm text-blue-700 max-w-md">
                  💡 <strong>Supabase</strong>를 연결하면 대화가 영구 저장되고 벡터 검색이 활성화됩니다.
                  <br />
                  사이드바에서 Supabase 정보를 입력하세요.
                </div>
              )}

              {hasSupabase && dbStatus !== "ready" && (
                <div className="bg-green-50 border border-green-200 rounded-xl px-5 py-3 text-sm text-green-700 max-w-md">
                  🚀 Supabase가 연결되었습니다. 사이드바에서 <strong>벡터 DB 초기화</strong>를 한 번 실행하세요.
                </div>
              )}
            </div>
          )}

          {/* Loading history */}
          {isLoadingHistory && (
            <div className="flex justify-center py-8">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <LoadingDots />
                <span>이전 대화를 불러오는 중...</span>
              </div>
            </div>
          )}

          {/* Chat bubbles */}
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`message-bubble flex gap-3 ${
                msg.role === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <div
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-sm ${
                  msg.role === "user"
                    ? "bg-klear-green text-white font-bold"
                    : "bg-klear-lightGreen text-klear-darkGreen"
                }`}
              >
                {msg.role === "user" ? "U" : "🌿"}
              </div>
              <div
                className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  msg.role === "user"
                    ? "bg-klear-green text-white rounded-tr-sm"
                    : "bg-white text-gray-800 rounded-tl-sm border border-gray-100"
                }`}
                style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {/* AI thinking */}
          {isLoading && (
            <div className="message-bubble flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-klear-lightGreen text-klear-darkGreen flex items-center justify-center">
                🌿
              </div>
              <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                <LoadingDots />
                <p className="text-xs text-gray-400 mt-1">
                  {hasSupabase ? "벡터 DB 탐색 중..." : "Klear DB 탐색 중..."}
                </p>
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-600 flex items-start gap-2">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="border-t border-gray-200 bg-white px-4 py-3">
          <div className="flex gap-2 items-end max-w-4xl mx-auto">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="질문을 입력하세요 — Enter로 전송, Shift+Enter로 줄바꿈"
              rows={1}
              disabled={isLoading}
              className="flex-1 resize-none px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-klear-green bg-gray-50 placeholder-gray-300 max-h-32"
              style={{ minHeight: "48px" }}
              onInput={(e) => {
                const el = e.currentTarget;
                el.style.height = "auto";
                el.style.height = Math.min(el.scrollHeight, 128) + "px";
              }}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="flex-shrink-0 w-11 h-11 rounded-xl bg-klear-green hover:bg-klear-darkGreen disabled:bg-gray-200 disabled:cursor-not-allowed flex items-center justify-center transition-colors shadow-sm"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
          <p className="text-center text-xs text-gray-300 mt-2">
            Klear Intelligence · gpt-4o-mini ·{" "}
            {hasSupabase ? "pgvector + Supabase 메모리" : "키워드 RAG"}
          </p>
        </div>
      </div>
    </div>
  );
}
