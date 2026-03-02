import { createClient, SupabaseClient } from "@supabase/supabase-js";

/**
 * Create a Supabase client with user-provided credentials.
 * Called on the server side (API routes) only.
 */
export function getSupabaseClient(url: string, key: string): SupabaseClient {
  return createClient(url, key, {
    auth: { persistSession: false },
  });
}
