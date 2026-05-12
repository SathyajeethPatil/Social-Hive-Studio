import { NextResponse } from "next/server";
import { jsonError, publicFilePath, requireAdminRequest, STUDIO_BUCKET } from "@/app/api/admin/_utils";

export async function GET() {
  const auth = await requireAdminRequest();
  if ("error" in auth) return auth.error;

  const { data, error } = await auth.admin
    .from("images")
    .select("*, categories(*)")
    .order("created_at", { ascending: false });

  if (error) return jsonError(error.message, 500);
  return NextResponse.json(data ?? []);
}

export async function POST(request: Request) {
  const auth = await requireAdminRequest();
  if ("error" in auth) return auth.error;

  const form = await request.formData();
  const file = form.get("file");
  const title = String(form.get("title") ?? "").trim();
  const description = String(form.get("description") ?? "").trim();
  const categoryId = String(form.get("category_id") ?? "").trim();

  if (!(file instanceof File)) return jsonError("Image file is required.");
  if (!file.type.startsWith("image/")) return jsonError("Only image uploads are allowed.");
  if (!title) return jsonError("Title is required.");
  if (!categoryId) return jsonError("Every image must belong to a category.");

  const { data: category } = await auth.admin.from("categories").select("id").eq("id", categoryId).single();
  if (!category) return jsonError("Selected category does not exist.");

  const path = publicFilePath("uploads", file);
  const upload = await auth.admin.storage.from(STUDIO_BUCKET).upload(path, file, {
    cacheControl: "31536000",
    upsert: false,
    contentType: file.type
  });

  if (upload.error) return jsonError(upload.error.message, 500);

  const {
    data: { publicUrl }
  } = auth.admin.storage.from(STUDIO_BUCKET).getPublicUrl(path);

  const { data, error } = await auth.admin
    .from("images")
    .insert({
      title,
      description: description || null,
      category_id: categoryId,
      image_url: publicUrl,
      show_on_home: form.has("show_on_home"),
      show_on_hall_of_fame: form.has("show_on_hall_of_fame")
    })
    .select("*, categories(*)")
    .single();

  if (error) {
    await auth.admin.storage.from(STUDIO_BUCKET).remove([path]);
    return jsonError(error.message, 500);
  }

  return NextResponse.json(data, { status: 201 });
}
