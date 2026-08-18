import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, Sparkles, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { PageHeader, SectionCard } from "@/components/app/page-header";
import { DemandChart } from "@/components/app/charts";
import { AiProcessing } from "@/components/app/states";
import { buildDemandSeries, categories, forecastDrivers, regions, skus, stores } from "@/data/demo";
import { cn } from "@/lib/utils";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/_app/demand/forecast-explorer")({
  head: () =>
    pageMeta("Forecast Explorer", "Drill down from region to store, category and SKU to inspect forecast drivers."),
  component: ForecastExplorer,
});

function Column<T extends string>({
  title, items, value, onSelect, render,
}: {
  title: string;
  items: T[];
  value: T | null;
  onSelect: (v: T) => void;
  render?: (v: T) => string;
}) {
  return (
    <div className="min-w-0 flex-1 border-border md:border-r last:md:border-r-0">
      <p className="label-eyebrow border-b border-border bg-surface px-3 py-2">{title}</p>
      <ul className="max-h-72 overflow-y-auto py-1">
        {items.map((i) => (
          <li key={i}>
            <button
              onClick={() => onSelect(i)}
              className={cn(
                "flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-sm transition-colors",
                value === i ? "bg-accent font-medium text-navy" : "text-foreground/85 hover:bg-surface",
              )}
            >
              <span className="truncate">{render ? render(i) : i}</span>
              <ChevronRight className="size-3.5 shrink-0 text-muted-foreground" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ForecastExplorer() {
  const [region, setRegion] = useState<string>("Mumbai");
  const [storeId, setStoreId] = useState<string>("s142");
  const [category, setCategory] = useState<string>("Beverages");
  const [skuId, setSkuId] = useState<string>("sku-bev-x");
  const [explain, setExplain] = useState(false);
  const [analysing, setAnalysing] = useState(false);

  const regionStores = stores.filter((s) => s.region === region);
  const catSkus = skus.filter((s) => s.category === category);
  const sku = skus.find((s) => s.id === skuId) ?? catSkus[0];
  const store = stores.find((s) => s.id === storeId) ?? regionStores[0];

  const seed = (skuId + storeId).split("").reduce((a, c) => a + c.charCodeAt(0), 3);
  const series = useMemo(() => buildDemandSeries(seed, 180, 0.18, 84, 14), [seed]);
  const expected = series.filter((p) => p.actual === null).reduce((a, p) => a + p.forecast, 0);

  const openExplain = () => {
    setExplain(true);
    setAnalysing(true);
    setTimeout(() => setAnalysing(false), 1800);
  };

  return (
    <>
      <PageHeader
        title="Forecast Explorer"
        subtitle="Drill from region to store, category and SKU. Every forecast exposes its drivers and evidence."
      />

      <SectionCard title="Hierarchy" description="Region → Store → Category → SKU" padded={false}>
        <div className="flex flex-col md:flex-row">
          <Column title="Region" items={[...regions]} value={region} onSelect={(r) => { setRegion(r); const first = stores.find((s) => s.region === r); if (first) setStoreId(first.id); }} />
          <Column title="Store" items={regionStores.map((s) => s.id)} value={storeId} onSelect={setStoreId} render={(id) => { const s = stores.find((x) => x.id === id)!; return `${s.name} ${s.code}`; }} />
          <Column title="Category" items={[...categories]} value={category} onSelect={(c) => { setCategory(c); const first = skus.find((s) => s.category === c); if (first) setSkuId(first.id); }} />
          <Column title="SKU" items={catSkus.map((s) => s.id)} value={skuId} onSelect={setSkuId} render={(id) => skus.find((x) => x.id === id)!.name} />
        </div>
      </SectionCard>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { l: "Selected scope", v: `${category} · ${region}` },
          { l: "Expected demand (14d)", v: `${expected.toLocaleString("en-IN")} units` },
          { l: "Confidence", v: "89%" },
          { l: "Demand trend", v: "Increasing" },
        ].map((k) => (
          <div key={k.l} className="panel p-4">
            <p className="label-eyebrow">{k.l}</p>
            <p className="mt-1 text-lg font-semibold text-navy num">{k.v}</p>
          </div>
        ))}
      </div>

      <SectionCard
        title={`${sku.name} · ${store.name} ${store.code}`}
        description="12-week historical demand with a 14-day forward forecast."
        actions={
          <Button size="sm" onClick={openExplain}>
            <Sparkles className="size-3.5" /> Why this forecast?
          </Button>
        }
      >
        <DemandChart data={series} height={320} />
        <p className="mt-3 text-sm text-muted-foreground">
          <span className="font-medium text-navy">So what?</span> Expected demand exceeds current cover for this
          store-SKU, which is the origin of the active transfer recommendation.
        </p>
      </SectionCard>

      <Sheet open={explain} onOpenChange={setExplain}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>AI forecast explanation</SheetTitle>
            <SheetDescription>
              {sku.name} · {store.name} {store.code} — demonstration-generated signals.
            </SheetDescription>
          </SheetHeader>
          <div className="space-y-4 p-4">
            {analysing ? (
              <AiProcessing
                steps={[
                  "Analyzing historical demand…",
                  "Evaluating seasonal signals…",
                  "Measuring promotional response…",
                  "Generating explanation…",
                ]}
              />
            ) : (
              <>
                <p className="text-sm text-foreground/90">
                  The expected increase is primarily associated with promotional uplift, recent store-level trend,
                  seasonal demand and local consumption patterns.
                </p>
                <ul className="space-y-3">
                  {forecastDrivers.map((d) => (
                    <li key={d.driver}>
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-navy">{d.driver}</span>
                        <span className="num font-semibold text-primary">+{d.impact}%</span>
                      </div>
                      <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-surface-strong">
                        <div className="h-full rounded-full bg-primary" style={{ width: `${d.impact * 7}%` }} />
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">{d.note}</p>
                    </li>
                  ))}
                </ul>
                <div className="rounded-md border border-border bg-surface p-3 text-sm">
                  <p className="label-eyebrow">Downstream impact</p>
                  <p className="mt-1 text-muted-foreground">
                    Cover falls below safety stock within 3.2 days, generating a critical transfer recommendation.
                  </p>
                  <Button asChild size="sm" className="mt-3">
                    <Link to="/inventory/stock-risk">
                      <TrendingUp className="size-3.5" /> View inventory impact
                    </Link>
                  </Button>
                </div>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
