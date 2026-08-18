import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PageHeader, SectionCard } from "@/components/app/page-header";
import { AiInsightCard } from "@/components/app/ai-insight-card";
import { SeverityBadge } from "@/components/app/badges";
import { demandSignals, forecastDrivers, skuById, storeById } from "@/data/demo";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/_app/demand/drivers")({
  head: () => pageMeta("Demand Drivers", "Promotion, seasonality, trend and local pattern contributions behind the forecast."),
  component: Drivers,
});

function Drivers() {
  return (
    <>
      <PageHeader title="Demand Drivers" subtitle="What is moving demand — decomposed into promotional, seasonal, trend and local signals." />
      <div className="grid gap-5 xl:grid-cols-[1.3fr_1fr]">
        <SectionCard title="Driver contribution — Beverages, Mumbai" description="Demonstration-generated signal decomposition.">
          <ul className="space-y-4">
            {forecastDrivers.map((d) => (
              <li key={d.driver}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-navy">{d.driver}</span>
                  <span className="num font-semibold text-primary">+{d.impact}%</span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-surface-strong">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${d.impact * 7}%` }} />
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{d.note}</p>
              </li>
            ))}
          </ul>
        </SectionCard>
        <SectionCard title="Signals in the last 7 days" padded={false}>
          <ul className="divide-y divide-border">
            {demandSignals.map((s) => (
              <li key={s.id} className="px-4 py-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium text-navy">{skuById(s.skuId).name}</p>
                  <SeverityBadge severity={s.severity} />
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {storeById(s.storeId).name} {storeById(s.storeId).code} · {s.interpretation}
                </p>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>
      <AiInsightCard
        title="Raise Mumbai beverage forecast by 14% for the next 14 days"
        severity="medium"
        reason="Promotion uplift and warm-weather seasonality are compounding above baseline for a sustained period."
        evidence={["Promotion impact +11%", "Recent trend +7%", "Seasonality +5%", "Local consumption pattern +3%"]}
        impact="Improves forecast accuracy by an estimated 2.1 points"
        confidence={86}
        actions={<Button asChild size="sm"><Link to="/inventory/stock-risk">View inventory impact</Link></Button>}
      />
    </>
  );
}
