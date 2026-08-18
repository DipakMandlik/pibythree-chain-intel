import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PageHeader, SectionCard } from "@/components/app/page-header";
import { SeverityBadge, StatusPill } from "@/components/app/badges";
import { pageMeta } from "@/lib/seo";
import { skuById, storeById, transferRecommendations } from "@/data/demo";
import { decisionStore, useDecisions } from "@/lib/decision-store";

export const Route = createFileRoute("/_app/inventory/transfers")({
  head: () => pageMeta("Transfer Recommendations", "Inter-store transfer recommendations that resolve shortage using nearby excess."),
  component: Transfers,
});

function Transfers() {
  const decisions = useDecisions();
  return (
    <>
      <PageHeader title="Transfer Recommendations" subtitle="Resolve projected shortages using nearby excess inventory before new procurement." />
      <div className="grid gap-4 lg:grid-cols-2">
        {transferRecommendations.map((t) => {
          const status = decisions[t.id] ?? "pending";
          return (
            <section key={t.id} className="panel p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-sm font-semibold text-navy">
                    Transfer {t.qty} units — {skuById(t.skuId).name}
                  </h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {storeById(t.fromStoreId).name} {storeById(t.fromStoreId).code} → {storeById(t.toStoreId).name} {storeById(t.toStoreId).code}
                  </p>
                </div>
                <SeverityBadge severity={t.priority} />
              </div>
              <p className="mt-3 text-sm text-foreground/90">{t.rationale}</p>
              <div className="mt-3 flex items-center justify-between rounded-md border border-border bg-surface px-3 py-2">
                <span className="label-eyebrow">Expected impact</span>
                <span className="num text-sm font-semibold text-navy">₹{t.impactLakh}L lost sales avoided</span>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <Button size="sm" onClick={() => { decisionStore.set(t.id, "approved"); toast.success("Transfer approved", { description: `${t.qty} units scheduled` }); }}>Approve</Button>
                <Button size="sm" variant="outline" onClick={() => { decisionStore.set(t.id, "modified"); toast("Transfer sent for modification"); }}>Modify</Button>
                <Button asChild size="sm" variant="ghost"><Link to="/ai/simulator">Simulate</Link></Button>
                <StatusPill tone={status === "approved" ? "positive" : status === "modified" ? "warning" : "neutral"}>{status}</StatusPill>
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
