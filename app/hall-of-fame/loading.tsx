import { GallerySkeleton } from "@/components/Skeletons";

export default function HallOfFameLoading() {
  return (
    <main className="min-h-screen bg-blush px-6 pb-24 pt-36">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto h-8 w-40 animate-pulse rounded-full bg-white/70" />
        <div className="mx-auto mt-5 h-12 max-w-xl animate-pulse rounded-3xl bg-white/70" />
        <div className="mt-12">
          <GallerySkeleton />
        </div>
      </div>
    </main>
  );
}
