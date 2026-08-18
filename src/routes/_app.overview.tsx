import { useMemo, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { KpiCard, KpiGrid } from "@/components/app/kpi-card";
import { PageHeader, SectionCard } from "@/components/app/page-header";
import { SeverityBadge } from "@/components/app/badges";
import { DemandChart } from "@/components/app/charts";
import { HorizonToggle } from "@/components/app/horizon-toggle";
import { FilterBar, defaultFilters, type FilterState } from "@/components/app/filter-bar";
import { buildDemandSeries, demandAnomalies, kpiHeadline, skuById, storeById } from "@/data/demo";
import {
  categoryOptions,
  filterSeed,
  regionOptions,
  skuOptionsFor,
  storeOptionsFor,
} from "@/lib/filters";
import { useSession } from "@/lib/session";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/_app/overview")({
  head: () =>
    pageMeta(
      "Demand Overview",
      "Understand what customers are likely to need across stores, categories and SKUs.",
    ),
  component: Overview,
});

const briefing = [
  {
    label: "Demand Signal",
    text: "Beverage demand is trending 14% above the historical baseline in Mumbai.",
    to: "/demand/drivers",
  },
  {
    label: "Seasonal Signal",
    text: "Weekend demand is expected to remain elevated across selected beverage SKUs.",
    to: "/demand/forecast-explorer",
  },
  {
    label: "Forecast Confidence",
    text: "Forecast confidence is highest for stable FMCG categories and lower for recently promoted SKUs.",
    to: "/demand/accuracy",
  },
  {
    label: "Anomaly",
    text: `${demandAnomalies.length} SKU-store combinations show statistically unusual demand behaviour.`,
    to: "/demand/anomalies",
  },
];

