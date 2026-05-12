import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-blush">
      <div className="glass flex items-center gap-3 rounded-3xl px-6 py-4 text-sm font-semibold text-ink">
        <Loader2 className="h-5 w-5 animate-spin text-hivePink" />
        Styling the next frame...
      </div>
    </main>
  );
}
