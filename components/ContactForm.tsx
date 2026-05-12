"use client";

import { FormEvent, useState } from "react";
import { Send } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/Button";

export function ContactForm() {
  const [loading, setLoading] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      event.currentTarget.reset();
      toast.success("Message received. The studio will reply soon.");
    }, 650);
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5">
      <Field label="Name" name="name" placeholder="Your name" />
      <Field label="Email" name="email" type="email" placeholder="you@example.com" />
      <label className="grid gap-2">
        <span className="text-sm font-bold text-ink">Message</span>
        <textarea
          required
          name="message"
          rows={6}
          placeholder="Shoot type, dates, vibe, location..."
          className="rounded-[1.25rem] border border-white/60 bg-white/70 px-4 py-3 text-sm font-semibold outline-none transition focus:ring-4 focus:ring-hivePink/20"
        />
      </label>
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Sending..." : "Send Inquiry"} <Send className="h-4 w-4" />
      </Button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder
}: {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-bold text-ink">{label}</span>
      <input
        required
        name={name}
        type={type}
        placeholder={placeholder}
        className="rounded-[1.25rem] border border-white/60 bg-white/70 px-4 py-3 text-sm font-semibold outline-none transition focus:ring-4 focus:ring-hivePink/20"
      />
    </label>
  );
}
