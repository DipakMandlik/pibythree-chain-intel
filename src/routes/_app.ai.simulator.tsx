import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SectionCard } from "@/components/app/page-header";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/_app/ai/simulator")({
  head: () => pageMeta("Scenario Simulator", "Model demand, inventory and procurement scenarios before committing decisions."),
  component: AiSimulator,
});

function AiSimulator() {
  return (
    <>
      <PageHeader title="Scenario Simulator" subtitle="Model demand, inventory and procurement scenarios before committing decisions." />
      <SectionCard title="Scenario inputs" description="Adjust demand, lead time and pricing assumptions.">
        <p className="text-sm text-muted-foreground">Simulated outcomes are illustrative and based on the demonstration dataset.</p>
      </SectionCard>
    </>
  );
}
