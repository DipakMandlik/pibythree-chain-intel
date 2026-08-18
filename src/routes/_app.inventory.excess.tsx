import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PageHeader, SectionCard } from "@/components/app/page-header";
import { SeverityBadge, StatusPill } from "@/components/app/badges";
import { pageMeta } from "@/lib/seo";
import { excessInventory, skuById, storeById } from "@/data/demo";

export const Route = createFileRoute("/_app/inventory/excess")({
  head: () => pageMeta("Excess Inventory", "Slow-moving, overstocked and imbalanced inventory with redeployment actions."),
  component: Excess,
});

function Excess() {
  return (
    <>
      <PageHeader title="Excess Inventory" subtitle="₹8.4 Cr of excess inventory opportunity — every insight leads to an action." />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { l: "Total excess", v: "₹8.4 Cr" },
          { l: "Slow-moving SKUs", v: "126" },
          { l: "Overstocked stores", v: "11" },
          { l: "Transfer opportunities", v: "38" },
        ].map((k) => (
          <div key={k.l} className="panel p-4">
            <p className="label-eyebrow">{k.l}</p>
            <p className="kpi-value mt-1">{k.v}</p>
          </div>
        ))}
      </div>
      <SectionCard title="Excess positions" description="Redeploy excess to stores with projected shortage." padded={false}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>SKU</TableHead><TableHead>Store</TableHead>
              <TableHead className="text-right">Excess units</TableHead>
              <TableHead className="text-right">Held value</TableHead>
              <TableHead className="text-right">Days static</TableHead>
              <TableHead>Reason</TableHead><TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {excessInventory.map((e) => (
              <TableRow key={e.id}>
                <TableCell className="font-medium text-navy">{skuById(e.skuId).name}</TableCell>
                <TableCell className="text-muted-foreground">{storeById(e.storeId).name} {storeById(e.storeId).code}</TableCell>
                <TableCell className="num text-right">{e.excessUnits}</TableCell>
                <TableCell className="num text-right">₹{e.valueLakh}L</TableCell>
                <TableCell className="num text-right">{e.daysStatic}</TableCell>
                <TableCell className="text-muted-foreground">{e.reason}</TableCell>
                <TableCell className="text-right">
                  <Button size="sm" variant="outline" onClick={() => toast.success("Transfer recommendation created", { description: `${e.excessUnits} units · ${storeById(e.storeId).code} → ${storeById(e.targetStoreId!).code}` })}>
                    Create transfer
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </SectionCard>
      <p className="text-sm text-muted-foreground">
        <span className="font-medium text-navy">So what?</span> Store #087 holds excess Beverage X while Store #142 faces a projected shortage —
        <Link to="/inventory/transfers" className="ml-1 font-medium text-primary hover:underline">review the transfer queue</Link>.
      </p>
    </>
  );
}
