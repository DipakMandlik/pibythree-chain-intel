import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
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
import { forecastAccuracyByStore, stores } from "@/data/demo";
import { categoryOptions, regionOptions, skuOptionsFor, storeOptionsFor } from "@/lib/filters";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/_app/demand/stores")({
  head: () =>
    pageMeta(
      "Store Demand",
      "Store-level demand, forecast growth, variance and confidence across the network.",
    ),
  component: StoreDemand,
});

const growthByIndex = [14.2, -2.1, 6.4, 5.1, 2.8, 3.6, 4.4, 3.1, -1.6, 7.2, 2.4, 9.8, -3.2, 5.6];
const varianceByIndex = [8.4, 3.1, 5.6, 4.9, 3.4, 4.1, 6.8, 5.2, 3.9, 6.1, 4.6, 7.9, 5.8, 6.4];

const metrics = stores.map((s, i) => {
  const currentDemand = 18400 + i * 2600;
  const growth = growthByIndex[i % growthByIndex.length]!;
  return {
    ...s,
    currentDemand,
    forecast: Math.round(currentDemand * (1 + growth / 100)),
    growth,
    variance: varianceByIndex[i % varianceByIndex.length]!,
    confidence: forecastAccuracyByStore[i]?.confidence ?? 85,
    trend: growth > 2 ? "Increasing" : growth < -2 ? "Decreasing" : "Stable",
  };
});

function StoreDemand() {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const rows = metrics.filter(
    (m) =>
      (filters.region === "all" || m.region === filters.region) &&
      (filters.store === "all" || m.id === filters.store),
  );

  return (
    <>
      <PageHeader
        title="Store Demand"
        subtitle="Where demand is accelerating, and where forecast quality needs attention."
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
        title="Forecasted demand by store"
        description="Units forecast for the selected horizon."
      >
        {rows.length === 0 ? (
          <EmptyState
            title="No stores in the current selection"
            description="Adjust the region or store filter to review demand performance."
          />
        ) : (
          <div style={{ height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={rows.map((r) => ({ name: `${r.city} ${r.code}`, forecast: r.forecast }))}
                margin={{ left: -12, right: 8 }}
              >
                <CartesianGrid stroke="var(--color-border)" vertical={false} />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                  interval={0}
                  angle={-20}
                  height={56}
                  textAnchor="end"
                />
                <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    fontSize: 12,
                    borderRadius: 8,
                    border: "1px solid var(--color-border)",
                  }}
                />
                <Bar
                  dataKey="forecast"
                  fill="var(--color-primary)"
                  radius={[3, 3, 0, 0]}
                  isAnimationActive={false}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </SectionCard>

      <SectionCard
        title="Store demand detail"
        description="Current demand, forecast, growth, variance and forecast confidence."
        padded={false}
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Store</TableHead>
              <TableHead>Region</TableHead>
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
            {rows.map((r) => (
              <TableRow key={r.id}>
                <TableCell className="font-medium text-navy">
                  {r.name} {r.code}
                </TableCell>
                <TableCell className="text-muted-foreground">{r.region}</TableCell>
                <TableCell className="num text-right">
                  {r.currentDemand.toLocaleString("en-IN")}
                </TableCell>
                <TableCell className="num text-right">
                  {r.forecast.toLocaleString("en-IN")}
                </TableCell>
                <TableCell
                  className={`num text-right ${r.growth >= 0 ? "text-positive" : "text-critical"}`}
                >
                  {r.growth > 0 ? "+" : ""}
                  {r.growth}%
                </TableCell>
                <TableCell className="num text-right">{r.variance}%</TableCell>
                <TableCell className="num text-right">{r.confidence}%</TableCell>
                <TableCell className="text-muted-foreground">{r.trend}</TableCell>
                <TableCell className="text-right">
                  <Button asChild size="sm" variant="ghost">
                    <Link to="/demand/forecast-explorer">View forecast</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </SectionCard>
    </>
  );
}
