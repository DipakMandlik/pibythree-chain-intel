import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SectionCard } from "@/components/app/page-header";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/_app/ai/recommendations")({
  head: () => pageMeta("AI Recommendations", "Every AI recommendation across demand, inventory and procurement in one queue."),
  component: AiRecommendations,
});

function AiRecommendations() {
  return (
    <>
      <PageHeader title="AI Recommendations" subtitle="Every AI recommendation across demand, inventory and procurement in one queue." />
      <SectionCard title="Recommendation queue" description="Ranked by business impact and confidence.">
        <p className="text-sm text-muted-foreground">Recommendations from demand, inventory and procurement are consolidated here for review, approval or modification.</p>
      </SectionCard>
    </>
  );
}
