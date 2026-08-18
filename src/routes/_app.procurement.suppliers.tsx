import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PageHeader, SectionCard } from "@/components/app/page-header";
import { AiInsightCard } from "@/components/app/ai-insight-card";
import { skuById, suppliers, type Supplier } from "@/data/demo";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/_app/procurement/suppliers")({
  head: () => pageMeta("Supplier Intelligence", "Supplier scoring across delivery, quality, pricing, fill rate and compliance."),
  component: SupplierIntelligence,
});

function SupplierIntelligence() {
  const [selected, setSelected] = useState<Supplier | null>(null);
  return (
    <>
      <PageHeader title="Supplier Intelligence" subtitle="Weighted supplier scoring with AI assessment and recommended allocation changes." />
      <SectionCard title="Supplier scorecard" description="Click a supplier to open the intelligence profile." padded={false}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Supplier</TableHead><TableHead className="text-right">Spend</TableHead>
              <TableHead className="text-right">Delivery</TableHead><TableHead className="text-right">Quality</TableHead>
              <TableHead className="text-right">Pricing</TableHead><TableHead className="text-right">Fill rate</TableHead>
              <TableHead className="text-right">AI score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {suppliers.map((s) => (
              <TableRow key={s.id} className="cursor-pointer" onClick={() => setSelected(s)}>
                <TableCell className="font-medium text-navy">{s.name}</TableCell>
                <TableCell className="num text-right">₹{s.spendCr}Cr</TableCell>
                <TableCell className={`num text-right ${s.delivery < 85 ? "text-critical" : ""}`}>{s.delivery}%</TableCell>
                <TableCell className="num text-right">{s.quality}%</TableCell>
                <TableCell className="num text-right">{s.pricing}%</TableCell>
                <TableCell className="num text-right">{s.fillRate}%</TableCell>
                <TableCell className="num text-right font-semibold text-navy">{s.aiScore}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </SectionCard>

      <Sheet open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-2xl">
          {selected && (
            <>
              <SheetHeader>
                <SheetTitle>Supplier Intelligence Profile</SheetTitle>
                <SheetDescription>{selected.name}</SheetDescription>
              </SheetHeader>
              <div className="space-y-4 p-4">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {[
                    { l: "Overall score", v: `${selected.aiScore} / 100` },
                    { l: "Delivery", v: `${selected.delivery}%` },
                    { l: "Quality", v: `${selected.quality}%` },
                    { l: "Pricing", v: `${selected.pricing}%` },
                    { l: "Fill rate", v: `${selected.fillRate}%` },
                    { l: "Contract compliance", v: `${selected.compliance}%` },
                  ].map((k) => (
                    <div key={k.l} className="rounded-md border border-border bg-surface p-3">
                      <p className="label-eyebrow">{k.l}</p>
                      <p className="mt-0.5 text-base font-semibold text-navy num">{k.v}</p>
                    </div>
                  ))}
                </div>
                <AiInsightCard
                  title="AI supplier assessment"
                  reason={selected.assessment}
                  evidence={[`Supplied SKUs: ${selected.skus.map((id) => skuById(id).name).join(", ")}`, `Spend exposure ₹${selected.spendCr} Cr`, `Fill rate ${selected.fillRate}%`]}
                  impact={selected.recommendation}
                  confidence={selected.aiScore}
                  actions={
                    <>
                      <Button asChild size="sm"><Link to="/demand/skus">View affected SKUs</Link></Button>
                      <Button size="sm" variant="outline" onClick={() => toast.success("Supplier shift simulated", { description: "Service level +4%, cost impact −₹4.2L (illustrative)." })}>Simulate supplier shift</Button>
                      <Button asChild size="sm" variant="outline"><Link to="/procurement/rfq">Create RFQ</Link></Button>
                    </>
                  }
                />
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