function Overview() {
  const session = useSession();
  const navigate = useNavigate();
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  const horizon = Number(filters.horizon);
  const historyDays = Number(filters.dateRange) * 2.5;
  const seed = filterSeed(filters);
  const scale =
    filters.sku !== "all"
      ? 0.22
      : filters.store !== "all"
        ? 0.34
        : filters.category !== "all"
          ? 0.5
          : 1;
  const series = useMemo(
    () => buildDemandSeries(seed, Math.round(9600 * scale), 0.14, Math.round(historyDays), horizon),
    [seed, scale, historyDays, horizon],
  );

  const topAnomalies = demandAnomalies
    .slice()
    .sort((a, b) => Math.abs(b.variance) - Math.abs(a.variance))
    .slice(0, 3);

  return (
    <>
      <PageHeader
        title="Demand Overview"
        subtitle="Understand what customers are likely to need across stores, categories and SKUs."
        actions={
          <>
            <span className="hidden items-center gap-1.5 rounded-md border border-border bg-surface px-2 py-1 text-xs text-muted-foreground sm:flex">
              <span className="size-1.5 rounded-full bg-positive" />
              AI Forecast Engine ● Operational
            </span>
            <span className="hidden text-xs text-muted-foreground md:inline">
              Last updated: 09:42 AM
            </span>
            <Button asChild size="sm">
              <Link to="/demand/forecast-explorer">
                Open forecast explorer <ArrowRight className="size-3.5" />
              </Link>
            </Button>
          </>
        }
      />

      {session && (
        <p className="text-sm text-muted-foreground">
          Welcome back, <span className="font-medium text-navy">{session.name}</span> —{" "}
          {session.objective}.
        </p>
      )}

      <FilterBar
        value={filters}
        onChange={setFilters}
        regionOptions={regionOptions}
        storeOptions={storeOptionsFor(filters.region)}
        categoryOptions={categoryOptions}
        skuOptions={skuOptionsFor(filters.category)}
      />

      <KpiGrid className="2xl:grid-cols-5">
        <KpiCard
          label="Forecast Accuracy"
          value={`${kpiHeadline.forecastAccuracyPct}%`}
          change={`${kpiHeadline.forecastAccuracyChangePts}%`}
          direction="up"
          changeTone="positive"
          caption="vs previous forecasting cycle"
          spark={[86, 87, 88, 89, 90, 91, kpiHeadline.forecastAccuracyPct]}
          onClick={() => navigate({ to: "/demand/accuracy" })}
        />
        <KpiCard
          label="Forecasted Demand"
          value={`${(kpiHeadline.forecastedDemandUnits / 1_000_000).toFixed(2)}M`}
          caption={`units · next ${kpiHeadline.forecastedDemandHorizonDays} days`}
          spark={[2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.84]}
          onClick={() => navigate({ to: "/demand/forecast-explorer" })}
        />
        <KpiCard
          label="Demand Growth"
          value={`+${kpiHeadline.demandGrowthPct}%`}
          change={`${kpiHeadline.demandGrowthChangePts}%`}
          direction="up"
          changeTone="positive"
          caption="vs previous comparable period"
          spark={[4, 5, 6, 6.8, 7.4, 8.2, kpiHeadline.demandGrowthPct]}
          onClick={() => navigate({ to: "/demand/stores" })}
        />
        <KpiCard
          label="Forecast Variance"
          value={`${kpiHeadline.forecastVariancePct}%`}
          change={`${Math.abs(kpiHeadline.forecastVarianceChangePts)}%`}
          direction="down"
          changeTone="positive"
          caption="portfolio average · improving"
          spark={[9.4, 8.8, 8.1, 7.5, 7, 6.6, kpiHeadline.forecastVariancePct]}
          onClick={() => navigate({ to: "/demand/accuracy" })}
        />
        <KpiCard
          label="Demand Anomalies"
          value={`${demandAnomalies.length}`}
          caption={`${demandAnomalies.filter((a) => a.severity !== "medium").length} high priority · requiring review`}
          spark={[22, 21, 20, 19, 18, 18, demandAnomalies.length]}
          onClick={() => navigate({ to: "/demand/anomalies" })}
        />
      </KpiGrid>

      <SectionCard
        title="Actual vs forecast demand"
        description="Historical actuals, AI forecast, confidence range and promotion markers across the selected scope."
        actions={
          <HorizonToggle
            value={filters.horizon}
            onChange={(horizon) => setFilters({ ...filters, horizon })}
          />
        }
      >
        <DemandChart data={series} height={380} />
        <p className="mt-3 text-sm text-muted-foreground">
          <span className="font-medium text-navy">So what?</span> The forward curve sits above the
          trailing baseline for the selected scope — demand growth is concentrated in Beverages
          across Maharashtra stores.
        </p>
      </SectionCard>

      <section className="panel overflow-hidden">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-surface px-4 py-3">
          <div className="flex items-center gap-2.5">
            <span className="flex size-7 items-center justify-center rounded-md bg-primary/10 text-primary">
              <Sparkles className="size-4" />
            </span>
            <div>
              <h2 className="text-sm font-semibold text-navy">AI Demand Briefing</h2>
              <p className="text-xs text-muted-foreground">
                What the demand model is seeing right now.
              </p>
            </div>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link to="/ai/insights">Open AI demand insights</Link>
          </Button>
        </header>
        <ul className="grid divide-y divide-border md:grid-cols-2 md:divide-y-0 xl:grid-cols-4">
          {briefing.map((b) => (
            <li key={b.label} className="border-border p-4 md:border-r last:md:border-r-0">
              <p className="label-eyebrow text-primary">{b.label}</p>
              <p className="mt-2 text-sm text-foreground/90">{b.text}</p>
              <Link
                to={b.to}
                className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
              >
                Investigate <ArrowRight className="size-3" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <SectionCard
        title="Highest-variance demand anomalies"
        description="Largest deviations from expected demand this cycle."
        padded={false}
        actions={
          <Button asChild size="sm" variant="ghost">
            <Link to="/demand/anomalies">View all anomalies</Link>
          </Button>
        }
      >
        <ul className="divide-y divide-border">
          {topAnomalies.map((a) => (
            <li key={a.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
              <div>
                <div className="flex items-center gap-2">
                  <SeverityBadge
                    severity={
                      a.severity === "critical"
                        ? "critical"
                        : a.severity === "high"
                          ? "high"
                          : "medium"
                    }
                  />
                  <p className="text-sm font-medium text-navy">
                    {skuById(a.skuId).name} · {storeById(a.storeId).name}{" "}
                    {storeById(a.storeId).code}
                  </p>
                </div>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {a.interpretation} — {a.detail}
                </p>
              </div>
              <Button asChild size="sm" variant="outline">
                <Link to="/demand/anomalies">Open</Link>
              </Button>
            </li>
          ))}
        </ul>
      </SectionCard>
    </>
  );
}
