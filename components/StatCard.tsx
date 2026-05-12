import type { LucideIcon } from "lucide-react";

type StatCardProps = {
  label: string;
  value: string | number;
  icon: LucideIcon;
};

export function StatCard({ label, value, icon: Icon }: StatCardProps) {
  return (
    <div className="glass rounded-[1.5rem] p-5">
      <div className="flex items-center justify-between">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-hivePink/10 text-hivePink">
          <Icon className="h-5 w-5" />
        </span>
        <p className="font-heading text-3xl font-bold">{value}</p>
      </div>
      <p className="mt-4 text-sm font-bold text-muted">{label}</p>
    </div>
  );
}
