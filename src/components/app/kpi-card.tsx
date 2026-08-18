import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";

export interface KpiProps {
  label: string;
  value: string;
  change?: string;
  direction?: "up" | "down";
  changeTone?: "positive" | "negative" | "neutral";
  caption: string;
  spark?: number[];
  onClick?: () => void;
}

export function KpiCard({
  label,
  value,
  change,
  direction,
  changeTone = "neutral",
  caption,
  spark,
  onClick,
}: KpiProps) {
  const toneClass =
    changeTone === "positive"
      ? "text-positive"
      : changeTone === "negative"
        ? "text-critical"
        : "text-muted-foreground";
  const Arrow = direction === "down" ? ArrowDownRight : ArrowUpRight;
  return (
    <div
      onClick={onClick}
      className={cn(
        "panel flex flex-col justify-between p-4 transition-colors",
        onClick && "cursor-pointer hover:border-primary/40",
      )}
    >
      <p className="label-eyebrow">{label}</p>
      <div className="mt-2 flex items-end justify-between gap-3">
        <div>
          <p className="kpi-value">{value}</p>
          <div className="mt-1.5 flex items-center gap-1.5 text-xs">
            {change && (
              <span className={cn("inline-flex items-center gap-0.5 font-medium num", toneClass)}>
                <Arrow className="size-3.5" />
                {change}
              </span>
            )}
            <span className="text-muted-foreground">{caption}</span>
          </div>
        </div>
        {spark && (
          <div className="h-12 w-24 shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={spark.map((v, i) => ({ i, v }))}>
                <defs>
                  <linearGradient id={`sp-${label.replace(/\W/g, "")}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.28} />
                    <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="v"
                  stroke="var(--color-primary)"
                  strokeWidth={1.6}
                  fill={`url(#sp-${label.replace(/\W/g, "")})`}
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}

export function KpiGrid({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6", className)}>
      {children}
    </div>
  );
}
