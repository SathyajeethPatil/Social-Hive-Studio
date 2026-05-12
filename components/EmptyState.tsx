import { ImageOff } from "lucide-react";

export function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="glass mx-auto max-w-xl rounded-[2rem] p-10 text-center">
      <ImageOff className="mx-auto h-10 w-10 text-hivePink" />
      <h2 className="mt-4 font-heading text-2xl font-bold">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-muted">{body}</p>
    </div>
  );
}
