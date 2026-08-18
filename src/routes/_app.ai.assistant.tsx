import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SectionCard } from "@/components/app/page-header";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/_app/ai/assistant")({
  head: () => pageMeta("Supply Chain Assistant", "Ask questions about demand, inventory and procurement in plain language."),
  component: AiAssistant,
});

function AiAssistant() {
  return (
    <>
      <PageHeader title="Supply Chain Assistant" subtitle="Ask questions about demand, inventory and procurement in plain language." />
      <SectionCard title="Assistant" description="Conversational access to supply-chain intelligence.">
        <p className="text-sm text-muted-foreground">Ask about stock-out risk, forecast accuracy or supplier performance.</p>
      </SectionCard>
    </>
  );
}
