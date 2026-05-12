"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Camera, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/utils/cn";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/hall-of-fame", label: "Hall of Fame" },
  { href: "/categories", label: "Categories" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" }
];

export function SiteNavbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-4 pt-4">
      <nav className="glass mx-auto flex max-w-7xl items-center justify-between rounded-full px-4 py-3">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="grid h-11 w-11 place-items-center rounded-full bg-hive-gradient text-white shadow-premium">
            <Camera className="h-5 w-5" />
          </span>
          <span className="font-heading text-lg font-bold tracking-normal">Social Hive Studio</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-semibold transition",
                  active ? "bg-white text-hivePink shadow-sm" : "text-ink/75 hover:bg-white/60 hover:text-ink"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <button
          type="button"
          aria-label="Toggle navigation"
          className="grid h-11 w-11 place-items-center rounded-full bg-white/70 md:hidden"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open ? (
        <div className="glass mx-auto mt-3 grid max-w-7xl gap-2 rounded-[1.5rem] p-3 md:hidden">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-2xl px-4 py-3 text-sm font-bold text-ink hover:bg-white/70"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      ) : null}
    </header>
  );
}
