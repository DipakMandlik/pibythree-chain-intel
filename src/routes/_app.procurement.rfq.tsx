import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PageHeader, SectionCard } from "@/components/app/page-header";
import { AiProcessing } from "@/components/app/states";
import { rfqResponses, rfqStages, supplierById } from "@/data/demo";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/_app/procurement/rfq")({
  head: () => pageMeta("RFQ Intelligence", "AI-assisted sourcing workflow from requirement to supplier award recommendation."),
  component: Rfq,
});

function Rfq() {
  const [requirement, setRequirement] = useState("Need 100,000 units of Beverage X for next month.");
  const [running, setRunning] = useState(false);
  const [generated, setGenerated] = useState(false);

  const generate = () => {
    setRunning(true);
    setTimeout(() => { setRunning(false); setGenerated(true); toast.success("RFQ recommendation generated"); }, 1800);
  };

  return (
    <>
      <PageHeader title="RFQ Intelligence" subtitle="From requirement to award recommendation, with AI sourcing analysis at each stage." />
      <SectionCard title="Sourcing workflow" description="Current cycle progress.">
        <ol className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {rfqStages.map((s, i) => (
            <li key={s.key} className="rounded-md border border-border bg-surface p-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className={i < 6 ? "size-4 text-positive" : "size-4 text-muted-foreground"} />
                <p className="text-sm font-medium text-navy">{s.label}</p>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{s.detail}</p>
            </li>
          ))}
        </ol>
      </SectionCard>

      <div className="grid gap-5 xl:grid-cols-[1fr_1.2fr]">
        <SectionCard title="AI RFQ assistant" description="Describe the requirement in plain language.">
          <Textarea rows={4} value={requirement} onChange={(e) => setRequirement(e.target.value)} />
          <div className="mt-3 flex gap-2">
            <Button size="sm" onClick={generate}>Generate RFQ</Button>
            <Button size="sm" variant="outline" onClick={() => { setGenerated(false); setRequirement(""); }}>Modify requirement</Button>
          </div>
          {running && <div className="mt-3"><AiProcessing steps={["Parsing requirement…", "Comparing supplier performance…", "Evaluating price history…", "Generating RFQ recommendation…"]} /></div>}
          {generated && (
            <div className="mt-4 rounded-md border border-border bg-surface p-3 text-sm">
              <p className="label-eyebrow">RFQ recommendation</p>
              <ul className="mt-2 space-y-1 text-muted-foreground">
                <li>Quantity: <span className="num font-medium text-navy">100,000 units</span></li>
                <li>Required delivery: <span className="num font-medium text-navy">30 days</span></li>
                <li>Preferred suppliers: <span className="font-medium text-navy">A / C / B</span></li>
                <li>Target price: <span className="num font-medium text-navy">₹96 – ₹98</span></li>
                <li>Evaluation criteria: price, delivery, quality, historical supplier performance</li>
              </ul>
            </div>
          )}
        </SectionCard>

        <SectionCard title="Supplier responses & AI comparison" padded={false}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Supplier</TableHead><TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Delivery</TableHead><TableHead className="text-right">Quality</TableHead>
                <TableHead className="text-right">AI score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rfqResponses.map((r) => (
                <TableRow key={r.supplierId}>
                  <TableCell className="font-medium text-navy">{supplierById(r.supplierId).name}</TableCell>
                  <TableCell className="num text-right">₹{r.price}</TableCell>
                  <TableCell className="num text-right">{r.deliveryDays} days</TableCell>
                  <TableCell className="num text-right">{r.quality}%</TableCell>
                  <TableCell className="num text-right font-semibold">{r.score}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="border-t border-border p-4 text-sm">
            <p className="label-eyebrow">AI recommendation</p>
            <p className="mt-1 text-muted-foreground">Award 65% to Supplier A on reliability and 35% to Supplier C on price, holding Supplier B in reserve.</p>
            <Button size="sm" className="mt-3" onClick={() => toast.success("Award decision recorded", { description: "Captured in the audit trail." })}>Record decision</Button>
          </div>
        </SectionCard>
      </div>
    </>
  );
}
