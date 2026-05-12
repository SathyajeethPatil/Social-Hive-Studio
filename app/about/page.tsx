import type { Metadata } from "next";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import { Camera, Clapperboard, Gem, HeartHandshake, Sparkles, Wand2 } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { SectionIntro } from "@/components/SectionIntro";
import { MotionDiv } from "@/components/Motion";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Social Hive Studio's creator-focused visual storytelling approach."
};

const studioImage =
  "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1400&auto=format&fit=crop";

const promiseCards: Array<[LucideIcon, string, string]> = [
  [Sparkles, "Soft luxury direction", "Clean light, warm skin, expressive styling, and editorial confidence."],
  [Clapperboard, "Reels that move", "Short-form ideas shaped for rhythm, hooks, and fast social publishing."],
  [Gem, "Premium polish", "Retouching and color that feel refined while keeping the person recognizable."],
  [HeartHandshake, "Easy shoot days", "Guidance, prompts, and planning that make the camera feel less intimidating."]
];

export default function AboutPage() {
  return (
    <PageShell>
      <main className="px-6 pb-24 pt-36">
        <section className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <MotionDiv initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}>
            <p className="font-heading text-xs font-bold uppercase tracking-[0.24em] text-hivePink">About Social Hive Studio</p>
            <h1 className="mt-4 font-heading text-5xl font-extrabold leading-tight md:text-7xl">
              We turn personality into polished visual culture.
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted">
              Social Hive Studio is a Gen Z aesthetic photography and reels brand built for creators, founders, artists,
              and people who want their visuals to feel premium without feeling distant.
            </p>
          </MotionDiv>
          <MotionDiv
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass overflow-hidden rounded-[2.5rem] p-4"
          >
            <div className="relative h-[520px] overflow-hidden rounded-[2rem]">
              <Image src={studioImage} alt="Social Hive Studio creative shoot" fill priority className="object-cover" />
            </div>
          </MotionDiv>
        </section>

        <section className="mx-auto mt-24 max-w-7xl">
          <SectionIntro
            eyebrow="Our Mission"
            title="Creator-focused visual storytelling"
            body="We design each shoot around where the content will live: feeds, reels, launches, portfolios, and the saved folder."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {promiseCards.map(([Icon, title, body]) => (
              <MotionDiv
                key={title}
                whileHover={{ y: -8 }}
                className="glass rounded-[2rem] p-6"
              >
                <span className="grid h-12 w-12 place-items-center rounded-full bg-hivePink/10 text-hivePink">
                  <Icon className="h-5 w-5" />
                </span>
                <h2 className="mt-6 font-heading text-xl font-bold">{title}</h2>
                <p className="mt-3 text-sm leading-6 text-muted">{body}</p>
              </MotionDiv>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-24 grid max-w-7xl gap-6 lg:grid-cols-2">
          <div className="glass rounded-[2rem] p-8">
            <Camera className="h-9 w-9 text-hivePink" />
            <h2 className="mt-5 font-heading text-3xl font-bold">What We Create</h2>
            <p className="mt-4 text-muted">
              Creator portraits, birthday edits, couple shoots, brand drops, cafe campaigns, event reels, fashion lookbooks,
              and signature content bundles for people building a public visual identity.
            </p>
          </div>
          <div className="glass rounded-[2rem] p-8">
            <Wand2 className="h-9 w-9 text-hivePink" />
            <h2 className="mt-5 font-heading text-3xl font-bold">Why Choose Us</h2>
            <p className="mt-4 text-muted">
              We blend production taste with social intuition: the work feels polished enough for a campaign and playful
              enough to actually post.
            </p>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
