import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { KpiCard, KpiGrid } from "@/components/app/kpi-card";
import { PageHeader, SectionCard } from "@/components/app/page-header";
import { SeverityBadge } from "@/components/app/badges";
import { DemandChart } from "@/components/app/charts";
import { FilterBar, defaultFilters, type FilterState } from "@/components/app/filter-bar";
import { EmptyState } from "@/components/app/states";
import { buildDemandSeries, demandSignals, skuById, storeById, type DemandSignal } from "@/data/demo";
import { categoryOptions, filterSeed, matches, regionOptions, skuOptionsFor, storeOptionsFor } from "@/lib/filters";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/_app/demand")({
  head: () =>
    pageMeta("Demand Overview", "Predictive demand intelligence across regions, stores, categories and SKUs."),
  component: DemandOverview,
});

function DemandOverview() {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [signal, setSignal] = useState<DemandSignal | null>(null);

  const horizon = Number(filters.horizon);
  const seed = filterSeed(filters);
  const scale = filters.sku !== "all" ? 0.22 : filters.store !== "all" ? 0.34 : filters.category !== "all" ? 0.5 : 1;
  const series = useMemo(
    () => buildDemandSeries(seed, Math.round(9600 * scale), 0.14, Math.min(84, horizon * 3), horizon),
    [seed, scale, horizon],
  );

  const visibleSignals = demandSignals.filter((s) => matches(filters, s.skuId, s.storeId));
  const forecastUnits = series.filter((p) => p.actual === null).reduce((a, p) => a + p.forecast, 0);

  return (
    <>
      <PageHeader
        title="Predictive Demand Intelligence"
        subtitle="Forecast demand across stores, categories, SKUs and regions using historical consumption, seasonality, promotions and local demand signals."
        actions={
          <Button asChild size="sm" variant="outline">
            <Link to="/demand/forecast-explorer">Open forecast explorer</Link>
          </Button>
        }
      />

      <FilterBar
        value={filters}
        onChange={setFilters}
        regionOptions={regionOptions}
        storeOptions={storeOptionsFor(filters.region)}
        categoryOptions={categoryOptions}
        skuOptions={skuOptionsFor(filters.category)}
      />

      <KpiGrid>
        <KpiCard label="Forecast Accuracy" value="91.4%" change="3.8%" direction="up" changeTone="positive" caption="vs previous period" spark={[87, 88, 89, 90, 90.5, 91, 91.4]} />
        <KpiCard label="Forecasted Units" value={`${(forecastUnits / 1_000_000).toFixed(2)}M`} change="8.7%" direction="up" changeTone="positive" caption={`next ${horizon} days`} spark={[2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.84]} />
        <KpiCard label="Demand Growth" value="+8.7%" change="1.4%" direction="up" changeTone="positive" caption="vs prior 30 days" spark={[4, 5, 6, 6.8, 7.4, 8.2, 8.7]} />
        <KpiCard label="High Variance SKUs" value="126" change="9" direction="down" changeTone="positive" caption="reduced forecast volatility" spark={[152, 148, 141, 137, 132, 129, 126]} />
        <KpiCard label="Demand Anomalies" value={`${visibleSignals.length || 18}`} caption="detected in current selection" spark={[22, 21, 20, 19, 18, 18, 18]} />
        <KpiCard label="Promotion Coverage" value="6 events" caption="active in selected window" spark={[3, 4, 4, 5, 5, 6, 6]} />
      </KpiGrid>

      <SectionCard
        title="Actual vs forecast"
        description="Historical actuals, forward forecast, confidence interval and promotion markers."
      >
        <DemandChart data={series} height={330} />
        <p className="mt-3 text-sm text-muted-foreground">
          <span className="font-medium text-navy">So what?</span> The forward curve sits above the trailing baseline for
          the selected scope, which increases downstream inventory exposure.
        </p>
      </SectionCard>

      <div className="grid gap-5 xl:grid-cols-[1.6fr_1fr]">
        <SectionCard title="Demand signals" description="Anomalies and deviations detected by the AI engine." padded={false}>
          {visibleSignals.length === 0 ? (
            <div className="p-4">
              <EmptyState
                title="No demand anomalies detected"
                description="The AI engine is monitoring the selected scope and has not identified deviations beyond the confidence band."
              />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>SKU</TableHead>
                  <TableHead>Store</TableHead>
                  <TableHead>Signal</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>AI interpretation</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {visibleSignals.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell className="font-medium text-navy">{skuById(s.skuId).name}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {storeById(s.storeId).region} {storeById(s.storeId).code}
                    </TableCell>
                    <TableCell>{s.signal}</TableCell>
                    <TableCell><SeverityBadge severity={s.severity} /></TableCell>
                    <TableCell className="text-muted-foreground">{s.interpretation}</TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="ghost" onClick={() => setSignal(s)}>
                        <Search className="size-3.5" /> Investigate
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </SectionCard>

        <SectionCard title="Forecast impact" description="How this demand movement propagates downstream.">
          <ol className="space-y-3">
            {[
              { k: "Demand increase", v: "+14%" },
              { k: "Inventory exposure", v: "₹3.8 Cr" },
              { k: "Potential stock-outs", v: "38 SKUs" },
              { k: "Recommended action", v: "Replenishment / Transfer" },
            ].map((row, i, arr) => (
              <li key={row.k}>
                <div className="rounded-md border border-border bg-surface px-3 py-2.5">
                  <p className="label-eyebrow">{row.k}</p>
                  <p className="mt-0.5 text-lg font-semibold text-navy num">{row.v}</p>
                </div>
                {i < arr.length - 1 && <div className="mx-auto h-3 w-px bg-border-strong" />}
              </li>
            ))}
          </ol>
          <Button asChild className="mt-4 w-full">
            <Link to="/inventory/stock-risk">
              View inventory impact <ArrowRight className="size-3.5" />
            </Link>
          </Button>
        </SectionCard>
      </div>

      <Dialog open={!!signal} onOpenChange={(o) => !o && setSignal(null)}>
        <DialogContent className="max-w-lg">
          {signal && (
            <>
              <DialogHeader>
                <DialogTitle>{skuById(signal.skuId).name}</DialogTitle>
                <DialogDescription>
                  {storeById(signal.storeId).name} {storeById(signal.storeId).code} · {signal.signal}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <SeverityBadge severity={signal.severity} />
                  <span className="num font-semibold text-navy">
                    {signal.variance > 0 ? "+" : ""}
                    {signal.variance}% vs baseline
                  </span>
                </div>
                <div>
                  <p className="label-eyebrow">AI analysis</p>
                  <p className="mt-1 text-muted-foreground">{signal.detail}</p>
                </div>
                <div>
                  <p className="label-eyebrow">Recommended next step</p>
                  <p className="mt-1 text-muted-foreground">
                    Review the inventory position for this store-SKU and validate the forecast adjustment before the
                    next replenishment cycle.
                  </p>
                </div>
                <div className="flex gap-2 pt-1">
                  <Button asChild size="sm"><Link to="/inventory/stock-risk">Check inventory risk</Link></Button>
                  <Button asChild size="sm" variant="outline"><Link to="/demand/drivers">View demand drivers</Link></Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
