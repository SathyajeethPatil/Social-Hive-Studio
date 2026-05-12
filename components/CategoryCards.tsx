import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Image as ImageIcon } from "lucide-react";
import { MotionDiv } from "@/components/Motion";
import type { Category } from "@/types/database";

const fallbackThumb =
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop";

export function CategoryCards({ categories }: { categories: Category[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {categories.map((category, index) => (
        <MotionDiv
          key={category.id}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: Math.min(index * 0.06, 0.28) }}
          whileHover={{ y: -10, rotateX: 3, rotateY: -3 }}
        >
          <Link href={`/categories/${category.slug}`} className="glass group block overflow-hidden rounded-[2rem] p-3">
            <div className="relative h-64 overflow-hidden rounded-[1.5rem]">
              <Image
                src={category.thumbnail_url || fallbackThumb}
                alt={category.name}
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
            </div>
            <div className="flex items-center justify-between px-3 py-5">
              <div>
                <p className="font-heading text-2xl font-bold">{category.name}</p>
                <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-muted">
                  <ImageIcon className="h-4 w-4 text-hivePink" /> Explore the set
                </p>
              </div>
              <span className="grid h-12 w-12 place-items-center rounded-full bg-hive-gradient text-white shadow-premium transition group-hover:rotate-12">
                <ArrowUpRight className="h-5 w-5" />
              </span>
            </div>
          </Link>
        </MotionDiv>
      ))}
    </div>
  );
}
