import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageSquareText, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PageHeader, SectionCard } from "@/components/app/page-header";
import { SeverityBadge } from "@/components/app/badges";
import { KpiCard, KpiGrid } from "@/components/app/kpi-card";
import {
  categories,
  demandAnomalies,
  skuById,
  storeById,
  type AnomalySeverity,
  type DemandAnomaly,
} from "@/data/demo";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/_app/demand/anomalies")({
  head: () =>
    pageMeta(
      "Demand Anomalies",
      "Identify unusual demand patterns before planners rely on them blindly.",
    ),
  component: DemandAnomalies,
});

const severityToBadge: Record<AnomalySeverity, "critical" | "high" | "medium"> = {
  critical: "critical",
  high: "high",
  medium: "medium",
};

function DemandAnomalies() {
  const [category, setCategory] = useState("all");
  const [severity, setSeverity] = useState("all");
  const [selected, setSelected] = useState<DemandAnomaly | null>(null);

  const rows = useMemo(
    () =>
      demandAnomalies
        .filter((a) => category === "all" || skuById(a.skuId).category === category)
        .filter((a) => severity === "all" || a.severity === severity)
        .sort((a, b) => Math.abs(b.variance) - Math.abs(a.variance)),
    [category, severity],
  );

  const highPriority = demandAnomalies.filter((a) => a.severity !== "medium").length;

  return (
    <>
      <PageHeader
        title="Demand Anomalies"
        subtitle="Identify unusual demand patterns before planners rely on them blindly."
      />

      <KpiGrid className="2xl:grid-cols-3">
        <KpiCard
          label="Anomalies Detected"
          value={`${demandAnomalies.length}`}
          caption="SKU-store combinations, current cycle"
        />
        <KpiCard
          label="High Priority"
          value={`${highPriority}`}
          caption="critical or high severity"
        />
        <KpiCard
          label="Average Variance"
          value={`${Math.round(demandAnomalies.reduce((a, x) => a + Math.abs(x.variance), 0) / demandAnomalies.length)}%`}
          caption="absolute deviation from expected"
        />
      </KpiGrid>

      <div className="panel flex flex-wrap items-end gap-3 p-3">
        <label className="flex min-w-[9.5rem] flex-1 flex-col gap-1">
          <span className="label-eyebrow">Category</span>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="h-9 bg-card text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              {categories.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </label>
        <label className="flex min-w-[9.5rem] flex-1 flex-col gap-1">
          <span className="label-eyebrow">Severity</span>
          <Select value={severity} onValueChange={setSeverity}>
            <SelectTrigger className="h-9 bg-card text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All severities</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
            </SelectContent>
          </Select>
        </label>
      </div>

      <SectionCard
        title="Detected anomalies"
        description="Ranked by absolute variance from expected demand."
        padded={false}
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>SKU</TableHead>
              <TableHead>Store</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Observed Demand</TableHead>
              <TableHead className="text-right">Expected Demand</TableHead>
              <TableHead className="text-right">Variance</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead>AI Interpretation</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((a) => (
              <TableRow key={a.id}>
                <TableCell className="font-medium text-navy">{skuById(a.skuId).name}</TableCell>
                <TableCell className="text-muted-foreground">
                  {storeById(a.storeId).name} {storeById(a.storeId).code}
                </TableCell>
                <TableCell className="text-muted-foreground">{skuById(a.skuId).category}</TableCell>
                <TableCell className="num text-right">
                  {a.observedDemand.toLocaleString("en-IN")}
                </TableCell>
                <TableCell className="num text-right">
                  {a.expectedDemand.toLocaleString("en-IN")}
                </TableCell>
                <TableCell
                  className={`num text-right ${a.variance >= 0 ? "text-critical" : "text-primary"}`}
                >
                  {a.variance > 0 ? "+" : ""}
                  {a.variance}%
                </TableCell>
                <TableCell>
                  <SeverityBadge severity={severityToBadge[a.severity]} />
                </TableCell>
                <TableCell className="text-muted-foreground">{a.interpretation}</TableCell>
                <TableCell className="text-right">
                  <Button size="sm" variant="ghost" onClick={() => setSelected(a)}>
                    <Search className="size-3.5" /> Investigate
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </SectionCard>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-lg">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle>Demand Anomaly Analysis</DialogTitle>
                <DialogDescription>
                  {skuById(selected.skuId).name} · {storeById(selected.storeId).name}{" "}
                  {storeById(selected.storeId).code}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 text-sm">
                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-md border border-border bg-surface p-3">
                    <p className="label-eyebrow">Observed</p>
                    <p className="mt-1 text-lg font-semibold text-navy num">
                      {selected.observedDemand.toLocaleString("en-IN")}
                    </p>
                  </div>
                  <div className="rounded-md border border-border bg-surface p-3">
                    <p className="label-eyebrow">Expected</p>
                    <p className="mt-1 text-lg font-semibold text-navy num">
                      {selected.expectedDemand.toLocaleString("en-IN")}
                    </p>
                  </div>
                  <div className="rounded-md border border-border bg-surface p-3">
                    <p className="label-eyebrow">Variance</p>
                    <p
                      className={`mt-1 text-lg font-semibold num ${selected.variance >= 0 ? "text-critical" : "text-primary"}`}
                    >
                      {selected.variance > 0 ? "+" : ""}
                      {selected.variance}%
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <SeverityBadge severity={severityToBadge[selected.severity]} />
                  <span className="text-muted-foreground">
                    Confidence:{" "}
                    <span className="font-medium text-navy">
                      {selected.severity === "medium" ? "Medium" : "High"}
                    </span>
                  </span>
                </div>
                <div>
                  <p className="label-eyebrow">AI analysis</p>
                  <p className="mt-1 text-muted-foreground">{selected.detail}</p>
                  <ul className="mt-2 space-y-1.5 text-muted-foreground">
                    <li className="flex gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent-blue" />
                      Historical deviation from the 8-week baseline
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent-blue" />
                      Recent consumption trend for this store-SKU
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent-blue" />
                      Active or recent promotional activity
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent-blue" />
                      Seasonality and calendar effects
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent-blue" />
                      Local demand pattern for the store catchment
                    </li>
                  </ul>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  <Button size="sm" variant="outline">
                    Monitor
                  </Button>
                  <Button size="sm" variant="outline">
                    Add to Planning Review
                  </Button>
                  <Button asChild size="sm">
                    <Link to="/ai/assistant">
                      <MessageSquareText className="size-3.5" /> Ask Demand AI
                    </Link>
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
