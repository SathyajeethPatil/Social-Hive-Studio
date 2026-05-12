import { redirect } from "next/navigation";
import Image from "next/image";
import { BarChart3, Home, Images, Star } from "lucide-react";
import { DashboardClient } from "@/components/dashboard/DashboardClient";
import { StatCard } from "@/components/StatCard";
import { requireAdmin } from "@/lib/auth";
import { getCategories, getDashboardStats, getImages } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const admin = await requireAdmin();
  if (!admin) redirect("/studio-admin-access");

  const [stats, categories, images]: any = await Promise.all([getDashboardStats(), getCategories(), getImages()]);

  return (
    <main className="min-h-screen bg-blush bg-soft-radial px-6 py-8 text-ink">
      <div className="mx-auto max-w-7xl">
        <header className="glass flex flex-col gap-4 rounded-[2rem] p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-heading text-xs font-bold uppercase tracking-[0.24em] text-hivePink">Admin Dashboard</p>
            <h1 className="mt-2 font-heading text-4xl font-extrabold">Social Hive Studio CMS</h1>
            <p className="mt-2 text-sm text-muted">Signed in as {admin.email}</p>
          </div>
          <a href="/" className="rounded-full bg-white/70 px-5 py-3 text-sm font-bold shadow-sm">
            View website
          </a>
        </header>

        <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard icon={Images} label="Total images" value={stats.totalImages} />
          <StatCard icon={BarChart3} label="Total categories" value={stats.totalCategories} />
          <StatCard icon={Home} label="Homepage featured" value={stats.totalHome} />
          <StatCard icon={Star} label="Hall of Fame" value={stats.totalFame} />
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="glass rounded-[2rem] p-6">
            <h2 className="font-heading text-2xl font-bold">Uploads by category</h2>
            <div className="mt-6 grid gap-4">
              {Object.entries(stats.uploadsByCategory).length ? (
                Object.entries(stats.uploadsByCategory).map(([name, count]: any) => (
                  <div key={name}>
                    <div className="flex items-center justify-between text-sm font-bold">
                      <span>{name}</span>
                      <span>{String (count)}</span>
                    </div>
                    <div className="mt-2 h-3 overflow-hidden rounded-full bg-white/70">
                      <div
                        className="h-full rounded-full bg-hive-gradient"
                        style={{ width: `${Math.max(8, (count / Math.max(stats.totalImages, 1)) * 100)}%` }}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted">Upload images to see category analytics.</p>
              )}
            </div>
          </div>

          <div className="glass rounded-[2rem] p-6">
            <h2 className="font-heading text-2xl font-bold">Latest uploads</h2>
            <div className="mt-5 grid gap-3">
              {stats.latestUploads.length ? (
                stats.latestUploads.map((item: any) => (
                  <div key={item.id} className="flex items-center gap-4 rounded-2xl bg-white/60 p-3">
                    <Image
                      src={item.image_url}
                      alt={item.title}
                      width={80}
                      height={80}
                      className="h-14 w-14 rounded-2xl object-cover"
                    />
                    <div>
                      <p className="font-bold">{item.title}</p>
                      <p className="text-xs text-muted">{new Date(item.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted">No uploads yet.</p>
              )}
            </div>
          </div>
        </section>

        <DashboardClient initialCategories={categories} initialImages={images} />
      </div>
    </main>
  );
}
