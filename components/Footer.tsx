import Link from "next/link";
import { Instagram, Mail, Phone, Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/60 bg-card/70 px-6 py-12">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3 font-heading text-xl font-bold">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-hive-gradient text-white">
              <Sparkles className="h-5 w-5" />
            </span>
            Social Hive Studio
          </div>
          <p className="mt-4 max-w-md text-sm leading-6 text-muted">
            Gen Z photography and reels for portraits, campaigns, launch drops, and creator-first storytelling.
          </p>
        </div>

        <div>
          <h2 className="font-heading text-sm font-bold uppercase tracking-[0.18em] text-hivePink">Studio</h2>
          <div className="mt-4 grid gap-3 text-sm font-semibold text-ink/75">
            <Link href="/hall-of-fame">Hall of Fame</Link>
            <Link href="/categories">Categories</Link>
            <Link href="/about">About Us</Link>
            <Link href="/contact">Contact Us</Link>
          </div>
        </div>

        <div>
          <h2 className="font-heading text-sm font-bold uppercase tracking-[0.18em] text-hivePink">Contact</h2>
          <div className="mt-4 grid gap-3 text-sm text-ink/75">
            <a className="flex items-center gap-2" href="https://instagram.com/socialhivestudio">
              <Instagram className="h-4 w-4 text-hivePink" /> @socialhivestudio
            </a>
            <a className="flex items-center gap-2" href="mailto:hello@socialhivestudio.com">
              <Mail className="h-4 w-4 text-hivePink" /> hello@socialhivestudio.com
            </a>
            <a className="flex items-center gap-2" href="tel:+919876543210">
              <Phone className="h-4 w-4 text-hivePink" /> +91 98765 43210
            </a>
          </div>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-7xl text-xs text-muted">
        Copyright {new Date().getFullYear()} Social Hive Studio. All rights reserved.
      </p>
    </footer>
  );
}
