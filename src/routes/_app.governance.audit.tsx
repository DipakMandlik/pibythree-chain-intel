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
import { auditTrail } from "@/data/demo";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/_app/governance/audit")({
  head: () =>
    pageMeta("Audit Trail", "Who reviewed which demand forecast or scenario, when, and why."),
  component: AuditTrail,
});

const toneFor = (decision: string) =>
  decision === "Approved" ? "positive" : decision === "Deferred" ? "warning" : "info";

function AuditTrail() {
  return (
    <>
      <PageHeader
        title="Audit Trail"
        subtitle="Who reviewed which demand forecast, anomaly or scenario, when, and why."
      />
      <SectionCard
        title="Decision audit"
        description="Forecast approvals, scenario reviews and anomaly dispositions."
        padded={false}
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Time</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Recommendation</TableHead>
              <TableHead>Evidence</TableHead>
              <TableHead>Decision</TableHead>
              <TableHead>Outcome</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {auditTrail.map((a) => (
              <TableRow key={a.id}>
                <TableCell className="num text-muted-foreground">{a.time}</TableCell>
                <TableCell className="font-medium text-navy">{a.user}</TableCell>
                <TableCell className="text-muted-foreground">{a.recommendation}</TableCell>
                <TableCell className="text-muted-foreground">{a.evidence}</TableCell>
                <TableCell>
                  <StatusPill tone={toneFor(a.decision)}>{a.decision}</StatusPill>
                </TableCell>
                <TableCell className="text-muted-foreground">{a.outcome}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </SectionCard>
    </>
  );
}
