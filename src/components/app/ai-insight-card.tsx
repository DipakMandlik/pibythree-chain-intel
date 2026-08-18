import { Sparkles, ChevronRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { SeverityBadge } from "@/components/app/badges";
import type { Severity } from "@/data/demo";
import { cn } from "@/lib/utils";

export interface AiInsightCardProps {
  title: string;
  severity?: Severity;
  reason: string;
  evidence: string[];
  impact: string;
  confidence: number;
  actions?: React.ReactNode;
  link?: { to: string; label: string };
  className?: string;
}

export function AiInsightCard({
  title, severity, reason, evidence, impact, confidence, actions, link, className,
}: AiInsightCardProps) {
  return (
    <section className={cn("panel overflow-hidden", className)}>
      <header className="flex items-start justify-between gap-4 border-b border-border bg-surface px-4 py-3">
        <div className="flex items-start gap-2.5">
          <span className="mt-0.5 flex size-7 items-center justify-center rounded-md bg-primary/10 text-primary">
            <Sparkles className="size-4" />
          </span>
          <div>
            <p className="label-eyebrow">AI recommendation</p>
            <h3 className="mt-0.5 text-sm font-semibold leading-snug text-navy">{title}</h3>
          </div>
        </div>
        {severity && <SeverityBadge severity={severity} />}
      </header>

      <div className="grid gap-4 p-4 md:grid-cols-2">
        <div>
          <p className="label-eyebrow">Reason</p>
          <p className="mt-1 text-sm text-foreground/90">{reason}</p>
          <p className="label-eyebrow mt-4">Evidence</p>
          <ul className="mt-1.5 space-y-1.5">
            {evidence.map((e) => (
              <li key={e} className="flex gap-2 text-sm text-muted-foreground">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent-blue" />
                <span>{e}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-4">
          <div className="rounded-md border border-border bg-surface p-3">
            <p className="label-eyebrow">Expected impact</p>
            <p className="mt-1 text-base font-semibold text-navy num">{impact}</p>
          </div>
          <div>
            <div className="flex items-center justify-between text-xs">
              <span className="label-eyebrow">Confidence</span>
              <span className="font-semibold text-navy num">{confidence}%</span>
            </div>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-surface-strong">
              <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${confidence}%` }} />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {actions}
            {link && (
              <Button asChild variant="outline" size="sm">
                <Link to={link.to}>
                  {link.label} <ChevronRight className="size-3.5" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
