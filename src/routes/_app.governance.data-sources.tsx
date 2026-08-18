import { createFileRoute } from "@tanstack/react-router";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PageHeader, SectionCard } from "@/components/app/page-header";
import { StatusPill } from "@/components/app/badges";
import { dataSources } from "@/data/demo";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/_app/governance/data-sources")({
  head: () =>
    pageMeta(
      "Data Sources",
      "Source systems feeding the demand forecast, with freshness and connection status.",
    ),
  component: DataSources,
});

function DataSources() {
  return (
    <>
      <PageHeader
        title="Data Sources"
        subtitle="Source systems feeding the demand forecast, with freshness and connection status."
      />
      <SectionCard
        title="Connected sources"
        description="Every signal the forecast model consumes, refreshed on a rolling basis."
        padded={false}
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Source</TableHead>
              <TableHead>System</TableHead>
              <TableHead className="text-right">Records</TableHead>
              <TableHead>Freshness</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Role in forecast</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dataSources.map((d) => (
              <TableRow key={d.name}>
                <TableCell className="font-medium text-navy">{d.name}</TableCell>
                <TableCell className="text-muted-foreground">{d.system}</TableCell>
                <TableCell className="num text-right">{d.records}</TableCell>
                <TableCell className="num text-muted-foreground">{d.freshness}</TableCell>
                <TableCell>
                  <StatusPill tone="positive">{d.status}</StatusPill>
                </TableCell>
                <TableCell className="text-muted-foreground">{d.note}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </SectionCard>
    </>
  );
}
