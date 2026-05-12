import { redirect } from "next/navigation";
import { getAdminEmails } from "@/lib/env";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function getCurrentAdmin() {
  const supabase = createServerSupabaseClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user?.email) return null;

  const isAdmin = getAdminEmails().includes(user.email.toLowerCase());
  return isAdmin ? user : null;
}

export async function requireAdmin() {
  const admin = await getCurrentAdmin();

  if (!admin) {
    redirect("/studio-admin-access");
  }

  return admin;
}
