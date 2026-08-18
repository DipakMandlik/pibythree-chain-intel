import { createFileRoute, redirect } from "@tanstack/react-router";

// The Demand Overview experience now lives at /overview (the Primary nav
// item for this product phase). This route is kept — rather than deleted —
// so any existing links or bookmarks land somewhere useful.
export const Route = createFileRoute("/_app/demand")({
  beforeLoad: () => {
    throw redirect({ to: "/overview" });
  },
});
