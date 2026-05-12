import { NextResponse } from "next/server";
import { getAdminEmails } from "@/lib/env";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const STUDIO_BUCKET = "studio-images";

export async function requireAdminRequest() {
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
    error
  } = await supabase.auth.getUser();

  if (error || !user?.email || !getAdminEmails().includes(user.email.toLowerCase())) {
    return { error: NextResponse.json({ message: "Unauthorized" }, { status: 401 }) };
  }

  return { user, admin: createAdminSupabaseClient() };
}

export function jsonError(message: string, status = 400) {
  return NextResponse.json({ message }, { status });
}

export function publicFilePath(folder: string, file: File) {
  const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const safeName = file.name
    .replace(/\.[^/.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
    .slice(0, 48);

  return `${folder}/${Date.now()}-${crypto.randomUUID()}-${safeName}.${extension}`;
}

export function storagePathFromPublicUrl(url: string) {
  const marker = `/storage/v1/object/public/${STUDIO_BUCKET}/`;
  const index = url.indexOf(marker);
  if (index === -1) return null;
  return decodeURIComponent(url.slice(index + marker.length));
}
