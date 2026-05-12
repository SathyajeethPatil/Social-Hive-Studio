import { NextResponse } from "next/server";
import { jsonError, publicFilePath, requireAdminRequest, STUDIO_BUCKET } from "@/app/api/admin/_utils";
import { slugify } from "@/utils/slugify";

export async function GET() {
  const auth = await requireAdminRequest();
  if ("error" in auth) return auth.error;

  const { data, error } = await auth.admin
    .from("categories")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return jsonError(error.message, 500);
  return NextResponse.json(data ?? []);
}

export async function POST(request: Request) {
  const auth = await requireAdminRequest();
  if ("error" in auth) return auth.error;

  const contentType = request.headers.get("content-type") ?? "";
  let name = "";
  let slug = "";
  let thumbnailUrl: string | null = null;

  if (contentType.includes("multipart/form-data")) {
    const form = await request.formData();
    name = String(form.get("name") ?? "").trim();
    slug = String(form.get("slug") || slugify(name)).trim();
    thumbnailUrl = String(form.get("thumbnail_url") ?? "").trim() || null;

    const file = form.get("thumbnail_file");
    if (file instanceof File && file.size > 0) {
      if (!file.type.startsWith("image/")) return jsonError("Category thumbnail must be an image.");
      const path = publicFilePath("category-thumbnails", file);
      const upload = await auth.admin.storage.from(STUDIO_BUCKET).upload(path, file, {
        cacheControl: "31536000",
        upsert: false,
        contentType: file.type
      });
      if (upload.error) return jsonError(upload.error.message, 500);
      thumbnailUrl = auth.admin.storage.from(STUDIO_BUCKET).getPublicUrl(path).data.publicUrl;
    }
  } else {
    const body = await request.json();
    name = String(body.name ?? "").trim();
    slug = String(body.slug || slugify(name)).trim();
    thumbnailUrl = typeof body.thumbnail_url === "string" && body.thumbnail_url.trim() ? body.thumbnail_url.trim() : null;
  }

  if (!name) return jsonError("Category name is required.");
  if (!slug) return jsonError("Category slug is required.");

  const { data, error } = await auth.admin
    .from("categories")
    .insert({ name, slug, thumbnail_url: thumbnailUrl })
    .select("*")
    .single();

  if (error) return jsonError(error.message, 500);
  return NextResponse.json(data, { status: 201 });
}
