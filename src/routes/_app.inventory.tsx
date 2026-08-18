import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PageHeader, SectionCard } from "@/components/app/page-header";
import { KpiCard, KpiGrid } from "@/components/app/kpi-card";
import { AiInsightCard } from "@/components/app/ai-insight-card";
import { inventoryHealthDistribution, recommendations, stores } from "@/data/demo";
import { StatusPill } from "@/components/app/badges";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/_app/inventory")({
  head: () => pageMeta("Inventory Overview", "Anticipate stock risk and optimize inventory positioning across stores and DCs."),
  component: InventoryOverview,
});

function InventoryOverview() {
  const rec = recommendations[0];
  return (
    <>
      <PageHeader title="Autonomous Inventory Intelligence" subtitle="Anticipate stock risk and optimize inventory positioning." />
      <KpiGrid>
        <KpiCard label="Total Inventory" value="₹328 Cr" change="1.8%" direction="down" changeTone="positive" caption="network-wide stock value" spark={[340, 338, 335, 333, 331, 329, 328]} />
        <KpiCard label="Inventory Health" value="87%" change="1.2%" direction="up" changeTone="positive" caption="healthy positions" spark={[82, 83, 84, 85, 86, 87, 87]} />
        <KpiCard label="Stock-out Risk" value="142" change="18%" direction="down" changeTone="positive" caption="SKUs at risk" spark={[186, 178, 170, 162, 154, 148, 142]} />
        <KpiCard label="Excess Inventory" value="₹8.4 Cr" change="4.1%" direction="down" changeTone="positive" caption="optimization opportunity" spark={[9.6, 9.3, 9, 8.8, 8.6, 8.5, 8.4]} />
        <KpiCard label="Days of Inventory" value="12.8" change="0.6" direction="down" changeTone="positive" caption="days of cover" spark={[14.2, 14, 13.6, 13.3, 13, 12.9, 12.8]} />
        <KpiCard label="Transfer Opportunities" value="38" caption="AI-identified rebalancing moves" spark={[24, 27, 30, 32, 34, 36, 38]} />
      </KpiGrid>

      <div className="grid gap-5 xl:grid-cols-[1fr_1.2fr]">
        <SectionCard title="Inventory health distribution" description="Share of monitored store-SKU positions.">
          <ul className="space-y-3">
            {inventoryHealthDistribution.map((d) => (
              <li key={d.state}>
                <div className="flex items-center justify-between text-sm">
                  <span>{d.state}</span>
                  <span className="num font-semibold text-navy">{d.value}%</span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-surface-strong">
                  <div className="h-full rounded-full" style={{ width: `${d.value}%`, background: d.color }} />
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>
        <SectionCard title="Network posture" description="Store status across regions." padded={false}>
          <ul className="divide-y divide-border">
            {stores.map((s) => (
              <li key={s.id} className="flex items-center justify-between gap-3 px-4 py-2.5">
                <div>
                  <p className="text-sm font-medium text-navy">{s.name} {s.code}</p>
                  <p className="text-xs text-muted-foreground num">{s.daysOfCover} days cover · ₹{s.stockValueCr} Cr</p>
                </div>
                <StatusPill tone={s.status === "critical" ? "critical" : s.status === "at_risk" ? "warning" : s.status === "excess" ? "info" : "positive"}>
                  {s.status.replace("_", " ")}
                </StatusPill>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>

      <AiInsightCard
        title={rec.title}
        severity={rec.severity}
        reason={rec.reason}
        evidence={rec.evidence}
        impact={rec.impact}
        confidence={rec.confidence}
        actions={<Button asChild size="sm"><Link to="/inventory/stock-risk">Open stock risk</Link></Button>}
      />
    </>
  );
}
