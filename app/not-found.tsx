import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-blush px-6">
      <section className="glass max-w-xl rounded-[2rem] p-10 text-center">
        <Sparkles className="mx-auto mb-5 h-10 w-10 text-hivePink" />
        <h1 className="font-heading text-4xl font-bold">This shot is out of frame.</h1>
        <p className="mt-4 text-muted">The page you are looking for is not part of the current studio set.</p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-hive-gradient px-6 py-3 text-sm font-bold text-white shadow-premium"
        >
          Back to Home
        </Link>
      </section>
    </main>
  );
}
