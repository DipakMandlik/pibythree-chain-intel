import { createFileRoute } from "@tanstack/react-router";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PageHeader, SectionCard } from "@/components/app/page-header";
import { KpiCard, KpiGrid } from "@/components/app/kpi-card";
import { forecastAccuracyByCategory } from "@/data/demo";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/_app/demand/accuracy")({
  head: () => pageMeta("Forecast Accuracy", "Forecast accuracy, bias and MAPE across retail categories."),
  component: Accuracy,
});

function Accuracy() {
  return (
    <>
      <PageHeader title="Forecast Accuracy" subtitle="Model quality by category, with bias and error decomposition." />
      <KpiGrid>
        <KpiCard label="Weighted Accuracy" value="91.4%" change="3.8%" direction="up" changeTone="positive" caption="vs previous period" spark={[87, 88, 89, 90, 91, 91.2, 91.4]} />
        <KpiCard label="MAPE" value="8.6%" change="1.1%" direction="down" changeTone="positive" caption="mean absolute % error" spark={[11, 10.4, 10, 9.4, 9, 8.8, 8.6]} />
        <KpiCard label="Forecast Bias" value="+0.9%" caption="slight over-forecast" spark={[2.4, 2.1, 1.8, 1.4, 1.2, 1, 0.9]} />
      </KpiGrid>
      <SectionCard title="Accuracy by category" description="Higher is better. Categories below 90% are prioritised for retraining.">
        <div style={{ height: 280 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={forecastAccuracyByCategory} margin={{ left: -12, right: 8 }}>
              <CartesianGrid stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="category" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
              <YAxis domain={[80, 100]} tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid var(--color-border)" }} />
              <Bar dataKey="accuracy" name="Accuracy %" fill="var(--color-primary)" radius={[3, 3, 0, 0]} isAnimationActive={false} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          <span className="font-medium text-navy">So what?</span> Dairy accuracy at 88.6% carries the largest service
          risk because it also has the shortest shelf life.
        </p>
      </SectionCard>
      <SectionCard title="Error decomposition" padded={false}>
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
                <TableCell className="num text-right">{c.bias > 0 ? "+" : ""}{c.bias}%</TableCell>
                <TableCell className="num text-right">{c.mape}%</TableCell>
                <TableCell className="text-muted-foreground">
                  {c.accuracy >= 92 ? "Stable — no action required" : c.bias > 2 ? "Under-forecasting promotional response" : "Monitor — variance above target"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </SectionCard>
    </>
  );
}
