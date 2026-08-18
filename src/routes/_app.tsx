import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { ShieldAlert } from "lucide-react";
import { AppShell } from "@/components/app/app-shell";
import { Button } from "@/components/ui/button";
import { canAccess } from "@/data/demo";
import { useSession } from "@/lib/session";

export const Route = createFileRoute("/_app")({
  component: AppLayout,
});

function AppLayout() {
  const session = useSession();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const allowed = !session || canAccess(session.role, pathname);

  return (
    <AppShell>
      {allowed ? (
        <Outlet />
      ) : (
        <div className="panel flex flex-col items-center gap-2 p-12 text-center">
          <ShieldAlert className="size-6 text-warning" />
          <h1 className="text-lg font-semibold">Access restricted</h1>
          <p className="max-w-md text-sm text-muted-foreground">
            This workspace is not part of the current Predictive Demand Intelligence product phase.
            Inventory and procurement intelligence are planned for a future phase.
          </p>
          <Button asChild className="mt-2" size="sm">
            <Link to="/overview">Return to Demand Overview</Link>
          </Button>
        </div>
      )}
    </AppShell>
  );
}
