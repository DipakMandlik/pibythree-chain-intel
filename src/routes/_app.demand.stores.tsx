import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PageHeader, SectionCard } from "@/components/app/page-header";
import { StatusPill } from "@/components/app/badges";
import { FilterBar, defaultFilters, type FilterState } from "@/components/app/filter-bar";
import { EmptyState } from "@/components/app/states";
import { stores } from "@/data/demo";
import { categoryOptions, regionOptions, skuOptionsFor, storeOptionsFor } from "@/lib/filters";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/_app/demand/stores")({
  head: () => pageMeta("Store Demand", "Store-level demand performance, forecast growth and variance across the network."),
  component: StoreDemand,
});

const metrics = stores.map((s, i) => ({
  ...s,
  forecast: 18400 + i * 2600,
  growth: [14.2, -2.1, 6.4, 5.1, 2.8, 3.6, 4.4, -1.2][i],
  accuracy: [88.4, 93.1, 90.2, 91.8, 94.0, 92.6, 90.9, 89.7][i],
}));

function StoreDemand() {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const rows = metrics.filter(
    (m) => (filters.region === "all" || m.region === filters.region) && (filters.store === "all" || m.id === filters.store),
  );

  return (
    <>
      <PageHeader title="Store Demand" subtitle="Where demand is accelerating, and where forecast quality needs attention." />
      <FilterBar
        value={filters}
        onChange={setFilters}
        regionOptions={regionOptions}
        storeOptions={storeOptionsFor(filters.region)}
        categoryOptions={categoryOptions}
        skuOptions={skuOptionsFor(filters.category)}
      />

      <SectionCard title="Forecast volume by store" description="Units forecast for the next 30 days.">
        {rows.length === 0 ? (
          <EmptyState title="No stores in the current selection" description="Adjust the region or store filter to review demand performance." />
        ) : (
          <div style={{ height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={rows.map((r) => ({ name: `${r.region} ${r.code}`, forecast: r.forecast }))} margin={{ left: -12, right: 8 }}>
                <CartesianGrid stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} interval={0} angle={-12} height={48} textAnchor="end" />
                <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid var(--color-border)" }} />
                <Bar dataKey="forecast" fill="var(--color-primary)" radius={[3, 3, 0, 0]} isAnimationActive={false} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </SectionCard>

      <SectionCard title="Store demand detail" description="Growth, forecast accuracy and inventory posture." padded={false}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Store</TableHead>
              <TableHead>Region</TableHead>
              <TableHead className="text-right">Forecast units (30d)</TableHead>
              <TableHead className="text-right">Demand growth</TableHead>
              <TableHead className="text-right">Forecast accuracy</TableHead>
              <TableHead>Inventory posture</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((r) => (
              <TableRow key={r.id}>
                <TableCell className="font-medium text-navy">{r.name} {r.code}</TableCell>
                <TableCell className="text-muted-foreground">{r.region}</TableCell>
                <TableCell className="num text-right">{r.forecast.toLocaleString("en-IN")}</TableCell>
                <TableCell className={`num text-right ${r.growth >= 0 ? "text-positive" : "text-critical"}`}>
                  {r.growth > 0 ? "+" : ""}{r.growth}%
                </TableCell>
                <TableCell className="num text-right">{r.accuracy}%</TableCell>
                <TableCell>
                  <StatusPill tone={r.status === "critical" ? "critical" : r.status === "at_risk" ? "warning" : r.status === "excess" ? "info" : "positive"}>
                    {r.status.replace("_", " ")}
                  </StatusPill>
                </TableCell>
                <TableCell className="text-right">
                  <Button asChild size="sm" variant="ghost"><Link to="/inventory/balance">Inventory</Link></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </SectionCard>
    </>
  );
}
