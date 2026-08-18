// Static, client-only build used to publish this app to GitHub Pages.
//
// The default vite.config.ts wires up @lovable.dev/vite-tanstack-config,
// which targets TanStack Start's SSR pipeline (nitro/cloudflare). GitHub
// Pages can only serve static files, so this is a separate, standard Vite
// SPA config — no Start, no nitro, no server plugins — that builds
// index.gh-pages.html + src/entry-gh-pages.tsx into a self-contained
// static bundle. It does not affect the default `bun run dev` / `bun run
// build` pipeline in any way.
//
// Run with: bun run build:gh-pages
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";

const rootDir = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  root: rootDir,
  // Must match the repo name so asset URLs resolve under
  // https://<owner>.github.io/pibythree-chain-intel/. Override with
  // GH_PAGES_BASE if this is ever published under a different path.
  base: process.env["GH_PAGES_BASE"] ?? "/pibythree-chain-intel/",
  plugins: [tsConfigPaths(), viteReact(), tailwindcss()],
  resolve: {
    alias: {
      // The real logo resolves through a Lovable-hosted CDN path that only
      // exists inside Lovable's own environment — swap in a locally
      // bundled copy of the same brand mark for this build instead.
      "@/assets/pibythree-logo.jpg.asset.json": fileURLToPath(
        new URL("./src/assets/pibythree-logo.gh-pages.ts", import.meta.url),
      ),
    },
  },
  build: {
    outDir: "dist-gh-pages",
    rollupOptions: {
      input: fileURLToPath(new URL("./index.gh-pages.html", import.meta.url)),
    },
  },
});
