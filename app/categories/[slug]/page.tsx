import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { Gallery } from "@/components/Gallery";
import { PageShell } from "@/components/PageShell";
import { getCategoryBySlug, getImages } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const category: any = await getCategoryBySlug(params.slug);

  return {
    title: category?.name || "Category",
    description: category?.name
      ? `Explore ${category.name} by Social Hive Studio.`
      : "Social Hive Studio category gallery."
  };
}

export default async function CategoryDetailPage({
  params
}: {
  params: { slug: string };
}) {
  const category: any = await getCategoryBySlug(params.slug);

  if (!category) notFound();

const images: any[] = await getImages({ categoryId: category.id });
const hero = category.thumbnail_url || images?.[0]?.image_url;

  return (
    <PageShell>
      <main className="pb-24 pt-24">
        <section className="relative min-h-[56vh] overflow-hidden px-6 pt-20">
          {hero ? (
            <Image
              src={hero}
              alt={category.name}
              fill
              priority
              className="object-cover"
            />
          ) : null}

          <div className="absolute inset-0 bg-gradient-to-t from-blush via-blush/70 to-blush/20" />

          <div className="relative mx-auto flex min-h-[48vh] max-w-7xl flex-col justify-end pb-12">
            <Link
              href="/categories"
              className="mb-6 inline-flex w-fit items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm font-bold backdrop-blur"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Categories
            </Link>

            <p className="font-heading text-xs font-bold uppercase tracking-[0.24em] text-hivePink">
              Category
            </p>

            <h1 className="mt-3 max-w-4xl font-heading text-5xl font-extrabold md:text-7xl">
              {category.name}
            </h1>
          </div>
        </section>

        <section className="px-6">
          <div className="mx-auto max-w-7xl">
            <Gallery
              images={images}
              emptyTitle="No images in this category yet"
              emptyBody="Upload images and assign them to this category in the dashboard."
            />
          </div>
        </section>
      </main>
    </PageShell>
  );
}