// Client-only bootstrap for the static GitHub Pages export.
//
// The default app is a TanStack Start SSR build (see src/router.tsx,
// src/routes/__root.tsx and src/server.ts), rendered and hydrated through
// Start's own pipeline. GitHub Pages can only serve static files, so this
// entry instead mounts the same route tree as a plain client-rendered SPA
// against index.gh-pages.html — no server, no hydration mismatch to worry
// about. See vite.gh-pages.config.ts for the build that wires this up.
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { getRouter } from "./router";
import "./styles.css";

// Per-route <title>/meta via Route.head() is a Start/SSR-document feature
// (rendered through __root.tsx's RootShell + <HeadContent/>), not available
// to a plain client render like this one — <HeadContent/> requires router
// context it doesn't have as a sibling of RouterProvider here. This build
// keeps the static title/description already set in index.gh-pages.html.
const router = getRouter();

const rootEl = document.getElementById("root");
if (!rootEl) throw new Error("Missing #root element in index.gh-pages.html");

createRoot(rootEl).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
