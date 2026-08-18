import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app/page-header";
import { AiInsightCard } from "@/components/app/ai-insight-card";
import type { Severity } from "@/data/demo";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/_app/ai/insights")({
  head: () =>
    pageMeta(
      "AI Demand Insights",
      "Every AI-generated demand insight, ranked by confidence and business impact.",
    ),
  component: AiInsights,
});

interface DemandInsight {
  id: string;
  title: string;
  severity: Severity;
  reason: string;
  evidence: string[];
  impact: string;
  confidence: number;
  link: { to: string; label: string };
}

const insights: DemandInsight[] = [
  {
    id: "ins-1",
    title: "Raise Mumbai beverage forecast by 14% for the next 14 days",
    severity: "medium",
    reason:
      "Promotion uplift and warm-weather seasonality are compounding above baseline for a sustained period.",
    evidence: ["Promotional signal +11%", "Recent consumption trend +7%", "Seasonality +5%"],
    impact: "Improves forecast accuracy by an estimated 2.1 points",
    confidence: 86,
    link: { to: "/demand/drivers", label: "View demand drivers" },
  },
  {
    id: "ins-2",
    title: "Investigate systematic under-forecasting in the Dairy category",
    severity: "high",
    reason: "Forecast bias has widened to -4.8% with MAPE at 12.8%, the weakest in the portfolio.",
    evidence: ["Bias -4.8%", "MAPE 12.8%", "Accuracy 86.6% — lowest of 7 categories"],
    impact: "Reduces planning risk on a short-shelf-life category",
    confidence: 82,
    link: { to: "/demand/accuracy", label: "Review forecast accuracy" },
  },
  {
    id: "ins-3",
    title: "5 high-priority demand anomalies require review",
    severity: "critical",
    reason:
      "2 critical and 3 high-severity SKU-store combinations show demand outside the model's confidence band.",
    evidence: [
      "18 anomalies detected this cycle",
      "5 rated critical or high severity",
      "Concentrated in Beverages and Packaged Food",
    ],
    impact: "Protects forecast reliability before the next planning cycle",
    confidence: 90,
    link: { to: "/demand/anomalies", label: "Open demand anomalies" },
  },
  {
    id: "ins-4",
    title: "Forecast confidence is lower for recently promoted SKUs",
    severity: "medium",
    reason:
      "SKUs with fewer historical observations under promotion carry wider confidence intervals.",
    evidence: [
      "Promoted SKUs average 81% confidence vs 90% for stable SKUs",
      "Confidence improves after 3 promotion cycles",
    ],
    impact: "Flags forecasts that need planner judgement alongside the model",
    confidence: 78,
    link: { to: "/demand/forecast-explorer", label: "Open forecast explorer" },
  },
  {
    id: "ins-5",
    title: "Forecast accuracy improved 3.8 points after the latest retraining cycle",
    severity: "opportunity",
    reason:
      "Incorporating the most recent promotional and seasonal observations lifted weighted accuracy to 91.4%.",
    evidence: ["Accuracy 87.6% → 91.4%", "MAPE improved to 6.2%"],
    impact: "Higher-confidence forecasts across the portfolio",
    confidence: 94,
    link: { to: "/demand/accuracy", label: "Review forecast accuracy" },
  },
];

function AiInsights() {
  return (
    <>
      <PageHeader
        title="AI Demand Insights"
        subtitle="Every AI-generated demand insight, ranked by confidence and business impact."
      />
      <div className="space-y-4">
        {insights.map((i) => (
          <AiInsightCard
            key={i.id}
            title={i.title}
            severity={i.severity}
            reason={i.reason}
            evidence={i.evidence}
            impact={i.impact}
            confidence={i.confidence}
            link={i.link}
          />
        ))}
      </div>
    </>
  );
}
