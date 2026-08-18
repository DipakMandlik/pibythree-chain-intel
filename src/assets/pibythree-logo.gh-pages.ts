// Substitute for pibythree-logo.jpg.asset.json used only by the static
// GitHub Pages build (see vite.gh-pages.config.ts).
//
// The real logo asset resolves through Lovable's hosted CDN path
// (/__l5e/assets-v1/...), which only exists inside the Lovable-managed
// preview/production environment. GitHub Pages can't reach it, so this
// build instead bundles the same brand mark already checked into the repo
// as public/favicon.png (copied here as pibythree-logo-gh-pages.png) and
// exposes it with the same shape brand.tsx expects.
import url from "./pibythree-logo-gh-pages.png";

export default { url };
