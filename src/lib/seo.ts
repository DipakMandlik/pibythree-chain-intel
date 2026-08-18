export function pageMeta(title: string, description: string) {
  const full = `${title} — Pibythree Supply & Demand Intelligence`;
  return {
    meta: [
      { title: full },
      { name: "description", content: description },
      { property: "og:title", content: full },
      { property: "og:description", content: description },
    ],
  };
}
