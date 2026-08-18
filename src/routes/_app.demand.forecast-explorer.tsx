import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, FileSearch, MessageSquareText, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { PageHeader, SectionCard } from "@/components/app/page-header";
import { DemandChart } from "@/components/app/charts";
import { HorizonToggle } from "@/components/app/horizon-toggle";
import { AiProcessing } from "@/components/app/states";
import {
  buildDemandSeries,
  categories,
  forecastAccuracyBySku,
  forecastSignals,
  regions,
  skus,
  stores,
} from "@/data/demo";
import { cn } from "@/lib/utils";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/_app/demand/forecast-explorer")({
  head: () =>
    pageMeta(
      "Forecast Explorer",
      "Explore AI-generated demand forecasts at store, category and SKU level.",
    ),
  component: ForecastExplorer,
});

function Column<T extends string>({
  title,
  items,
  value,
  onSelect,
  render,
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
                value === i
                  ? "bg-accent font-medium text-navy"
                  : "text-foreground/85 hover:bg-surface",
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
  const [region, setRegion] = useState<string>("Maharashtra");
  const [storeId, setStoreId] = useState<string>("s142");
  const [category, setCategory] = useState<string>("Beverages");
  const [skuId, setSkuId] = useState<string>("sku-bev-x");
  const [horizon, setHorizon] = useState<string>("14");
  const [explain, setExplain] = useState(false);
  const [analysing, setAnalysing] = useState(false);

  const regionStores = stores.filter((s) => s.region === region);
  const catSkus = skus.filter((s) => s.category === category);
  const sku = skus.find((s) => s.id === skuId) ?? catSkus[0] ?? skus[0]!;
  const store = stores.find((s) => s.id === storeId) ?? regionStores[0] ?? stores[0]!;

  const seed = (skuId + storeId).split("").reduce((a, c) => a + c.charCodeAt(0), 3);
  const series = useMemo(
    () => buildDemandSeries(seed, 180, 0.18, 84, Number(horizon)),
    [seed, horizon],
  );
  const expected = series.filter((p) => p.actual === null).reduce((a, p) => a + p.forecast, 0);
  const confidence = forecastAccuracyBySku.find((a) => a.skuId === skuId)?.confidence ?? 89;
  const expectedChangePct = 11;

  const openExplain = () => {
    setExplain(true);
    setAnalysing(true);
    setTimeout(() => setAnalysing(false), 1800);
  };

  return (
    <>
      <PageHeader
        title="Forecast Explorer"
        subtitle="Explore AI-generated demand forecasts at store, category and SKU level."
      />

      <SectionCard
        title="Hierarchy"
        description="Region → Store → Category → SKU"
        padded={false}
        actions={<HorizonToggle value={horizon} onChange={setHorizon} />}
      >
        <div className="flex flex-col md:flex-row">
          <Column
            title="Region"
            items={[...regions]}
            value={region}
            onSelect={(r) => {
              setRegion(r);
              const first = stores.find((s) => s.region === r);
              if (first) setStoreId(first.id);
            }}
          />
          <Column
            title="Store"
            items={regionStores.map((s) => s.id)}
            value={storeId}
            onSelect={setStoreId}
            render={(id) => {
              const s = stores.find((x) => x.id === id)!;
              return `${s.name} ${s.code}`;
            }}
          />
          <Column
            title="Category"
            items={[...categories]}
            value={category}
            onSelect={(c) => {
              setCategory(c);
              const first = skus.find((s) => s.category === c);
              if (first) setSkuId(first.id);
            }}
          />
          <Column
            title="SKU"
            items={catSkus.map((s) => s.id)}
            value={skuId}
            onSelect={setSkuId}
            render={(id) => skus.find((x) => x.id === id)!.name}
          />
        </div>
      </SectionCard>

      <div className="grid gap-5 xl:grid-cols-[1.6fr_1fr]">
        <SectionCard
          title={`${sku.name} · ${store.name} ${store.code}`}
          description={`12-week historical demand with a ${horizon}-day forward forecast.`}
          actions={
            <Button size="sm" onClick={openExplain}>
              <Sparkles className="size-3.5" /> Explain Forecast
            </Button>
          }
        >
          <DemandChart data={series} height={360} />
          <p className="mt-3 text-sm text-muted-foreground">
            <span className="font-medium text-navy">So what?</span> Expected demand is tracking
            above the historical baseline for this store-SKU combination over the selected horizon.
          </p>
        </SectionCard>

        <SectionCard
          title="AI forecast summary"
          description="Demonstration-generated interpretation."
        >
          <p className="text-sm text-foreground/90">
            Demand for this SKU is expected to remain above its historical baseline over the next{" "}
            {horizon} days.
          </p>
          <dl className="mt-4 space-y-3">
            {[
              { k: "Confidence", v: `${confidence}%` },
              { k: "Trend", v: "Increasing" },
              { k: "Expected change", v: `+${expectedChangePct}%` },
              { k: "Primary signal", v: "Promotion + recent consumption trend" },
              { k: "Expected demand", v: `${expected.toLocaleString("en-IN")} units` },
            ].map((row) => (
              <div
                key={row.k}
                className="flex items-center justify-between border-b border-border pb-2 text-sm last:border-0 last:pb-0"
              >
                <dt className="text-muted-foreground">{row.k}</dt>
                <dd className="num font-semibold text-navy">{row.v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button size="sm" variant="outline" onClick={openExplain}>
              <Sparkles className="size-3.5" /> Explain Forecast
            </Button>
            <Button asChild size="sm" variant="ghost">
              <Link to="/ai/assistant">
                <MessageSquareText className="size-3.5" /> Ask Demand AI
              </Link>
            </Button>
          </div>
        </SectionCard>
      </div>

      <Sheet open={explain} onOpenChange={setExplain}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>AI Forecast Explanation</SheetTitle>
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
                  The forecast is higher than the historical baseline because the model detected
                  multiple demand signals.
                </p>
                <ul className="space-y-3">
                  {forecastSignals.map((d) => (
                    <li key={d.driver}>
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-navy">{d.driver}</span>
                        <span className="num font-semibold text-primary">+{d.impact}%</span>
                      </div>
                      <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-surface-strong">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: `${d.impact * 7}%` }}
                        />
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">{d.note}</p>
                    </li>
                  ))}
                </ul>
                <div className="rounded-md border border-border bg-surface p-3 text-sm">
                  <p className="label-eyebrow">AI interpretation</p>
                  <p className="mt-1 text-muted-foreground">
                    The combined signals indicate elevated near-term demand. Forecast confidence
                    remains high because the SKU has sufficient historical observations.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Button size="sm" variant="outline">
                      <FileSearch className="size-3.5" /> View Evidence
                    </Button>
                    <Button size="sm" variant="outline">
                      Compare Periods
                    </Button>
                    <Button asChild size="sm">
                      <Link to="/ai/assistant">
                        <MessageSquareText className="size-3.5" /> Ask Demand AI
                      </Link>
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
