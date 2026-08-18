import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SectionCard } from "@/components/app/page-header";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/_app/governance/audit")({
  head: () => pageMeta("Audit Trail", "Who acted on which recommendation, when and why."),
  component: AuditTrail,
});

function AuditTrail() {
  return (
    <>
      <PageHeader title="Audit Trail" subtitle="Who acted on which recommendation, when and why." />
      <SectionCard title="Decision audit" description="Approvals, modifications and rejections.">
        <p className="text-sm text-muted-foreground">Full decision history for governance and compliance review.</p>
      </SectionCard>
    </>
  );
}
