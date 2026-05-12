import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";

type Shared = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

type ButtonProps = Shared & ButtonHTMLAttributes<HTMLButtonElement>;
type LinkProps = Shared & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

const styles = {
  primary: "bg-hive-gradient text-white shadow-premium hover:-translate-y-0.5",
  secondary: "glass text-ink hover:-translate-y-0.5",
  ghost: "text-ink hover:bg-white/50"
};

export function Button({ children, variant = "primary", className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition duration-300 disabled:cursor-not-allowed disabled:opacity-60",
        styles[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function ButtonLink({ children, variant = "primary", className, href, ...props }: LinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition duration-300",
        styles[variant],
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
