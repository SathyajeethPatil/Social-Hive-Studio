import type { Metadata } from "next";
import { CategoryCards } from "@/components/CategoryCards";
import { EmptyState } from "@/components/EmptyState";
import { PageShell } from "@/components/PageShell";
import { SectionIntro } from "@/components/SectionIntro";
import { getCategories } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Categories",
  description: "Browse Social Hive Studio photography and reels categories."
};

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <PageShell>
      <main className="px-6 pb-24 pt-36">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            eyebrow="Categories"
            title="Every concept gets its own little universe"
            body="Create categories in the CMS and they automatically become browsable pages with live galleries."
          />
          <div className="mt-12">
            {categories.length ? (
              <CategoryCards categories={categories} />
            ) : (
              <EmptyState title="No categories yet" body="Create your first category in the dashboard to open this page." />
            )}
          </div>
        </div>
      </main>
    </PageShell>
  );
}
