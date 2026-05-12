import { NextResponse } from "next/server";
import { jsonError, requireAdminRequest } from "@/app/api/admin/_utils";
import { slugify } from "@/utils/slugify";

type Params = {
  params: { id: string };
};

export async function PATCH(request: Request, { params }: Params) {
  const auth = await requireAdminRequest();
  if ("error" in auth) return auth.error;

  const body = await request.json();
  const name = typeof body.name === "string" ? body.name.trim() : undefined;
  const slug = typeof body.slug === "string" ? body.slug.trim() : name ? slugify(name) : undefined;
  const thumbnailUrl =
    typeof body.thumbnail_url === "string" && body.thumbnail_url.trim()
      ? body.thumbnail_url.trim()
      : body.thumbnail_url === null
        ? null
        : undefined;

  if (name === "") return jsonError("Category name is required.");
  if (slug === "") return jsonError("Category slug is required.");

  const { data, error } = await auth.admin
    .from("categories")
    .update({
      ...(name !== undefined ? { name } : {}),
      ...(slug !== undefined ? { slug } : {}),
      ...(thumbnailUrl !== undefined ? { thumbnail_url: thumbnailUrl } : {})
    })
    .eq("id", params.id)
    .select("*")
    .single();

  if (error) return jsonError(error.message, 500);
  return NextResponse.json(data);
}

export async function DELETE(_request: Request, { params }: Params) {
  const auth = await requireAdminRequest();
  if ("error" in auth) return auth.error;

  const { count } = await auth.admin
    .from("images")
    .select("id", { count: "exact", head: true })
    .eq("category_id", params.id);

  if ((count ?? 0) > 0) {
    return jsonError("Move or delete images in this category before deleting it.");
  }

  const { error } = await auth.admin.from("categories").delete().eq("id", params.id);
  if (error) return jsonError(error.message, 500);
  return NextResponse.json({ ok: true });
}
