import {
  Area, CartesianGrid, ComposedChart, Legend, Line, ReferenceDot, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import type { DemandPoint } from "@/data/demo";

const axis = { stroke: "var(--color-muted-foreground)", fontSize: 11 };

function DemandTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  const p: DemandPoint = payload[0].payload;
  const variance = p.actual ? Math.round(((p.actual - p.forecast) / p.forecast) * 1000) / 10 : null;
  return (
    <div className="panel min-w-52 p-3 text-xs shadow-panel">
      <p className="font-semibold text-navy">{label}</p>
      <dl className="mt-1.5 space-y-1">
        <Row k="Actual" v={p.actual ? `${p.actual.toLocaleString("en-IN")} units` : "—"} />
        <Row k="Forecast" v={`${p.forecast.toLocaleString("en-IN")} units`} />
        <Row k="Variance" v={variance === null ? "—" : `${variance > 0 ? "+" : ""}${variance}%`} />
        <Row k="Confidence" v={`${p.lower.toLocaleString("en-IN")} – ${p.upper.toLocaleString("en-IN")}`} />
      </dl>
      {p.promotion && <p className="mt-1.5 text-[0.6875rem] font-medium text-warning">Promotion window active</p>}
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-6">
      <dt className="text-muted-foreground">{k}</dt>
      <dd className="num font-medium text-navy">{v}</dd>
    </div>
  );
}

export function DemandChart({ data, height = 300 }: { data: DemandPoint[]; height?: number }) {
  const promos = data.filter((d) => d.promotion);
  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 8, right: 12, bottom: 0, left: -8 }}>
          <CartesianGrid stroke="var(--color-border)" vertical={false} />
          <XAxis dataKey="date" tick={axis} tickLine={false} axisLine={false} minTickGap={40} />
          <YAxis tick={axis} tickLine={false} axisLine={false} width={56} />
          <Tooltip content={<DemandTooltip />} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          <Area
            type="monotone" dataKey="upper" name="Confidence band" stroke="none"
            fill="var(--color-accent-blue)" fillOpacity={0.12} isAnimationActive={false}
          />
          <Area type="monotone" dataKey="lower" stroke="none" fill="var(--color-background)" fillOpacity={1} legendType="none" isAnimationActive={false} />
          <Line type="monotone" dataKey="actual" name="Actual" stroke="var(--color-navy)" strokeWidth={2} dot={false} connectNulls={false} isAnimationActive={false} />
          <Line type="monotone" dataKey="forecast" name="Forecast" stroke="var(--color-primary)" strokeWidth={2} strokeDasharray="5 4" dot={false} isAnimationActive={false} />
          {promos.map((p) => (
            <ReferenceDot key={p.date} x={p.date} y={p.forecast} r={4} fill="var(--color-warning)" stroke="var(--color-background)" />
          ))}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
