import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PageHeader, SectionCard } from "@/components/app/page-header";
import { SeverityBadge, StatusPill } from "@/components/app/badges";
import { pageMeta } from "@/lib/seo";
import { replenishmentQueue, skuById, storeById } from "@/data/demo";
import { decisionStore, useDecisions } from "@/lib/decision-store";

export const Route = createFileRoute("/_app/inventory/replenishment")({
  head: () => pageMeta("Replenishment", "AI-prioritised replenishment queue with approve, modify and reject actions."),
  component: Replenishment,
});

function Replenishment() {
  const decisions = useDecisions();
  const act = (id: string, status: "approved" | "modified" | "rejected", label: string) => {
    decisionStore.set(id, status);
    toast.success(`Replenishment ${status}`, { description: label });
  };
  return (
    <>
      <PageHeader title="Replenishment Queue" subtitle="Prioritised replenishment actions generated from forecast and inventory position." />
      <SectionCard title="Queue" description="Actions update recommendation status immediately." padded={false}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>SKU</TableHead><TableHead>Location</TableHead>
              <TableHead className="text-right">Recommended qty</TableHead>
              <TableHead>Priority</TableHead><TableHead>Expected stock-out</TableHead>
              <TableHead>Suggested action</TableHead><TableHead>Status</TableHead><TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {replenishmentQueue.map((r) => (
              <TableRow key={r.id}>
                <TableCell className="font-medium text-navy">{skuById(r.skuId).name}</TableCell>
                <TableCell className="text-muted-foreground">{storeById(r.storeId).name} {storeById(r.storeId).code}</TableCell>
                <TableCell className="num text-right">{r.recommendedQty}</TableCell>
                <TableCell><SeverityBadge severity={r.priority} /></TableCell>
                <TableCell className="text-muted-foreground">{r.expectedStockout}</TableCell>
                <TableCell>{r.suggestedAction}</TableCell>
                <TableCell><StatusPill tone={decisions[r.id] === "approved" ? "positive" : decisions[r.id] === "rejected" ? "critical" : "neutral"}>{decisions[r.id] ?? "pending"}</StatusPill></TableCell>
                <TableCell className="space-x-1 text-right whitespace-nowrap">
                  <Button size="sm" onClick={() => act(r.id, "approved", `${r.recommendedQty} units to ${storeById(r.storeId).code}`)}>Approve</Button>
                  <Button size="sm" variant="outline" onClick={() => act(r.id, "modified", "Quantity adjusted for review")}>Modify</Button>
                  <Button size="sm" variant="ghost" onClick={() => act(r.id, "rejected", "Removed from this cycle")}>Reject</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </SectionCard>
      <p className="text-sm text-muted-foreground">
        <span className="font-medium text-navy">So what?</span> Approving the critical items protects an estimated ₹5.1L of exposed sales this week.
        <Link to="/ai/simulator" className="ml-1 font-medium text-primary hover:underline">Simulate the impact</Link>.
      </p>
    </>
  );
}
