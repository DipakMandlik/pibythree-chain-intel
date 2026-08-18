import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PageHeader, SectionCard } from "@/components/app/page-header";
import { FilterBar, defaultFilters, type FilterState } from "@/components/app/filter-bar";
import { EmptyState } from "@/components/app/states";
import { forecastAccuracyBySku, skus } from "@/data/demo";
import { categoryOptions, regionOptions, skuOptionsFor, storeOptionsFor } from "@/lib/filters";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/_app/demand/skus")({
  head: () => pageMeta("SKU Demand", "SKU-level demand, forecast growth, variance and confidence."),
  component: SkuDemand,
});

const growthByIndex = [18, 9, -12, 14, 3, -4, 6, 11, -7, 8];

const skuMetrics = skus.map((s, i) => {
  const currentDemand =
    [58400, 41200, 62800, 39400, 18600, 12400, 21800, 15200, 27600, 33900][i] ?? 20000;
  const growth = growthByIndex[i % growthByIndex.length]!;
  return {
    ...s,
    currentDemand,
    forecast: Math.round(currentDemand * (1 + growth / 100)),
    growth,
    variance: [18, 9, 12, 14, 3, 4, 7, 11, 6, 9][i] ?? 8,
    confidence: forecastAccuracyBySku[i]?.confidence ?? 85,
    trend: growth > 2 ? "Increasing" : growth < -2 ? "Decreasing" : "Stable",
  };
});

function SkuDemand() {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const rows = skuMetrics.filter(
    (s) =>
      (filters.category === "all" || s.category === filters.category) &&
      (filters.sku === "all" || s.id === filters.sku),
  );

  return (
    <>
      <PageHeader
        title="SKU Demand"
        subtitle="Which SKUs are driving volume, growth and forecast variance."
      />
      <FilterBar
        value={filters}
        onChange={setFilters}
        regionOptions={regionOptions}
        storeOptions={storeOptionsFor(filters.region)}
        categoryOptions={categoryOptions}
        skuOptions={skuOptionsFor(filters.category)}
        showDateRange={false}
      />
      <SectionCard
        title="SKU demand detail"
        description="Current demand, forecast, growth, variance and forecast confidence."
        padded={false}
      >
        {rows.length === 0 ? (
          <div className="p-4">
            <EmptyState
              title="No SKUs match the selection"
              description="Broaden the category or SKU filter to review demand."
            />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SKU</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Current Demand</TableHead>
                <TableHead className="text-right">Forecast</TableHead>
                <TableHead className="text-right">Growth</TableHead>
                <TableHead className="text-right">Variance</TableHead>
                <TableHead className="text-right">Confidence</TableHead>
                <TableHead>Trend</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((s) => (
                <TableRow key={s.id}>
                  <TableCell className="font-medium text-navy">
                    {s.name}
                    <span className="ml-2 text-xs text-muted-foreground">{s.code}</span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{s.category}</TableCell>
                  <TableCell className="num text-right">
                    {s.currentDemand.toLocaleString("en-IN")}
                  </TableCell>
                  <TableCell className="num text-right">
                    {s.forecast.toLocaleString("en-IN")}
                  </TableCell>
                  <TableCell
                    className={`num text-right ${s.growth >= 0 ? "text-positive" : "text-critical"}`}
                  >
                    {s.growth > 0 ? "+" : ""}
                    {s.growth}%
                  </TableCell>
                  <TableCell className="num text-right">{s.variance}%</TableCell>
                  <TableCell className="num text-right">{s.confidence}%</TableCell>
                  <TableCell className="text-muted-foreground">{s.trend}</TableCell>
                  <TableCell className="text-right">
                    <Button asChild size="sm" variant="ghost">
                      <Link to="/demand/forecast-explorer">View forecast</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </SectionCard>
    </>
  );
}
