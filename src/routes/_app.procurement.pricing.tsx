import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PageHeader, SectionCard } from "@/components/app/page-header";
import { SeverityBadge, StatusPill } from "@/components/app/badges";
import { pageMeta } from "@/lib/seo";
import { priceIntelligence, skuById, supplierById } from "@/data/demo";

export const Route = createFileRoute("/_app/procurement/pricing")({
  head: () => pageMeta("Price Intelligence", "Supplier price variance, contract deviation and benchmark comparison."),
  component: Pricing,
});

function Pricing() {
  return (
    <>
      <PageHeader title="Procurement Price Intelligence" subtitle="Supplier price variance, contract deviations and competitive benchmarks." />
      <div className="grid gap-4 lg:grid-cols-2">
        {priceIntelligence.map((row) => (
          <section key={row.skuId} className="panel p-4">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-sm font-semibold text-navy">{skuById(row.skuId).name}</h3>
              <StatusPill tone="info">Benchmark ₹{row.benchmark}</StatusPill>
            </div>
            <ul className="mt-3 space-y-2">
              {row.quotes.map((q) => (
                <li key={q.supplierId} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{supplierById(q.supplierId).name}</span>
                  <span className={`num font-semibold ${q.price > row.benchmark ? "text-critical" : "text-positive"}`}>₹{q.price}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 rounded-md border border-border bg-surface p-3 text-sm text-muted-foreground">{row.insight}</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="num text-sm font-semibold text-navy">Potential savings ₹{row.savingsLakh}L</span>
              <Button asChild size="sm"><Link to="/procurement/savings">Explore savings</Link></Button>
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
