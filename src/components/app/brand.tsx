import logo from "@/assets/pibythree-logo.jpg.asset.json";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <img
      src={logo.url}
      alt="Pibythree — Transforming Enterprises for Future"
      className={cn("h-9 w-auto object-contain", className)}
    />
  );
}

export function ProductLockup({ compact = false }: { compact?: boolean }) {
  if (compact) return <Logo className="h-7" />;
  return (
    <div className="flex flex-col gap-1.5">
      <Logo className="h-8" />
      <span className="text-[0.8125rem] font-semibold tracking-tight text-navy">
        Supply &amp; Demand Intelligence
      </span>
    </div>
  );
}
