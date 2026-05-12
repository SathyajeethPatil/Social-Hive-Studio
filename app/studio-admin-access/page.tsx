"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, LogIn, Sparkles } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "");
    const password = String(form.get("password") ?? "");
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Welcome back to the studio.");
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <main className="grid min-h-screen place-items-center bg-blush bg-soft-radial px-6">
      <section className="glass w-full max-w-md rounded-[2rem] p-8">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-hive-gradient text-white shadow-premium">
          <Lock className="h-6 w-6" />
        </div>
        <div className="mt-6 text-center">
          <p className="font-heading text-xs font-bold uppercase tracking-[0.24em] text-hivePink">Hidden Admin Access</p>
          <h1 className="mt-3 font-heading text-3xl font-bold">Social Hive Studio CMS</h1>
          <p className="mt-3 text-sm leading-6 text-muted">Authorized studio admins only.</p>
        </div>

        <form onSubmit={onSubmit} className="mt-8 grid gap-4">
          <input
            required
            name="email"
            type="email"
            placeholder="Admin email"
            className="rounded-[1.25rem] border border-white/60 bg-white/70 px-4 py-3 text-sm font-semibold outline-none focus:ring-4 focus:ring-hivePink/20"
          />
          <input
            required
            name="password"
            type="password"
            placeholder="Password"
            className="rounded-[1.25rem] border border-white/60 bg-white/70 px-4 py-3 text-sm font-semibold outline-none focus:ring-4 focus:ring-hivePink/20"
          />
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Signing in..." : "Enter Dashboard"} <LogIn className="h-4 w-4" />
          </Button>
        </form>
        <p className="mt-6 flex items-center justify-center gap-2 text-center text-xs font-semibold text-muted">
          <Sparkles className="h-4 w-4 text-hivePink" /> Admin emails are controlled by ADMIN_EMAILS.
        </p>
      </section>
    </main>
  );
}
