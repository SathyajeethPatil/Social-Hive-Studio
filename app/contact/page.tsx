import type { Metadata } from "next";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Contact",
  description: "Book a Social Hive Studio photography or reels session."
};

const contactItems = [
  { icon: Phone, label: "Phone", value: "+91 98765 43210", href: "tel:+919876543210" },
  { icon: Mail, label: "Email", value: "hello@socialhivestudio.com", href: "mailto:hello@socialhivestudio.com" },
  { icon: Instagram, label: "Instagram", value: "@socialhivestudio", href: "https://instagram.com/socialhivestudio" }
];

export default function ContactPage() {
  return (
    <PageShell>
      <main className="px-6 pb-24 pt-36">
        <section className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="font-heading text-xs font-bold uppercase tracking-[0.24em] text-hivePink">Contact Us</p>
            <h1 className="mt-4 font-heading text-5xl font-extrabold leading-tight md:text-7xl">
              Let&apos;s plan your next scroll-stopper.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
              Tell us what you are creating, where it will live, and the feeling you want it to carry.
            </p>

            <div className="mt-10 grid gap-4">
              {contactItems.map((item) => (
                <a key={item.label} href={item.href} className="glass flex items-center gap-4 rounded-[1.5rem] p-5">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-hivePink/10 text-hivePink">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-xs font-bold uppercase tracking-[0.18em] text-muted">{item.label}</span>
                    <span className="mt-1 block font-heading text-lg font-bold">{item.value}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div className="glass rounded-[2rem] p-5 md:p-8">
            <ContactForm />
          </div>
        </section>

        <section className="mx-auto mt-14 max-w-7xl">
          <div className="glass flex min-h-[280px] items-center justify-center rounded-[2rem] p-8 text-center">
            <div>
              <MapPin className="mx-auto h-10 w-10 text-hivePink" />
              <h2 className="mt-4 font-heading text-3xl font-bold">Studio location</h2>
              <p className="mt-3 text-muted">Mumbai, India. Exact shoot location shared after booking.</p>
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
