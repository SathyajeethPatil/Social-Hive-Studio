import { cn } from "@/utils/cn";

type SectionIntroProps = {
  eyebrow?: string;
  title: string;
  body?: string;
  align?: "left" | "center";
};

export function SectionIntro({ eyebrow, title, body, align = "center" }: SectionIntroProps) {
  return (
    <div className={cn("mx-auto max-w-3xl", align === "center" ? "text-center" : "text-left")}>
      {eyebrow ? (
        <p className="font-heading text-xs font-bold uppercase tracking-[0.24em] text-hivePink">{eyebrow}</p>
      ) : null}
      <h2 className="mt-3 font-heading text-3xl font-bold tracking-normal text-ink md:text-5xl">{title}</h2>
      {body ? <p className="mt-4 text-base leading-7 text-muted">{body}</p> : null}
    </div>
  );
}
