import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";
import { getServiceRoleKey, getSupabaseEnv } from "@/lib/env";

export function createAdminSupabaseClient() {
  const { url } = getSupabaseEnv();

  return createClient<Database>(url, getServiceRoleKey(), {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}
