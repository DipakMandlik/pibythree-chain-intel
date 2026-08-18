import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SectionCard } from "@/components/app/page-header";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/_app/governance/ai-activity")({
  head: () => pageMeta("AI Activity", "Model runs, inputs and outputs for transparency."),
  component: AiActivity,
});

function AiActivity() {
  return (
    <>
      <PageHeader title="AI Activity" subtitle="Model runs, inputs and outputs for transparency." />
      <SectionCard title="Model activity" description="Recent AI runs and their outputs.">
        <p className="text-sm text-muted-foreground">Every recommendation is traceable to the model run that produced it.</p>
      </SectionCard>
    </>
  );
}
