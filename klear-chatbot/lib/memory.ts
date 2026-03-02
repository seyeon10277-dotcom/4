import { getSupabaseClient } from "./supabase";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

/**
 * Save a single message to Supabase.
 */
export async function saveMessage(
  sessionId: string,
  role: "user" | "assistant",
  content: string,
  supabaseUrl: string,
  supabaseKey: string
): Promise<void> {
  const supabase = getSupabaseClient(supabaseUrl, supabaseKey);
  const { error } = await supabase.from("klear_messages").insert({
    session_id: sessionId,
    role,
    content,
  });
  if (error) {
    console.error("[memory] saveMessage error:", error.message);
  }
}

/**
 * Save both user and assistant messages in one call.
 */
export async function saveTurn(
  sessionId: string,
  userMessage: string,
  assistantMessage: string,
  supabaseUrl: string,
  supabaseKey: string
): Promise<void> {
  const supabase = getSupabaseClient(supabaseUrl, supabaseKey);
  const { error } = await supabase.from("klear_messages").insert([
    { session_id: sessionId, role: "user", content: userMessage },
    { session_id: sessionId, role: "assistant", content: assistantMessage },
  ]);
  if (error) {
    console.error("[memory] saveTurn error:", error.message);
  }
}

/**
 * Load the last `limit` messages for a session.
 */
export async function getHistory(
  sessionId: string,
  supabaseUrl: string,
  supabaseKey: string,
  limit = 30
): Promise<ChatMessage[]> {
  const supabase = getSupabaseClient(supabaseUrl, supabaseKey);
  const { data, error } = await supabase
    .from("klear_messages")
    .select("role, content")
    .eq("session_id", sessionId)
    .order("created_at", { ascending: true })
    .limit(limit);

  if (error) {
    console.error("[memory] getHistory error:", error.message);
    return [];
  }

  return (data ?? []) as ChatMessage[];
}

/**
 * Delete all messages for a session (reset).
 */
export async function clearHistory(
  sessionId: string,
  supabaseUrl: string,
  supabaseKey: string
): Promise<void> {
  const supabase = getSupabaseClient(supabaseUrl, supabaseKey);
  const { error } = await supabase
    .from("klear_messages")
    .delete()
    .eq("session_id", sessionId);
  if (error) {
    console.error("[memory] clearHistory error:", error.message);
  }
}
