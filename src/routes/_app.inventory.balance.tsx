import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PageHeader, SectionCard } from "@/components/app/page-header";
import { StatusPill } from "@/components/app/badges";
import { distributionCentres, stores } from "@/data/demo";
import { cn } from "@/lib/utils";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/_app/inventory/balance")({
  head: () => pageMeta("Store / DC Balance", "Distribution centre and store inventory network posture with recommended actions."),
  component: Balance,
});

function Balance() {
  const [storeId, setStoreId] = useState(stores[0].id);
  const store = stores.find((s) => s.id === storeId)!;
  const dc = distributionCentres.find((d) => d.id === store.dc)!;
  const tone = store.status === "critical" ? "critical" : store.status === "at_risk" ? "warning" : store.status === "excess" ? "info" : "positive";

  return (
    <>
      <PageHeader title="Store / DC Balance" subtitle="Inventory positioning across the distribution network." />
      <div className="grid gap-5 xl:grid-cols-[1.4fr_1fr]">
        <SectionCard title="Distribution network" description="Select a store to inspect its position.">
          <div className="space-y-5">
            {distributionCentres.map((d) => (
              <div key={d.id}>
                <div className="flex items-center justify-between rounded-md border border-border bg-surface px-3 py-2">
                  <p className="text-sm font-semibold text-navy">{d.name}</p>
                  <span className="text-xs text-muted-foreground num">Utilisation {d.utilisation}% · ₹{d.stockValueCr} Cr</span>
                </div>
                <div className="ml-4 mt-2 grid gap-2 border-l border-border pl-4 sm:grid-cols-2">
                  {stores.filter((s) => s.dc === d.id).map((s) => (
                    <button key={s.id} onClick={() => setStoreId(s.id)}
                      className={cn("flex items-center justify-between rounded-md border px-3 py-2 text-left transition-colors",
                        storeId === s.id ? "border-primary bg-accent" : "border-border bg-card hover:border-primary/40")}>
                      <span className="text-sm text-navy">{s.name} {s.code}</span>
                      <StatusPill tone={s.status === "critical" ? "critical" : s.status === "at_risk" ? "warning" : s.status === "excess" ? "info" : "positive"}>
                        {s.status.replace("_", " ")}
                      </StatusPill>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
        <SectionCard title={`${store.name} ${store.code}`} description={`Served by ${dc.name}`}>
          <div className="grid grid-cols-2 gap-3">
            {[
              { l: "Current stock value", v: `₹${store.stockValueCr} Cr` },
              { l: "Days of cover", v: `${store.daysOfCover}` },
              { l: "Incoming inventory", v: "4,200 units" },
              { l: "Outgoing transfers", v: store.status === "excess" ? "640 units" : "0 units" },
            ].map((k) => (
              <div key={k.l} className="rounded-md border border-border bg-surface p-3">
                <p className="label-eyebrow">{k.l}</p>
                <p className="mt-0.5 text-base font-semibold text-navy num">{k.v}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-md border border-border bg-surface p-3">
            <p className="label-eyebrow">Recommended action</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {store.status === "critical" ? "Approve the inbound transfer to restore cover above safety stock."
                : store.status === "excess" ? "Redeploy excess inventory toward stores with projected shortage."
                : store.status === "at_risk" ? "Increase replenishment quantity in the next cycle." : "No action required — position is healthy."}
            </p>
            <div className="mt-3 flex gap-2">
              <Button asChild size="sm"><Link to="/inventory/transfers">Transfers</Link></Button>
              <Button asChild size="sm" variant="outline"><Link to="/inventory/replenishment">Replenishment</Link></Button>
            </div>
          </div>
          <StatusPill tone={tone}>Status: {store.status.replace("_", " ")}</StatusPill>
        </SectionCard>
      </div>
    </>
  );
}
