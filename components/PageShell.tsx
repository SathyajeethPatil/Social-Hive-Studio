import { Footer } from "@/components/Footer";
import { SiteNavbar } from "@/components/SiteNavbar";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen overflow-hidden bg-blush bg-soft-radial text-ink">
      <SiteNavbar />
      {children}
      <Footer />
    </div>
  );
}
