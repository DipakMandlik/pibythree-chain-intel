import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SectionCard } from "@/components/app/page-header";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/_app/ai/alerts")({
  head: () => pageMeta("AI Alerts", "Ranked alerts with severity, affected entities and recommended action."),
  component: AiAlerts,
});

function AiAlerts() {
  return (
    <>
      <PageHeader title="AI Alerts" subtitle="Ranked alerts with severity, affected entities and recommended action." />
      <SectionCard title="Active alerts" description="Ranked by severity and time to impact.">
        <p className="text-sm text-muted-foreground">Critical, high and medium alerts across the network with recommended next actions.</p>
      </SectionCard>
    </>
  );
}
