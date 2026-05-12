import type { Metadata } from "next";
import { Gallery } from "@/components/Gallery";
import { PageShell } from "@/components/PageShell";
import { SectionIntro } from "@/components/SectionIntro";
import { getCategories, getImages } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Hall of Fame",
  description: "A curated masonry gallery of Social Hive Studio's featured frames."
};

export default async function HallOfFamePage() {
  const [images, categories] = await Promise.all([getImages({ hallOfFame: true }), getCategories()]);

  return (
    <PageShell>
      <main className="px-6 pb-24 pt-36">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            eyebrow="Hall of Fame"
            title="The shots that earned main-feed energy"
            body="Only images marked Show on Hall of Fame in the dashboard appear in this curated wall."
          />
          <div className="mt-12">
            <Gallery
              images={images}
              categories={categories}
              masonry
              showFilters
              emptyTitle="No hall of fame images yet"
              emptyBody="Toggle Show on Hall of Fame on selected uploads to populate this showcase."
            />
          </div>
        </div>
      </main>
    </PageShell>
  );
}
