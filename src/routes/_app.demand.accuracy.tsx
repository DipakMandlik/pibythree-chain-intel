import { createFileRoute } from "@tanstack/react-router";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PageHeader, SectionCard } from "@/components/app/page-header";
import { KpiCard, KpiGrid } from "@/components/app/kpi-card";
import {
  biasBucket,
  forecastAccuracyByCategory,
  forecastAccuracyByHorizon,
  forecastAccuracyBySku,
  forecastAccuracyByStore,
  kpiHeadline,
  skuById,
  storeById,
} from "@/data/demo";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/_app/demand/accuracy")({
  head: () =>
    pageMeta(
      "Forecast Accuracy",
      "Forecast accuracy, bias and MAPE across categories, stores, SKUs and horizons.",
    ),
  component: Accuracy,
});

const tooltipStyle = { fontSize: 12, borderRadius: 8, border: "1px solid var(--color-border)" };

const biasBuckets: Array<{ key: "Under-forecast" | "Balanced" | "Over-forecast"; tone: string }> = [
  { key: "Under-forecast", tone: "var(--color-critical)" },
  { key: "Balanced", tone: "var(--color-positive)" },
  { key: "Over-forecast", tone: "var(--color-warning)" },
];

function Accuracy() {
  const byStore = forecastAccuracyByStore.map((r) => ({
    name: `${storeById(r.storeId).city} ${storeById(r.storeId).code}`,
    accuracy: r.accuracy,
  }));
  const bySku = forecastAccuracyBySku.map((r) => ({
    name: skuById(r.skuId).name,
    accuracy: r.accuracy,
  }));

  return (
    <>
      <PageHeader
        title="Forecast Accuracy"
        subtitle="Model quality across categories, stores, SKUs and forecast horizons."
      />
      <KpiGrid className="2xl:grid-cols-5">
        <KpiCard
          label="Overall Accuracy"
          value={`${kpiHeadline.forecastAccuracyPct}%`}
          change={`${kpiHeadline.forecastAccuracyChangePts}%`}
          direction="up"
          changeTone="positive"
          caption="vs previous forecasting cycle"
          spark={[87, 88, 89, 90, 91, 91.2, kpiHeadline.forecastAccuracyPct]}
        />
        <KpiCard
          label="MAPE"
          value={`${kpiHeadline.mapePct}%`}
          caption="mean absolute % error"
          spark={[9.4, 8.8, 8.1, 7.5, 7, 6.6, kpiHeadline.mapePct]}
        />
        <KpiCard
          label="Bias"
          value={`+${kpiHeadline.biasPct}%`}
          caption="slight over-forecast, portfolio average"
          spark={[2.4, 2.1, 1.8, 1.4, 1.2, 1, kpiHeadline.biasPct]}
        />
        <KpiCard
          label="Best Performing Category"
          value={kpiHeadline.bestPerformingCategory}
          caption="highest forecast accuracy"
        />
        <KpiCard
          label="Highest Variance Category"
          value={kpiHeadline.highestVarianceCategory}
          caption="prioritised for retraining"
        />
      </KpiGrid>

      <SectionCard
        title="Accuracy breakdown"
        description="Higher is better. Segments below 90% are prioritised for retraining."
      >
        <Tabs defaultValue="category">
          <TabsList>
            <TabsTrigger value="category">By category</TabsTrigger>
            <TabsTrigger value="store">By store</TabsTrigger>
            <TabsTrigger value="sku">By SKU</TabsTrigger>
            <TabsTrigger value="horizon">By horizon</TabsTrigger>
          </TabsList>
          <TabsContent value="category">
            <div style={{ height: 280 }} className="mt-3">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={forecastAccuracyByCategory} margin={{ left: -12, right: 8 }}>
                  <CartesianGrid stroke="var(--color-border)" vertical={false} />
                  <XAxis
                    dataKey="category"
                    tick={{ fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                    interval={0}
                    angle={-12}
                    height={48}
                    textAnchor="end"
                  />
                  <YAxis
                    domain={[80, 100]}
                    tick={{ fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar
                    dataKey="accuracy"
                    name="Accuracy %"
                    fill="var(--color-primary)"
                    radius={[3, 3, 0, 0]}
                    isAnimationActive={false}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          <TabsContent value="store">
            <div style={{ height: 280 }} className="mt-3">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={byStore} margin={{ left: -12, right: 8 }}>
                  <CartesianGrid stroke="var(--color-border)" vertical={false} />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 10 }}
                    tickLine={false}
                    axisLine={false}
                    interval={0}
                    angle={-30}
                    height={64}
                    textAnchor="end"
                  />
                  <YAxis
                    domain={[80, 100]}
                    tick={{ fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar
                    dataKey="accuracy"
                    name="Accuracy %"
                    fill="var(--color-primary)"
                    radius={[3, 3, 0, 0]}
                    isAnimationActive={false}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          <TabsContent value="sku">
            <div style={{ height: 280 }} className="mt-3">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={bySku} margin={{ left: -12, right: 8 }}>
                  <CartesianGrid stroke="var(--color-border)" vertical={false} />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 10 }}
                    tickLine={false}
                    axisLine={false}
                    interval={0}
                    angle={-30}
                    height={70}
                    textAnchor="end"
                  />
                  <YAxis
                    domain={[80, 100]}
                    tick={{ fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar
                    dataKey="accuracy"
                    name="Accuracy %"
                    fill="var(--color-primary)"
                    radius={[3, 3, 0, 0]}
                    isAnimationActive={false}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          <TabsContent value="horizon">
            <div style={{ height: 280 }} className="mt-3">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={forecastAccuracyByHorizon} margin={{ left: -12, right: 8 }}>
                  <CartesianGrid stroke="var(--color-border)" vertical={false} />
                  <XAxis
                    dataKey="horizon"
                    tick={{ fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    domain={[60, 100]}
                    tick={{ fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar
                    dataKey="accuracy"
                    name="Accuracy %"
                    radius={[3, 3, 0, 0]}
                    isAnimationActive={false}
                  >
                    {forecastAccuracyByHorizon.map((h) => (
                      <Cell
                        key={h.horizon}
                        fill={
                          h.horizon === "14D" ? "var(--color-primary)" : "var(--color-accent-blue)"
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              <span className="font-medium text-navy">So what?</span> Accuracy degrades predictably
              with a longer horizon — the 14-day horizon is the recommended planning window for most
              categories.
            </p>
          </TabsContent>
        </Tabs>
      </SectionCard>

      <SectionCard
        title="Forecast bias"
        description="Systematic over- or under-forecasting by category."
      >
        <div className="grid gap-3 sm:grid-cols-3">
          {biasBuckets.map((b) => {
            const cats = forecastAccuracyByCategory.filter((c) => biasBucket(c.bias) === b.key);
            return (
              <div key={b.key} className="rounded-md border border-border bg-surface p-3">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full" style={{ background: b.tone }} />
                  <p className="text-sm font-semibold text-navy">{b.key}</p>
                </div>
                <p className="mt-1 text-2xl font-semibold text-navy num">{cats.length}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {cats.length
                    ? cats.map((c) => c.category).join(", ")
                    : "No categories in this bucket"}
                </p>
              </div>
            );
          })}
        </div>
        <div className="mt-4 rounded-md border border-border bg-surface p-3 text-sm">
          <p className="label-eyebrow">AI explanation</p>
          <p className="mt-1 text-muted-foreground">
            The model is consistently under-forecasting weekend beverage demand in selected stores,
            and dairy demand more broadly, where bias has widened to -4.8%.
          </p>
          <Button size="sm" variant="outline" className="mt-3">
            Investigate Pattern
          </Button>
        </div>
      </SectionCard>

      <SectionCard title="Category error decomposition" padded={false}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Accuracy</TableHead>
              <TableHead className="text-right">Bias</TableHead>
              <TableHead className="text-right">MAPE</TableHead>
              <TableHead>Interpretation</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {forecastAccuracyByCategory.map((c) => (
              <TableRow key={c.category}>
                <TableCell className="font-medium text-navy">{c.category}</TableCell>
                <TableCell className="num text-right">{c.accuracy}%</TableCell>
                <TableCell className="num text-right">
                  {c.bias > 0 ? "+" : ""}
                  {c.bias}%
                </TableCell>
                <TableCell className="num text-right">{c.mape}%</TableCell>
                <TableCell className="text-muted-foreground">
                  {c.accuracy >= 92
                    ? "Stable — no action required"
                    : c.bias < -1.5
                      ? "Under-forecasting — review promotional response"
                      : "Monitor — variance above target"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </SectionCard>
    </>
  );
}
