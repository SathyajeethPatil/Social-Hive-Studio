import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://socialhivestudio.com"),
  title: {
    default: "Social Hive Studio | Gen Z Photography & Reels",
    template: "%s | Social Hive Studio"
  },
  description:
    "Premium Gen Z photography and reels studio crafting Instagram-worthy visuals, portraits, campaign content, and creator-first social stories.",
  openGraph: {
    title: "Social Hive Studio",
    description: "Premium playful photography and reels for creators, brands, and main-character moments.",
    url: "https://socialhivestudio.com",
    siteName: "Social Hive Studio",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-body antialiased">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              borderRadius: "18px",
              background: "#FFF9FA",
              color: "#1F1F1F",
              border: "1px solid rgba(255,255,255,0.4)"
            }
          }}
        />
      </body>
    </html>
  );
}
