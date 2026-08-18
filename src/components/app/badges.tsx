import { cn } from "@/lib/utils";
import type { Severity } from "@/data/demo";

const severityStyles: Record<Severity, string> = {
  critical: "bg-critical-soft text-critical border-critical/25",
  high: "bg-warning-soft text-warning border-warning/30",
  medium: "bg-info-soft text-primary border-primary/20",
  opportunity: "bg-positive-soft text-positive border-positive/25",
};

const severityLabels: Record<Severity, string> = {
  critical: "Critical",
  high: "High",
  medium: "Medium",
  opportunity: "Opportunity",
};

export function SeverityBadge({ severity, label }: { severity: Severity; label?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        severityStyles[severity],
      )}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {label ?? severityLabels[severity]}
    </span>
  );
}

export function StatusPill({
  tone = "neutral",
  children,
}: {
  tone?: "neutral" | "positive" | "warning" | "critical" | "info";
  children: React.ReactNode;
}) {
  const tones = {
    neutral: "bg-surface-strong text-muted-foreground border-border",
    positive: "bg-positive-soft text-positive border-positive/25",
    warning: "bg-warning-soft text-warning border-warning/30",
    critical: "bg-critical-soft text-critical border-critical/25",
    info: "bg-info-soft text-primary border-primary/20",
  } as const;
  return (
    <span className={cn("inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium", tones[tone])}>
      {children}
    </span>
  );
}

export function DemoTag({ children = "Demo data" }: { children?: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded border border-border bg-surface px-1.5 py-0.5 text-[0.6875rem] font-medium uppercase tracking-wide text-muted-foreground">
      {children}
    </span>
  );
}
