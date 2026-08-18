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
import { aiActivity } from "@/data/demo";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/_app/governance/ai-activity")({
  head: () =>
    pageMeta(
      "AI Activity",
      "Every demand-forecasting model run, who requested it, and its output.",
    ),
  component: AiActivity,
});

function AiActivity() {
  return (
    <>
      <PageHeader
        title="AI Activity"
        subtitle="Every demand-forecasting model run, who requested it, and its output — for full transparency."
      />
      <SectionCard
        title="Recent model activity"
        description="Every AI recommendation is traceable to the run that produced it."
        padded={false}
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Time</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Capability</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {aiActivity.map((a, i) => (
              <TableRow key={i}>
                <TableCell className="num text-muted-foreground">{a.time}</TableCell>
                <TableCell className="font-medium text-navy">{a.user}</TableCell>
                <TableCell className="text-muted-foreground">{a.capability}</TableCell>
                <TableCell className="text-muted-foreground">{a.action}</TableCell>
                <TableCell>
                  <StatusPill tone="positive">{a.status}</StatusPill>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </SectionCard>
    </>
  );
}
