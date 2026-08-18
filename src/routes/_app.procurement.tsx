import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PageHeader, SectionCard } from "@/components/app/page-header";
import { KpiCard, KpiGrid } from "@/components/app/kpi-card";
import { AiInsightCard } from "@/components/app/ai-insight-card";
import { savingsBreakdown, suppliers } from "@/data/demo";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/_app/procurement")({
  head: () => pageMeta("Procurement Overview", "Improve supplier decisions, sourcing efficiency and procurement economics."),
  component: ProcurementOverview,
});

function ProcurementOverview() {
  return (
    <>
      <PageHeader title="AI-Augmented Procurement" subtitle="Improve supplier decisions, sourcing efficiency and procurement economics." />
      <KpiGrid>
        <KpiCard label="Total Procurement Spend" value="₹412 Cr" change="2.4%" direction="up" changeTone="neutral" caption="rolling 12 months" spark={[386, 391, 396, 400, 405, 409, 412]} />
        <KpiCard label="Open POs" value="1,284" change="46" direction="down" changeTone="positive" caption="vs previous week" spark={[1400, 1372, 1350, 1330, 1310, 1296, 1284]} />
        <KpiCard label="Active Suppliers" value="428" caption="across all categories" spark={[402, 408, 412, 418, 422, 425, 428]} />
        <KpiCard label="Supplier Score" value="92 / 100" change="1.0" direction="up" changeTone="positive" caption="weighted performance" spark={[88, 89, 89, 90, 91, 91, 92]} />
        <KpiCard label="Savings Opportunity" value="₹18.4L" change="2.6L" direction="up" changeTone="positive" caption="AI-identified" spark={[12, 13, 14, 15.6, 16.8, 17.9, 18.4]} />
        <KpiCard label="Price Variances" value="64" change="8" direction="down" changeTone="positive" caption="SKU-supplier deviations" spark={[86, 82, 78, 74, 70, 67, 64]} />
      </KpiGrid>

      <div className="grid gap-5 xl:grid-cols-2">
        <SectionCard title="Supplier performance" description="Weighted AI score across delivery, quality, pricing and fill rate." padded={false}>
          <ul className="divide-y divide-border">
            {suppliers.map((s) => (
              <li key={s.id} className="flex items-center justify-between gap-3 px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-navy">{s.name}</p>
                  <p className="text-xs text-muted-foreground num">₹{s.spendCr} Cr spend · delivery {s.delivery}%</p>
                </div>
                <span className="num text-lg font-semibold text-navy">{s.aiScore}</span>
              </li>
            ))}
          </ul>
        </SectionCard>
        <SectionCard title="Savings levers" description="Where procurement economics can improve.">
          <ul className="space-y-3">
            {savingsBreakdown.map((s) => (
              <li key={s.id}>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-foreground/90">{s.lever}</span>
                  <span className="num font-semibold text-navy">₹{s.valueLakh}L</span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-surface-strong">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${(s.valueLakh / 7.2) * 100}%` }} />
                </div>
              </li>
            ))}
          </ul>
          <Button asChild size="sm" className="mt-4"><Link to="/procurement/savings">Explore savings</Link></Button>
        </SectionCard>
      </div>

      <AiInsightCard
        title="Review Supplier B allocation for time-sensitive beverage SKUs"
        severity="high"
        reason="Delivery performance declined to 78% while two purchase orders are already delayed."
        evidence={["2 delayed purchase orders this week", "Lead-time variance up 2.4 days", "Supplier A and C fill rates above 93%"]}
        impact="₹4.2L potential savings and reduced delivery risk"
        confidence={88}
        link={{ to: "/procurement/suppliers", label: "Open supplier intelligence" }}
      />
    </>
  );
}
