"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Search, X, ZoomIn } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import type { Category, StudioImage } from "@/types/database";
import { EmptyState } from "@/components/EmptyState";
import { cn } from "@/utils/cn";

type GalleryProps = {
  images: StudioImage[];
  categories?: Category[];
  masonry?: boolean;
  showFilters?: boolean;
  emptyTitle?: string;
  emptyBody?: string;
};

export function Gallery({
  images,
  categories = [],
  masonry = false,
  showFilters = false,
  emptyTitle = "No images yet",
  emptyBody = "The studio gallery is waiting for its first upload."
}: GalleryProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [active, setActive] = useState<StudioImage | null>(null);
  const [visibleCount, setVisibleCount] = useState(12);

  const filtered = useMemo(() => {
    return images.filter((image) => {
      const matchesQuery =
        image.title.toLowerCase().includes(query.toLowerCase()) ||
        (image.description ?? "").toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === "all" || image.category_id === category;
      return matchesQuery && matchesCategory;
    });
  }, [category, images, query]);

  const visibleImages = filtered.slice(0, visibleCount);

  useEffect(() => {
    setVisibleCount(12);
  }, [category, query]);

  return (
    <div>
      {showFilters ? (
        <div className="glass mb-8 grid gap-3 rounded-[1.5rem] p-3 md:grid-cols-[1fr_220px]">
          <label className="flex items-center gap-3 rounded-2xl bg-white/60 px-4 py-3">
            <Search className="h-5 w-5 text-hivePink" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search gallery"
              className="w-full bg-transparent text-sm font-semibold outline-none placeholder:text-muted"
            />
          </label>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="rounded-2xl border-0 bg-white/60 px-4 py-3 text-sm font-bold outline-none"
          >
            <option value="all">All categories</option>
            {categories.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      ) : null}

      {filtered.length === 0 ? (
        <EmptyState title={emptyTitle} body={emptyBody} />
      ) : (
        <div className={masonry ? "masonry" : "grid gap-5 sm:grid-cols-2 lg:grid-cols-3"}>
          {visibleImages.map((image, index) => (
            <motion.button
              key={image.id}
              type="button"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: Math.min(index * 0.04, 0.3) }}
              whileHover={{ y: -8, rotateX: 2, rotateY: -2 }}
              onClick={() => setActive(image)}
              className={cn(
                "group relative overflow-hidden rounded-[1.5rem] bg-card text-left shadow-glass outline-none ring-hivePink/40 transition focus-visible:ring-4",
                masonry && "masonry-item block w-full"
              )}
            >
              <div className={cn("relative", masonry ? "h-auto" : "h-72")}>
                <Image
                  src={image.image_url}
                  alt={image.title}
                  width={900}
                  height={masonry ? 1100 : 700}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className={cn(
                    "w-full object-cover transition duration-500 group-hover:scale-105",
                    masonry ? "h-auto" : "h-full"
                  )}
                  priority={index < 3}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-80" />
                <span className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/75 text-hivePink opacity-0 backdrop-blur transition group-hover:opacity-100">
                  <ZoomIn className="h-5 w-5" />
                </span>
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <p className="font-heading text-xl font-bold">{image.title}</p>
                  {image.categories?.name ? <p className="mt-1 text-xs font-semibold">{image.categories.name}</p> : null}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      )}

      {filtered.length > visibleImages.length ? (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setVisibleCount((count) => count + 12)}
            className="glass rounded-full px-6 py-3 text-sm font-bold text-ink transition hover:-translate-y-0.5"
          >
            Load more frames
          </button>
        </div>
      ) : null}

      <AnimatePresence>
        {active ? (
          <motion.div
            className="fixed inset-0 z-[80] grid place-items-center bg-ink/70 p-4 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              className="relative max-h-[92vh] w-full max-w-5xl overflow-hidden rounded-[2rem] bg-card shadow-premium"
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                aria-label="Close preview"
                className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-white/85 text-ink shadow-glass"
                onClick={() => setActive(null)}
              >
                <X className="h-5 w-5" />
              </button>
              <div className="grid max-h-[92vh] md:grid-cols-[1.3fr_0.7fr]">
                <div className="relative min-h-[55vh] bg-ink">
                  <Image src={active.image_url} alt={active.title} fill className="object-contain" sizes="90vw" />
                </div>
                <div className="p-7">
                  <p className="font-heading text-3xl font-bold">{active.title}</p>
                  <p className="mt-3 text-sm leading-6 text-muted">{active.description || "A Social Hive Studio frame."}</p>
                  {active.categories?.name ? (
                    <span className="mt-5 inline-flex rounded-full bg-hivePink/10 px-4 py-2 text-xs font-bold text-hivePink">
                      {active.categories.name}
                    </span>
                  ) : null}
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
