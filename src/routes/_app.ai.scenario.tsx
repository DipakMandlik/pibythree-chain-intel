import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { FlaskConical } from "lucide-react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { PageHeader, SectionCard } from "@/components/app/page-header";
import { AiProcessing } from "@/components/app/states";
import { buildDemandSeries, kpiHeadline } from "@/data/demo";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/_app/ai/scenario")({
  head: () =>
    pageMeta(
      "Demand Scenario Analysis",
      "Model demand scenarios before committing a forecast adjustment.",
    ),
  component: ScenarioAnalysis,
});

function Row({
  label,
  value,
  min,
  max,
  onChange,
  suffix = "%",
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
  suffix?: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-navy">{label}</span>
        <span className="num font-semibold text-primary">
          {value > 0 && min < 0 ? "+" : ""}
          {value}
          {suffix}
        </span>
      </div>
      <Slider
        className="mt-2"
        value={[value]}
        min={min}
        max={max}
        step={1}
        onValueChange={(vals) => onChange(vals[0] ?? value)}
      />
      <div className="mt-1 flex justify-between text-[0.6875rem] text-muted-foreground">
        <span>
          {min}
          {suffix}
        </span>
        <span>
          {max}
          {suffix}
        </span>
      </div>
    </div>
  );
}

function ScenarioAnalysis() {
  const [uplift, setUplift] = useState(5);
  const [promotion, setPromotion] = useState(3);
  const [seasonal, setSeasonal] = useState(2);
  const [local, setLocal] = useState(0);
  const [running, setRunning] = useState(false);
  const [ran, setRan] = useState(true);

  const totalPct = uplift + promotion + seasonal + local;
  const baselineUnits = kpiHeadline.forecastedDemandUnits;
  const scenarioUnits = Math.round(baselineUnits * (1 + totalPct / 100));
  const confidence = Math.max(62, Math.min(95, Math.round(92 - Math.abs(totalPct) * 0.6)));

  const series = useMemo(() => {
    const base = buildDemandSeries(11, 9600, 0.14, 14, 30);
    return base.map((p) => ({
      date: p.date,
      baseline: p.forecast,
      scenario: Math.round(p.forecast * (1 + totalPct / 100)),
    }));
  }, [totalPct]);

  const run = () => {
    setRunning(true);
    setTimeout(() => {
      setRunning(false);
      setRan(true);
    }, 1200);
  };

  return (
    <>
      <PageHeader
        title="Demand Scenario Analysis"
        subtitle="Model demand scenarios — promotion, seasonality and local effects — before committing a forecast adjustment."
      />

      <div className="grid gap-5 xl:grid-cols-[1fr_1.4fr]">
        <SectionCard
          title="Scenario inputs"
          description="Adjust assumptions and run the scenario against the current baseline."
        >
          <div className="space-y-5">
            <Row
              label="Demand uplift"
              value={uplift}
              min={0}
              max={30}
              onChange={(v) => {
                setUplift(v);
                setRan(false);
              }}
            />
            <Row
              label="Promotion impact"
              value={promotion}
              min={0}
              max={30}
              onChange={(v) => {
                setPromotion(v);
                setRan(false);
              }}
            />
            <Row
              label="Seasonal effect"
              value={seasonal}
              min={0}
              max={20}
              onChange={(v) => {
                setSeasonal(v);
                setRan(false);
              }}
            />
            <Row
              label="Local demand adjustment"
              value={local}
              min={-20}
              max={20}
              onChange={(v) => {
                setLocal(v);
                setRan(false);
              }}
            />
          </div>
          <Button className="mt-5 w-full" onClick={run} disabled={running}>
            <FlaskConical className="size-3.5" /> Run Forecast Scenario
          </Button>
        </SectionCard>

        <SectionCard
          title="Baseline vs scenario"
          description="Forecasted demand over the next 30 days under each assumption set."
        >
          {running ? (
            <AiProcessing
              steps={[
                "Applying scenario assumptions…",
                "Re-running the forecast model…",
                "Comparing to baseline…",
              ]}
            />
          ) : (
            <>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { l: "Baseline Demand", v: `${(baselineUnits / 1_000_000).toFixed(2)}M` },
                  { l: "Scenario Demand", v: `${(scenarioUnits / 1_000_000).toFixed(2)}M` },
                  { l: "Change", v: `${totalPct >= 0 ? "+" : ""}${totalPct.toFixed(1)}%` },
                  { l: "Confidence", v: `${confidence}%` },
                ].map((k) => (
                  <div key={k.l} className="rounded-md border border-border bg-surface p-3">
                    <p className="label-eyebrow">{k.l}</p>
                    <p className="mt-1 text-lg font-semibold text-navy num">{k.v}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4" style={{ height: 280 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={series} margin={{ top: 8, right: 12, bottom: 0, left: -8 }}>
                    <CartesianGrid stroke="var(--color-border)" vertical={false} />
                    <XAxis
                      dataKey="date"
                      tick={{ fontSize: 11 }}
                      tickLine={false}
                      axisLine={false}
                      minTickGap={40}
                    />
                    <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} width={56} />
                    <Tooltip
                      contentStyle={{
                        fontSize: 12,
                        borderRadius: 8,
                        border: "1px solid var(--color-border)",
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                    <Line
                      type="monotone"
                      dataKey="baseline"
                      name="Baseline"
                      stroke="var(--color-navy)"
                      strokeWidth={2}
                      dot={false}
                      isAnimationActive={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="scenario"
                      name="Scenario"
                      stroke="var(--color-primary)"
                      strokeWidth={2}
                      strokeDasharray="5 4"
                      dot={false}
                      isAnimationActive={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              {ran && (
                <p className="mt-3 text-sm text-muted-foreground">
                  <span className="font-medium text-navy">So what?</span> A {totalPct.toFixed(0)}%
                  combined uplift moves forecasted demand from{" "}
                  {(baselineUnits / 1_000_000).toFixed(2)}M to{" "}
                  {(scenarioUnits / 1_000_000).toFixed(2)}M units, at {confidence}% confidence.
                </p>
              )}
            </>
          )}
        </SectionCard>
      </div>
    </>
  );
}
