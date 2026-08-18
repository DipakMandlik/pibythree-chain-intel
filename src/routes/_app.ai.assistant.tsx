import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CornerDownLeft, MessageSquareText, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageHeader, SectionCard } from "@/components/app/page-header";
import { AiProcessing } from "@/components/app/states";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/_app/ai/assistant")({
  head: () =>
    pageMeta("Ask Demand AI", "Ask questions about demand, forecasts and demand signals."),
  component: AskDemandAi,
});

interface DemandAnswer {
  question: string;
  answer: string;
  evidence: string[];
  drivers: string[];
  confidence: number;
  nextStep: string;
}

const knowledgeBase: DemandAnswer[] = [
  {
    question: "Why is demand increasing in Mumbai?",
    answer:
      "Mumbai beverage demand is running 14% above its historical baseline, driven by an active promotion and warm-weather seasonality.",
    evidence: [
      "Promotion active across 6 Mumbai stores",
      "Recent 3-week consumption trend +7%",
      "Warm-weather index rising",
    ],
    drivers: ["Promotional signal +11%", "Recent consumption trend +7%", "Seasonality +5%"],
    confidence: 88,
    nextStep:
      "Review the Demand Drivers page for the full signal breakdown before adjusting the plan.",
  },
  {
    question: "Which SKUs have the strongest growth?",
    answer:
      "Beverage X — Cola 750ml and Packaged Food D — Instant Noodles show the strongest forecasted growth this cycle, both above +14%.",
    evidence: [
      "Beverage X forecast growth +18%",
      "Packaged Food D forecast growth +11%",
      "Both concentrated in Maharashtra and Delhi NCR stores",
    ],
    drivers: ["Promotional activity", "Recent consumption trend"],
    confidence: 85,
    nextStep:
      "Open SKU Demand to compare growth, variance and confidence across the full SKU list.",
  },
  {
    question: "Which forecasts have low confidence?",
    answer:
      "Forecast confidence is lowest for the Dairy category and for recently promoted SKUs with limited historical observations.",
    evidence: [
      "Dairy accuracy 86.6%, the lowest of 7 categories",
      "Promoted SKUs average 81% confidence vs 90% for stable SKUs",
    ],
    drivers: ["Short shelf-life volatility", "Limited promotion history"],
    confidence: 80,
    nextStep:
      "Review Forecast Accuracy by category and treat low-confidence forecasts with added planner judgement.",
  },
  {
    question: "What are the biggest demand anomalies?",
    answer:
      "The largest anomalies are concentrated in Beverages and Packaged Food, with 2 critical and 3 high-severity SKU-store combinations this cycle.",
    evidence: [
      "18 anomalies detected across 10 SKUs and 14 stores",
      "Largest single deviation +24% at Delhi — Rohini",
    ],
    drivers: ["Promotion-driven demand spikes", "Local footfall and catchment effects"],
    confidence: 90,
    nextStep: "Open Demand Anomalies and add the highest-severity rows to your planning review.",
  },
  {
    question: "Which categories are most seasonal?",
    answer:
      "Beverages and Dairy carry the strongest seasonal signal, with demand rising alongside the warm-weather index and weekend effects.",
    evidence: [
      "Beverages seasonality contribution 21% of driver mix",
      "Weekend uplift multiplier +18% across FMCG categories",
    ],
    drivers: ["Warm-weather index", "Weekend calendar effect"],
    confidence: 84,
    nextStep: "Review Demand Drivers to see the full seasonal contribution by category.",
  },
  {
    question: "Why is this SKU forecast higher than last week?",
    answer:
      "The forecast increased because the model detected a stronger promotional signal and elevated recent consumption for this SKU-store combination.",
    evidence: [
      "Promotional signal +11%",
      "Recent consumption trend +7%",
      "Local demand pattern +3%",
    ],
    drivers: ["Promotional signal", "Recent consumption trend"],
    confidence: 89,
    nextStep: "Open Forecast Explorer and use Explain Forecast for the full signal breakdown.",
  },
  {
    question: "Which stores have unusual demand patterns?",
    answer:
      "Mumbai #142, Delhi — Rohini and Bengaluru — Koramangala show the most unusual demand patterns this cycle.",
    evidence: [
      "Mumbai #142 — Beverage X variance +18%",
      "Delhi — Rohini — Packaged Food D variance +24%",
    ],
    drivers: ["Promotion timing", "New-store catchment effects"],
    confidence: 87,
    nextStep: "Open Demand Anomalies filtered by store to review each pattern in detail.",
  },
  {
    question: "How accurate has the forecast been?",
    answer:
      "Weighted forecast accuracy stands at 91.4%, up 3.8 points after the latest retraining cycle, with MAPE at 6.2%.",
    evidence: [
      "Accuracy 87.6% → 91.4%",
      "MAPE improved to 6.2%",
      "Bias +1.8%, a slight over-forecast",
    ],
    drivers: ["Model retraining on recent promotional and seasonal data"],
    confidence: 93,
    nextStep: "Review Forecast Accuracy for the breakdown by category, store, SKU and horizon.",
  },
];

