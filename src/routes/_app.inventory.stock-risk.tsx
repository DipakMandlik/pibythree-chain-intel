import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PageHeader, SectionCard } from "@/components/app/page-header";
import { SeverityBadge } from "@/components/app/badges";
import { AiInsightCard } from "@/components/app/ai-insight-card";
import { AiProcessing, EmptyState } from "@/components/app/states";
import { FilterBar, defaultFilters, type FilterState } from "@/components/app/filter-bar";
import { skuById, stockRisks, storeById, type StockRisk } from "@/data/demo";
import { categoryOptions, matches, regionOptions, skuOptionsFor, storeOptionsFor } from "@/lib/filters";
import { decisionStore, useDecisions } from "@/lib/decision-store";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/_app/inventory/stock-risk")({
  head: () => pageMeta("Stock Risk", "Predicted stock-out exposure by store and SKU with AI transfer recommendations."),
  component: StockRiskPage,
});

function StockRiskPage() {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [selected, setSelected] = useState<StockRisk | null>(null);
  const [simulating, setSimulating] = useState(false);
  const [simulated, setSimulated] = useState(false);
  const decisions = useDecisions();
  const rows = stockRisks.filter((r) => matches(filters, r.skuId, r.storeId));

  const open = (r: StockRisk) => { setSelected(r); setSimulated(false); };

  const simulate = () => {
    setSimulating(true);
    setTimeout(() => { setSimulating(false); setSimulated(true); }, 1800);
  };

  return (
    <>
      <PageHeader title="Stock Risk" subtitle="SKUs projected to fall below safety stock within the planning horizon." />
      <FilterBar
        value={filters}
        onChange={setFilters}
        regionOptions={regionOptions}
        storeOptions={storeOptionsFor(filters.region)}
        categoryOptions={categoryOptions}
        skuOptions={skuOptionsFor(filters.category)}
        showHorizon={false}
      />
      <SectionCard title="Predicted stock-out risk" description="Click a row to open the AI risk detail." padded={false}>
        {rows.length === 0 ? (
          <div className="p-4">
            <EmptyState title="No critical inventory risks detected" description="The AI engine is currently monitoring all configured locations in this selection." />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SKU</TableHead>
                <TableHead>Store</TableHead>
                <TableHead className="text-right">Current stock</TableHead>
                <TableHead className="text-right">Forecast demand</TableHead>
                <TableHead className="text-right">Days cover</TableHead>
                <TableHead>Risk</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.id} onClick={() => open(r)} className="cursor-pointer">
                  <TableCell className="font-medium text-navy">{skuById(r.skuId).name}</TableCell>
                  <TableCell className="text-muted-foreground">{storeById(r.storeId).region} {storeById(r.storeId).code}</TableCell>
                  <TableCell className="num text-right">{r.currentStock}</TableCell>
                  <TableCell className="num text-right">{r.forecastDemand}</TableCell>
                  <TableCell className="num text-right">{r.daysCover}</TableCell>
                  <TableCell><SeverityBadge severity={r.risk} /></TableCell>
                  <TableCell className="text-sm capitalize text-muted-foreground">{decisions[r.id] ?? "pending"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </SectionCard>

      <Sheet open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-2xl">
          {selected && (
            <>
              <SheetHeader>
                <SheetTitle>{skuById(selected.skuId).name}</SheetTitle>
                <SheetDescription>{storeById(selected.storeId).name} {storeById(selected.storeId).code}</SheetDescription>
              </SheetHeader>
              <div className="space-y-4 p-4">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {[
                    { l: "Current stock", v: `${selected.currentStock}` },
                    { l: "Forecast demand", v: `${selected.forecastDemand}` },
                    { l: "Safety stock", v: `${selected.safetyStock}` },
                    { l: "Lead time", v: `${selected.leadTimeDays} days` },
                    { l: "Projected stock-out", v: `${selected.projectedStockoutDays} days` },
                    { l: "Exposure", v: `₹${selected.exposureLakh}L` },
                  ].map((k) => (
                    <div key={k.l} className="rounded-md border border-border bg-surface p-3">
                      <p className="label-eyebrow">{k.l}</p>
                      <p className="mt-0.5 text-base font-semibold text-navy num">{k.v}</p>
                    </div>
                  ))}
                </div>

                <AiInsightCard
                  title={
                    selected.sourceStoreId
                      ? `Transfer ${selected.transferQty} units from Store ${storeById(selected.sourceStoreId).code} to Store ${storeById(selected.storeId).code}`
                      : "Expedite the open purchase order for this SKU"
                  }
                  severity={selected.risk}
                  reason="Projected stock-out with insufficient safety stock; nearby excess inventory can be redeployed faster than new procurement."
                  evidence={[
                    `Forecast demand ${selected.forecastDemand} vs ${selected.currentStock} on hand`,
                    `Safety stock shortfall of ${Math.max(0, selected.safetyStock - selected.currentStock)} units`,
                    `Procurement lead time ${selected.leadTimeDays} days`,
                    "Demand forecast supports the action",
                  ]}
                  impact={`₹${selected.exposureLakh}L potential lost sales avoided`}
                  confidence={91}
                  actions={
                    <>
                      <Button size="sm" onClick={() => { decisionStore.set(selected.id, "approved"); toast.success("Recommendation approved", { description: "Transfer order created in the demonstration environment." }); }}>
                        Approve
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => { decisionStore.set(selected.id, "modified"); toast("Recommendation marked for modification"); }}>
                        Modify
                      </Button>
                      <Button size="sm" variant="outline" onClick={simulate}>Simulate impact</Button>
                    </>
                  }
                />

                {simulating && <AiProcessing steps={["Assessing inventory exposure…", "Modelling transfer lead time…", "Estimating service level impact…", "Generating simulation…"]} />}

                {simulated && (
                  <div className="panel p-4">
                    <p className="label-eyebrow">Simulated impact — illustrative scenario</p>
                    <div className="mt-3 grid gap-3 sm:grid-cols-3">
                      <div className="rounded-md border border-border bg-surface p-3">
                        <p className="text-xs text-muted-foreground">Current stock-out probability</p>
                        <p className="mt-1 text-xl font-semibold text-critical num">{selected.stockoutProbability}%</p>
                      </div>
                      <div className="rounded-md border border-border bg-surface p-3">
                        <p className="text-xs text-muted-foreground">After recommendation</p>
                        <p className="mt-1 text-xl font-semibold text-positive num">{Math.max(6, selected.stockoutProbability - 68)}%</p>
                      </div>
                      <div className="rounded-md border border-border bg-surface p-3">
                        <p className="text-xs text-muted-foreground">Lost sales avoided</p>
                        <p className="mt-1 text-xl font-semibold text-navy num">₹{selected.exposureLakh}L</p>
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground">Inventory imbalance −18% · Service level +7% (simulated).</p>
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  <Button asChild size="sm" variant="outline"><Link to="/inventory/transfers">Transfer recommendations</Link></Button>
                  <Button asChild size="sm" variant="outline"><Link to="/procurement/suppliers">Check supplier risk</Link></Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
