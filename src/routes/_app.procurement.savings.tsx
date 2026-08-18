import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PageHeader, SectionCard } from "@/components/app/page-header";
import { SeverityBadge, StatusPill } from "@/components/app/badges";
import { pageMeta } from "@/lib/seo";
import { savingsBreakdown, skuById } from "@/data/demo";

export const Route = createFileRoute("/_app/procurement/savings")({
  head: () => pageMeta("Savings Opportunities", "AI-identified procurement savings across negotiation, sourcing and consolidation levers."),
  component: Savings,
});

function Savings() {
  return (
    <>
      <PageHeader title="AI Savings Opportunities" subtitle="Where procurement economics can improve this cycle." />
      <section className="panel p-6">
        <p className="label-eyebrow">Potential savings identified</p>
        <p className="mt-1 text-4xl font-semibold tracking-tight text-navy num">₹18.4L</p>
        <p className="mt-1 text-sm text-muted-foreground">Illustrative scenario based on the demonstration dataset.</p>
      </section>
      <div className="grid gap-4 lg:grid-cols-2">
        {savingsBreakdown.map((s) => (
          <section key={s.id} className="panel p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-navy">{s.lever}</h3>
              <span className="num text-lg font-semibold text-primary">₹{s.valueLakh}L</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{s.detail}</p>
            <p className="mt-2 text-xs text-muted-foreground">Affected SKUs: {s.skuIds.map((id) => skuById(id).name).join(", ")}</p>
            <div className="mt-3 flex gap-2">
              <Button size="sm" onClick={() => toast.success("Opportunity queued", { description: `${s.lever} added to the sourcing plan.` })}>Pursue opportunity</Button>
              <Button asChild size="sm" variant="outline"><Link to="/procurement/pricing">View pricing evidence</Link></Button>
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
