import { QueryClient } from "@tanstack/react-query";
import { createHashHistory, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

// The static GitHub Pages export (vite.gh-pages.config.ts, mode "gh-pages")
// has no server to rewrite deep links to index.html, so it uses hash-based
// routing instead. The default Start/SSR build is unaffected.
const isStaticExport = import.meta.env.MODE === "gh-pages";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    ...(isStaticExport ? { history: createHashHistory() } : {}),
  });

  return router;
};
