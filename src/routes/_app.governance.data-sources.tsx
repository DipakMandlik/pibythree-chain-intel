import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SectionCard } from "@/components/app/page-header";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/_app/governance/data-sources")({
  head: () => pageMeta("Data Sources", "Source systems, freshness and data quality status."),
  component: DataSources,
});

function DataSources() {
  return (
    <>
      <PageHeader title="Data Sources" subtitle="Source systems, freshness and data quality status." />
      <SectionCard title="Connected sources" description="Freshness and quality across ingestion pipelines.">
        <p className="text-sm text-muted-foreground">POS, inventory, supplier and promotion feeds with last sync status.</p>
      </SectionCard>
    </>
  );
}
