import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, Camera, Heart, Play, Sparkles, Star } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { ButtonLink } from "@/components/ui/Button";
import { Gallery } from "@/components/Gallery";
import { CategoryCards } from "@/components/CategoryCards";
import { SectionIntro } from "@/components/SectionIntro";
import { MotionDiv, MotionSection } from "@/components/Motion";
import { getCategories, getImages } from "@/lib/data";

export const dynamic = "force-dynamic";

const heroImage =
  "https://images.unsplash.com/photo-1512316609839-ce289d3eba0a?q=80&w=1400&auto=format&fit=crop";

export default async function HomePage() {
  const [featuredImages, categories] = await Promise.all([
    getImages({ home: true, limit: 9 }),
    getCategories()
  ]);

  return (
    <PageShell>
      <main>
        <section className="relative min-h-screen px-6 pb-20 pt-32 md:pt-40">
          <div className="soft-grid absolute inset-0 opacity-50" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_0.86fr]">
            <MotionDiv initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/60 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-hivePink backdrop-blur">
                <Sparkles className="h-4 w-4" /> Premium Gen Z Visuals
              </div>
              <h1 className="mt-7 max-w-4xl font-heading text-5xl font-extrabold leading-tight tracking-normal md:text-7xl">
                Make every frame feel like it was born to be shared.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
                Social Hive Studio crafts playful, polished photography and reels for creators, brands, parties, launches,
                and main-character moments.
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                <ButtonLink href="/categories">
                  Explore Categories <ArrowRight className="h-4 w-4" />
                </ButtonLink>
                <ButtonLink href="/contact" variant="secondary">
                  Book a Shoot <Camera className="h-4 w-4" />
                </ButtonLink>
              </div>
            </MotionDiv>

            <MotionDiv
              initial={{ opacity: 0, scale: 0.92, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="relative"
            >
              <div className="glass relative overflow-hidden rounded-[2.5rem] p-4 shadow-premium">
                <div className="relative h-[580px] overflow-hidden rounded-[2rem]">
                  <Image src={heroImage} alt="Creator portrait by Social Hive Studio" fill priority className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 rounded-[1.5rem] bg-white/70 p-5 backdrop-blur-xl">
                    <p className="font-heading text-2xl font-bold">Soft luxury. Social-first. Scroll-stopping.</p>
                    <p className="mt-2 text-sm text-muted">Portraits, reels, campaign drops, and event content.</p>
                  </div>
                </div>
              </div>
              <FloatingBadge className="-left-6 top-16" icon={Heart} text="42K likes" />
              <FloatingBadge className="-right-4 top-40" icon={Play} text="Reels ready" />
              <FloatingBadge className="bottom-20 left-10" icon={Star} text="Creator loved" />
            </MotionDiv>
          </div>
        </section>

        <MotionSection
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="px-6 py-20"
        >
          <div className="mx-auto max-w-7xl">
            <SectionIntro
              eyebrow="Featured Gallery"
              title="Fresh frames from the hive"
              body="Homepage images are curated directly from the admin dashboard, so your best work always leads."
            />
            <div className="mt-12">
              <Gallery
                images={featuredImages}
                emptyTitle="No homepage features yet"
                emptyBody="Upload images in the dashboard and toggle Show on Home Page to feature them here."
              />
            </div>
          </div>
        </MotionSection>

        <section className="px-6 py-20">
          <div className="mx-auto max-w-7xl">
            <SectionIntro
              eyebrow="Categories"
              title="Shoot worlds with their own vibe"
              body="Admin-created categories automatically appear here and power their own dynamic galleries."
            />
            <div className="mt-12">
              <CategoryCards categories={categories.slice(0, 6)} />
            </div>
          </div>
        </section>

        <section className="px-6 py-20">
          <div className="mx-auto max-w-7xl">
            <SectionIntro eyebrow="Social Proof" title="Built for camera rolls people revisit" />
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {[
                ["The edits felt premium without losing my personality.", "Aanya, creator"],
                ["Our launch content finally looked like our brand had a pulse.", "Mira, founder"],
                ["The reels were fast, polished, and wildly easy to post.", "Kabir, artist"]
              ].map(([quote, name]) => (
                <div key={name} className="glass rounded-[2rem] p-7">
                  <div className="flex gap-1 text-hivePink">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={index} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="mt-5 text-lg font-semibold leading-8">&ldquo;{quote}&rdquo;</p>
                  <p className="mt-5 text-sm font-bold text-muted">{name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}

function FloatingBadge({
  className,
  icon: Icon,
  text
}: {
  className: string;
  icon: LucideIcon;
  text: string;
}) {
  return (
    <MotionDiv
      animate={{ y: [0, -12, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className={`glass absolute hidden items-center gap-2 rounded-full px-4 py-3 text-sm font-bold text-ink md:flex ${className}`}
    >
      <Icon className="h-4 w-4 text-hivePink" /> {text}
    </MotionDiv>
  );
}
