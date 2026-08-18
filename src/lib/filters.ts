import { categories, regions, skus, stores } from "@/data/demo";
import type { FilterState } from "@/components/app/filter-bar";

export const regionOptions = [{ value: "all", label: "All regions" }, ...regions.map((r) => ({ value: r, label: r }))];
export const categoryOptions = [{ value: "all", label: "All categories" }, ...categories.map((c) => ({ value: c, label: c }))];

export function storeOptionsFor(region: string) {
  const list = region === "all" ? stores : stores.filter((s) => s.region === region);
  return [{ value: "all", label: "All stores" }, ...list.map((s) => ({ value: s.id, label: `${s.name} ${s.code}` }))];
}

export function skuOptionsFor(category: string) {
  const list = category === "all" ? skus : skus.filter((s) => s.category === category);
  return [{ value: "all", label: "All SKUs" }, ...list.map((s) => ({ value: s.id, label: s.name }))];
}

export function matches(f: FilterState, skuId: string, storeId: string) {
  const sku = skus.find((s) => s.id === skuId);
  const store = stores.find((s) => s.id === storeId);
  if (f.region !== "all" && store?.region !== f.region) return false;
  if (f.store !== "all" && storeId !== f.store) return false;
  if (f.category !== "all" && sku?.category !== f.category) return false;
  if (f.sku !== "all" && skuId !== f.sku) return false;
  return true;
}

/** Deterministic seed derived from the active filter selection. */
export function filterSeed(f: FilterState) {
  const s = `${f.region}|${f.store}|${f.category}|${f.sku}`;
  return s.split("").reduce((a, c) => a + c.charCodeAt(0), 17) * 7 + 1;
}
