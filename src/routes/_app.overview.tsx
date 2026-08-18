import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { KpiCard, KpiGrid } from "@/components/app/kpi-card";
import { PageHeader, SectionCard } from "@/components/app/page-header";
import { SeverityBadge } from "@/components/app/badges";
import { DemandChart } from "@/components/app/charts";
import { AiInsightCard } from "@/components/app/ai-insight-card";
import { buildDemandSeries, recommendations, alerts, inventoryHealthDistribution } from "@/data/demo";
import { useSession } from "@/lib/session";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/_app/overview")({
  head: () =>
    pageMeta(
      "Executive Overview",
      "AI-powered executive visibility across retail demand, inventory and procurement performance.",
    ),
  component: Overview,
});

const series = buildDemandSeries(41, 9600, 0.14, 70, 21);

const briefing = [
  { severity: "critical" as const, label: "Critical", text: "27 stores have elevated stock-out exposure across 38 SKUs.", to: "/inventory/stock-risk" },
  { severity: "high" as const, label: "Demand Signal", text: "Beverage demand is trending above historical baseline in Mumbai.", to: "/demand/drivers" },
  { severity: "medium" as const, label: "Procurement Signal", text: "14 supplier-SKU combinations show potential savings opportunities.", to: "/procurement/pricing" },
  { severity: "opportunity" as const, label: "AI Opportunity", text: "₹18.4L potential procurement savings identified this cycle.", to: "/procurement/savings" },
];

function Overview() {
  const session = useSession();
  const navigate = useNavigate();
  const hero = recommendations[0];

  return (
    <>
      <PageHeader
        title="Supply & Demand Intelligence"
        subtitle="AI-powered visibility across demand, inventory and procurement."
        actions={
          <>
            <span className="hidden text-xs text-muted-foreground sm:inline">Data refreshed 09:42 AM</span>
            <Button asChild size="sm">
              <Link to="/ai/recommendations">
                View all recommendations <ArrowRight className="size-3.5" />
              </Link>
            </Button>
          </>
        }
      />

      {session && (
        <p className="text-sm text-muted-foreground">
          Welcome back, <span className="font-medium text-navy">{session.name}</span> — {session.objective}.
        </p>
      )}

      <KpiGrid>
        <KpiCard label="Forecast Accuracy" value="91.4%" change="3.8%" direction="up" changeTone="positive" caption="vs previous period" spark={[86, 87, 88, 89, 90, 91, 91.4]} onClick={() => navigate({ to: "/demand/accuracy" })} />
        <KpiCard label="Inventory Health" value="87%" change="1.2%" direction="up" changeTone="positive" caption="Healthy inventory position" spark={[82, 83, 85, 84, 86, 87, 87]} onClick={() => navigate({ to: "/inventory" })} />
        <KpiCard label="Stock-out Risk" value="142 SKUs" change="18%" direction="down" changeTone="positive" caption="vs previous week" spark={[186, 178, 172, 165, 158, 149, 142]} onClick={() => navigate({ to: "/inventory/stock-risk" })} />
        <KpiCard label="Excess Inventory" value="₹8.4 Cr" change="4.1%" direction="down" changeTone="positive" caption="Optimization opportunity" spark={[9.6, 9.4, 9.1, 8.9, 8.7, 8.5, 8.4]} onClick={() => navigate({ to: "/inventory/excess" })} />
        <KpiCard label="Procurement Savings" value="₹18.4L" change="2.6L" direction="up" changeTone="positive" caption="AI-identified opportunity" spark={[12, 13.4, 14.2, 15.6, 16.8, 17.9, 18.4]} onClick={() => navigate({ to: "/procurement/savings" })} />
        <KpiCard label="Supplier Performance" value="92 / 100" change="1.0" direction="up" changeTone="positive" caption="Weighted supplier score" spark={[88, 89, 89, 90, 91, 91, 92]} onClick={() => navigate({ to: "/procurement/suppliers" })} />
      </KpiGrid>

      <section className="panel overflow-hidden">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-surface px-4 py-3">
          <div className="flex items-center gap-2.5">
            <span className="flex size-7 items-center justify-center rounded-md bg-primary/10 text-primary">
              <Sparkles className="size-4" />
            </span>
            <div>
              <h2 className="text-sm font-semibold text-navy">AI Supply Chain Briefing</h2>
              <p className="text-xs text-muted-foreground">What requires attention today?</p>
            </div>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link to="/ai/alerts">Review alerts</Link>
          </Button>
        </header>
        <ul className="grid divide-y divide-border md:grid-cols-2 md:divide-y-0 xl:grid-cols-4">
          {briefing.map((b) => (
            <li key={b.label} className="border-border p-4 md:border-r last:md:border-r-0">
              <SeverityBadge severity={b.severity} label={b.label} />
              <p className="mt-2 text-sm text-foreground/90">{b.text}</p>
              <Link to={b.to} className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline">
                Investigate <ArrowRight className="size-3" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <div className="grid gap-5 xl:grid-cols-3">
        <SectionCard
          title="Enterprise demand — actual vs forecast"
          description="Aggregated daily units across all regions, with confidence band and promotion markers."
          actions={<Button asChild size="sm" variant="ghost"><Link to="/demand">Open demand intelligence</Link></Button>}
        >
          <DemandChart data={series} />
          <p className="mt-3 text-sm text-muted-foreground">
            <span className="font-medium text-navy">So what?</span> Forecast is tracking 14% above the prior period in
            Mumbai beverages, which is the primary driver of current inventory exposure.
          </p>
        </SectionCard>

        <SectionCard title="Inventory health distribution" description="Share of monitored store-SKU positions.">
          <ul className="space-y-3">
            {inventoryHealthDistribution.map((d) => (
              <li key={d.state}>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-foreground/90">{d.state}</span>
                  <span className="num font-semibold text-navy">{d.value}%</span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-surface-strong">
                  <div className="h-full rounded-full" style={{ width: `${d.value}%`, background: d.color }} />
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 rounded-md border border-border bg-surface p-3 text-sm">
            <p className="label-eyebrow">Interpretation</p>
            <p className="mt-1 text-muted-foreground">
              Critical and at-risk positions are concentrated in Mumbai beverages; excess is concentrated in Store #087
              and Hyderabad.
            </p>
          </div>
        </SectionCard>
      </div>

      <AiInsightCard
        title={hero.title}
        severity={hero.severity}
        reason={hero.reason}
        evidence={hero.evidence}
        impact={hero.impact}
        confidence={hero.confidence}
        link={{ to: "/inventory/stock-risk", label: "Open stock risk" }}
      />

      <SectionCard title="Latest alerts" description="Ranked by business exposure." padded={false}>
        <ul className="divide-y divide-border">
          {alerts.slice(0, 3).map((a) => (
            <li key={a.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
              <div>
                <div className="flex items-center gap-2">
                  <SeverityBadge severity={a.severity} />
                  <p className="text-sm font-medium text-navy">{a.title}</p>
                </div>
                <p className="mt-0.5 text-sm text-muted-foreground">{a.what}</p>
              </div>
              <Button asChild size="sm" variant="outline">
                <Link to={a.link}>Open</Link>
              </Button>
            </li>
          ))}
        </ul>
      </SectionCard>
    </>
  );
}
