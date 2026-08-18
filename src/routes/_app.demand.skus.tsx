import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PageHeader, SectionCard } from "@/components/app/page-header";
import { SeverityBadge } from "@/components/app/badges";
import { FilterBar, defaultFilters, type FilterState } from "@/components/app/filter-bar";
import { EmptyState } from "@/components/app/states";
import { skus, stockRisks } from "@/data/demo";
import { categoryOptions, regionOptions, skuOptionsFor, storeOptionsFor } from "@/lib/filters";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/_app/demand/skus")({
  head: () => pageMeta("SKU Demand", "SKU-level demand, forecast variance and downstream inventory exposure."),
  component: SkuDemand,
});

const skuMetrics = skus.map((s, i) => ({
  ...s,
  forecast: [58400, 41200, 62800, 39400, 18600, 12400][i],
  variance: [18, 9, -12, 14, 3, -4][i],
  volatility: ["High", "Medium", "Medium", "High", "Low", "Low"][i],
}));

function SkuDemand() {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const rows = skuMetrics.filter(
    (s) => (filters.category === "all" || s.category === filters.category) && (filters.sku === "all" || s.id === filters.sku),
  );

  return (
    <>
      <PageHeader title="SKU Demand" subtitle="Which SKUs are driving volume, variance and downstream inventory exposure." />
      <FilterBar
        value={filters}
        onChange={setFilters}
        regionOptions={regionOptions}
        storeOptions={storeOptionsFor(filters.region)}
        categoryOptions={categoryOptions}
        skuOptions={skuOptionsFor(filters.category)}
      />
      <SectionCard title="SKU demand detail" description="Forecast, variance to baseline and current risk linkage." padded={false}>
        {rows.length === 0 ? (
          <div className="p-4">
            <EmptyState title="No SKUs match the selection" description="Broaden the category or SKU filter to review demand." />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SKU</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Forecast units (30d)</TableHead>
                <TableHead className="text-right">Variance to baseline</TableHead>
                <TableHead>Volatility</TableHead>
                <TableHead>Inventory risk</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((s) => {
                const risk = stockRisks.find((r) => r.skuId === s.id);
                return (
                  <TableRow key={s.id}>
                    <TableCell className="font-medium text-navy">{s.name}<span className="ml-2 text-xs text-muted-foreground">{s.code}</span></TableCell>
                    <TableCell className="text-muted-foreground">{s.category}</TableCell>
                    <TableCell className="num text-right">{s.forecast.toLocaleString("en-IN")}</TableCell>
                    <TableCell className={`num text-right ${s.variance >= 0 ? "text-positive" : "text-critical"}`}>
                      {s.variance > 0 ? "+" : ""}{s.variance}%
                    </TableCell>
                    <TableCell>{s.volatility}</TableCell>
                    <TableCell>{risk ? <SeverityBadge severity={risk.risk} /> : <span className="text-sm text-muted-foreground">None</span>}</TableCell>
                    <TableCell className="text-right">
                      <Button asChild size="sm" variant="ghost"><Link to="/inventory/stock-risk">Open risk</Link></Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </SectionCard>
    </>
  );
}
