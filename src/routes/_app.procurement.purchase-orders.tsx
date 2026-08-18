import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PageHeader, SectionCard } from "@/components/app/page-header";
import { SeverityBadge, StatusPill } from "@/components/app/badges";
import { pageMeta } from "@/lib/seo";
import { purchaseOrders, skuById, supplierById } from "@/data/demo";

export const Route = createFileRoute("/_app/procurement/purchase-orders")({
  head: () => pageMeta("Purchase Orders", "Open, in-transit and delayed purchase orders with delivery risk."),
  component: POs,
});

function POs() {
  return (
    <>
      <PageHeader title="Purchase Orders" subtitle="Order pipeline health and delivery risk across suppliers." />
      <SectionCard title="Purchase order pipeline" padded={false}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>PO</TableHead><TableHead>Supplier</TableHead><TableHead>SKU</TableHead>
              <TableHead className="text-right">Qty</TableHead><TableHead className="text-right">Value</TableHead>
              <TableHead>Status</TableHead><TableHead>Expected</TableHead><TableHead>Risk</TableHead><TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {purchaseOrders.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium text-navy">{p.poNumber}</TableCell>
                <TableCell className="text-muted-foreground">{supplierById(p.supplierId).name}</TableCell>
                <TableCell>{skuById(p.skuId).name}</TableCell>
                <TableCell className="num text-right">{p.qty.toLocaleString("en-IN")}</TableCell>
                <TableCell className="num text-right">₹{p.valueLakh}L</TableCell>
                <TableCell><StatusPill tone={p.status === "Delayed" ? "critical" : p.status === "Received" ? "positive" : "info"}>{p.status}</StatusPill></TableCell>
                <TableCell className="num text-muted-foreground">{p.expected}</TableCell>
                <TableCell><SeverityBadge severity={p.risk} /></TableCell>
                <TableCell className="text-right">
                  <Button size="sm" variant="outline" onClick={() => toast.success("Expedite request raised", { description: `${p.poNumber} escalated to ${supplierById(p.supplierId).name}` })}>Expedite</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </SectionCard>
      <p className="text-sm text-muted-foreground">
        <span className="font-medium text-navy">So what?</span> Two delayed orders sit with Supplier B —
        <Link to="/procurement/suppliers" className="ml-1 font-medium text-primary hover:underline">review allocation</Link>.
      </p>
    </>
  );
}