const fallback: DemandAnswer = {
  question: "",
  answer:
    "This question is outside the current demand-intelligence scope. Ask about demand, forecasts, forecast accuracy or demand anomalies.",
  evidence: ["Ask Demand AI answers questions about demand, forecasts and demand signals only."],
  drivers: [],
  confidence: 0,
  nextStep:
    "Try one of the suggested questions below, or rephrase your question around demand or forecasting.",
};

function findAnswer(q: string): DemandAnswer {
  const norm = q.trim().toLowerCase();
  const exact = knowledgeBase.find((k) => k.question.toLowerCase() === norm);
  if (exact) return exact;
  const partial = knowledgeBase.find(
    (k) => norm.length > 3 && k.question.toLowerCase().includes(norm),
  );
  return partial ?? { ...fallback, question: q };
}

function AskDemandAi() {
  const [query, setQuery] = useState("");
  const [thread, setThread] = useState<DemandAnswer[]>([]);
  const [thinking, setThinking] = useState(false);

  const ask = (q: string) => {
    if (!q.trim()) return;
    setThinking(true);
    setQuery("");
    setTimeout(() => {
      setThread((t) => [findAnswer(q), ...t]);
      setThinking(false);
    }, 1100);
  };

  return (
    <>
      <PageHeader
        title="Ask Demand AI"
        subtitle="Ask questions about demand, forecasts and demand signals."
      />

      <SectionCard
        title="Ask a question"
        description="Focused on demand intelligence — not a general-purpose assistant."
      >
        <form
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            ask(query);
          }}
        >
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. Why is demand increasing in Mumbai?"
            className="flex-1"
          />
          <Button type="submit" disabled={thinking || !query.trim()}>
            <CornerDownLeft className="size-3.5" /> Ask
          </Button>
        </form>
        <div className="mt-3 flex flex-wrap gap-2">
          {knowledgeBase.map((k) => (
            <button
              key={k.question}
              onClick={() => ask(k.question)}
              className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-foreground/85 transition-colors hover:border-primary/40 hover:text-navy"
            >
              {k.question}
            </button>
          ))}
        </div>
      </SectionCard>

      {thinking && (
        <AiProcessing
          steps={[
            "Reading demand signals…",
            "Checking forecast accuracy…",
            "Composing structured answer…",
          ]}
        />
      )}

      <div className="space-y-4">
        {thread.map((a, i) => (
          <section key={i} className="panel overflow-hidden">
            <header className="flex items-start gap-2.5 border-b border-border bg-surface px-4 py-3">
              <span className="mt-0.5 flex size-7 items-center justify-center rounded-md bg-primary/10 text-primary">
                <Sparkles className="size-4" />
              </span>
              <div>
                <p className="label-eyebrow">You asked</p>
                <h3 className="mt-0.5 text-sm font-semibold leading-snug text-navy">
                  {a.question}
                </h3>
              </div>
            </header>
            <div className="grid gap-4 p-4 md:grid-cols-2">
              <div>
                <p className="label-eyebrow">Answer</p>
                <p className="mt-1 text-sm text-foreground/90">{a.answer}</p>
                <p className="label-eyebrow mt-4">Evidence</p>
                <ul className="mt-1.5 space-y-1.5">
                  {a.evidence.map((e) => (
                    <li key={e} className="flex gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent-blue" />
                      <span>{e}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                {a.drivers.length > 0 && (
                  <div>
                    <p className="label-eyebrow">Drivers</p>
                    <ul className="mt-1.5 space-y-1.5">
                      {a.drivers.map((d) => (
                        <li key={d} className="flex gap-2 text-sm text-muted-foreground">
                          <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="label-eyebrow">Confidence</span>
                    <span className="font-semibold text-navy num">{a.confidence}%</span>
                  </div>
                  <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-surface-strong">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{ width: `${a.confidence}%` }}
                    />
                  </div>
                </div>
                <div className="rounded-md border border-border bg-surface p-3">
                  <p className="label-eyebrow">Suggested next step</p>
                  <p className="mt-1 text-sm text-muted-foreground">{a.nextStep}</p>
                </div>
              </div>
            </div>
          </section>
        ))}
        {thread.length === 0 && !thinking && (
          <div className="panel flex flex-col items-center gap-2 p-10 text-center text-sm text-muted-foreground">
            <MessageSquareText className="size-5 text-muted-foreground" />
            Ask a question above or pick a suggestion to see a structured demand-intelligence
            answer.
          </div>
        )}
      </div>
    </>
  );
}
