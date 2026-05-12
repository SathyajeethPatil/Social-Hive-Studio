import { NextResponse } from "next/server";
import {
  jsonError,
  requireAdminRequest,
  storagePathFromPublicUrl,
  STUDIO_BUCKET
} from "@/app/api/admin/_utils";

type Params = {
  params: { id: string };
};

export async function PATCH(request: Request, { params }: Params) {
  const auth = await requireAdminRequest();
  if ("error" in auth) return auth.error;

  const body = await request.json();
  const title = typeof body.title === "string" ? body.title.trim() : undefined;
  const description = typeof body.description === "string" ? body.description.trim() : undefined;
  const categoryId = typeof body.category_id === "string" ? body.category_id.trim() : undefined;

  if (title === "") return jsonError("Title is required.");
  if (categoryId === "") return jsonError("Category is required.");

  if (categoryId) {
    const { data: category } = await auth.admin.from("categories").select("id").eq("id", categoryId).single();
    if (!category) return jsonError("Selected category does not exist.");
  }

  const { data, error } = await auth.admin
    .from("images")
    .update({
      ...(title !== undefined ? { title } : {}),
      ...(description !== undefined ? { description: description || null } : {}),
      ...(categoryId !== undefined ? { category_id: categoryId } : {}),
      ...(typeof body.show_on_home === "boolean" ? { show_on_home: body.show_on_home } : {}),
      ...(typeof body.show_on_hall_of_fame === "boolean"
        ? { show_on_hall_of_fame: body.show_on_hall_of_fame }
        : {})
    })
    .eq("id", params.id)
    .select("*, categories(*)")
    .single();

  if (error) return jsonError(error.message, 500);
  return NextResponse.json(data);
}

export async function DELETE(_request: Request, { params }: Params) {
  const auth = await requireAdminRequest();
  if ("error" in auth) return auth.error;

  const { data: existing, error: readError } = await auth.admin
    .from("images")
    .select("image_url")
    .eq("id", params.id)
    .single();

  if (readError) return jsonError(readError.message, 404);

  const { error } = await auth.admin.from("images").delete().eq("id", params.id);
  if (error) return jsonError(error.message, 500);

  const storagePath = storagePathFromPublicUrl(existing.image_url);
  if (storagePath) {
    await auth.admin.storage.from(STUDIO_BUCKET).remove([storagePath]);
  }

  return NextResponse.json({ ok: true });
}
