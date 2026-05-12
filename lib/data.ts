import { unstable_noStore as noStore } from "next/cache";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function getCategories() {
  noStore();
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function getCategoryBySlug(slug: string) {
  noStore();
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase.from("categories").select("*").eq("slug", slug).single();

  if (error) return null;
  return data;
}

export async function getImages(options?: {
  categoryId?: string;
  home?: boolean;
  hallOfFame?: boolean;
  limit?: number;
  query?: string;
}) {
  noStore();
  const supabase = createServerSupabaseClient();
  let request = supabase
    .from("images")
    .select("*, categories(*)")
    .order("created_at", { ascending: false });

  if (options?.categoryId) request = request.eq("category_id", options.categoryId);
  if (options?.home) request = request.eq("show_on_home", true);
  if (options?.hallOfFame) request = request.eq("show_on_hall_of_fame", true);
  if (options?.query) request = request.ilike("title", `%${options.query}%`);
  if (options?.limit) request = request.limit(options.limit);

  const { data, error } = await request;

  if (error) throw error;
  return data ?? [];
}

export async function getDashboardStats() {
  noStore();
  const supabase = createServerSupabaseClient();
  const [images, categories, home, fame] = await Promise.all([
    supabase.from("images").select("id, category_id, created_at, title, image_url, categories(name)", { count: "exact" }),
    supabase.from("categories").select("id, name", { count: "exact" }),
    supabase.from("images").select("id", { count: "exact", head: true }).eq("show_on_home", true),
    supabase.from("images").select("id", { count: "exact", head: true }).eq("show_on_hall_of_fame", true)
  ]);

  const uploadsByCategory = (images.data ?? []).reduce<Record<string, number>>((acc, image) => {
    const categoryName = Array.isArray(image.categories)
      ? image.categories[0]?.name
      : image.categories?.name;
    const key = categoryName ?? "Uncategorized";
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {});

  return {
    totalImages: images.count ?? 0,
    totalCategories: categories.count ?? 0,
    totalHome: home.count ?? 0,
    totalFame: fame.count ?? 0,
    latestUploads: (images.data ?? []).slice(0, 6),
    uploadsByCategory
  };
}
