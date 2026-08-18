// Centralized demonstration dataset for Pibythree Predictive Demand Intelligence.
// All values are illustrative and generated for demonstration purposes only.

export type Severity = "critical" | "high" | "medium" | "opportunity";
export type RoleId =
  "supply_chain_head" | "demand_planner" | "inventory_manager" | "procurement_manager";

export interface Persona {
  id: string;
  name: string;
  role: RoleId;
  roleLabel: string;
  email: string;
  initials: string;
  objective: string;
}

export const personas: Persona[] = [
  {
    id: "ananya",
    name: "Ananya Sharma",
    role: "supply_chain_head",
    roleLabel: "Supply Chain Head",
    email: "ananya.sharma@demo.pibythree.com",
    initials: "AS",
    objective: "Enterprise demand and planning oversight",
  },
  {
    id: "rahul",
    name: "Rahul Mehta",
    role: "demand_planner",
    roleLabel: "Demand Planner",
    email: "rahul.mehta@demo.pibythree.com",
    initials: "RM",
    objective: "Forecasting and demand planning",
  },
  {
    id: "priya",
    name: "Priya Deshmukh",
    role: "inventory_manager",
    roleLabel: "Inventory Manager",
    email: "priya.deshmukh@demo.pibythree.com",
    initials: "PD",
    objective: "Demand visibility for inventory planning",
  },
  {
    id: "vikram",
    name: "Vikram Patel",
    role: "procurement_manager",
    roleLabel: "Procurement Manager",
    email: "vikram.patel@demo.pibythree.com",
    initials: "VP",
    objective: "Demand visibility for sourcing and planning",
  },
];

// ---------------------------------------------------------------------------
// Regions, cities, stores
// ---------------------------------------------------------------------------

export const regions = ["Maharashtra", "Gujarat", "Karnataka", "Delhi NCR", "Telangana"] as const;
export type Region = (typeof regions)[number];

export interface Store {
  id: string;
  code: string;
  name: string;
  region: Region;
  city: string;
  dc: string;
  status: "healthy" | "excess" | "at_risk" | "critical";
  daysOfCover: number;
  stockValueCr: number;
}

export const distributionCentres = [
  {
    id: "dc-west",
    name: "DC Bhiwandi (West)",
    region: "Maharashtra" as Region,
    utilisation: 82,
    stockValueCr: 148,
  },
  {
    id: "dc-pune",
    name: "DC Chakan (Pune)",
    region: "Maharashtra" as Region,
    utilisation: 74,
    stockValueCr: 96,
  },
  {
    id: "dc-south",
    name: "DC Medchal (South)",
    region: "Telangana" as Region,
    utilisation: 68,
    stockValueCr: 84,
  },
  {
    id: "dc-north",
    name: "DC Kundli (North)",
    region: "Delhi NCR" as Region,
    utilisation: 71,
    stockValueCr: 76,
  },
];

export const stores: Store[] = [
  {
    id: "s142",
    code: "#142",
    name: "Mumbai — Powai",
    region: "Maharashtra",
    city: "Mumbai",
    dc: "dc-west",
    status: "critical",
    daysOfCover: 2.1,
    stockValueCr: 4.2,
  },
  {
    id: "s087",
    code: "#087",
    name: "Mumbai — Mulund",
    region: "Maharashtra",
    city: "Mumbai",
    dc: "dc-west",
    status: "excess",
    daysOfCover: 26.4,
    stockValueCr: 5.6,
  },
  {
    id: "s061",
    code: "#061",
    name: "Mumbai — Andheri",
    region: "Maharashtra",
    city: "Mumbai",
    dc: "dc-west",
    status: "at_risk",
    daysOfCover: 6.2,
    stockValueCr: 3.9,
  },
  {
    id: "s031",
    code: "#031",
    name: "Pune — Kothrud",
    region: "Maharashtra",
    city: "Pune",
    dc: "dc-pune",
    status: "at_risk",
    daysOfCover: 5.8,
    stockValueCr: 3.1,
  },
  {
    id: "s044",
    code: "#044",
    name: "Pune — Hadapsar",
    region: "Maharashtra",
    city: "Pune",
    dc: "dc-pune",
    status: "healthy",
    daysOfCover: 13.6,
    stockValueCr: 2.8,
  },
  {
    id: "s112",
    code: "#112",
    name: "Nashik — College Road",
    region: "Maharashtra",
    city: "Nashik",
    dc: "dc-pune",
    status: "healthy",
    daysOfCover: 11.9,
    stockValueCr: 2.2,
  },
  {
    id: "s405",
    code: "#405",
    name: "Nagpur — Civil Lines",
    region: "Maharashtra",
    city: "Nagpur",
    dc: "dc-pune",
    status: "healthy",
    daysOfCover: 12.4,
    stockValueCr: 2.6,
  },
  {
    id: "s203",
    code: "#203",
    name: "Ahmedabad — Satellite",
    region: "Gujarat",
    city: "Ahmedabad",
    dc: "dc-west",
    status: "healthy",
    daysOfCover: 14.8,
    stockValueCr: 3.4,
  },
  {
    id: "s215",
    code: "#215",
    name: "Ahmedabad — Vastrapur",
    region: "Gujarat",
    city: "Ahmedabad",
    dc: "dc-west",
    status: "excess",
    daysOfCover: 19.6,
    stockValueCr: 2.9,
  },
  {
    id: "s512",
    code: "#512",
    name: "Bengaluru — Whitefield",
    region: "Karnataka",
    city: "Bengaluru",
    dc: "dc-south",
    status: "healthy",
    daysOfCover: 10.8,
    stockValueCr: 3.7,
  },
  {
    id: "s519",
    code: "#519",
    name: "Bengaluru — Koramangala",
    region: "Karnataka",
    city: "Bengaluru",
    dc: "dc-south",
    status: "at_risk",
    daysOfCover: 6.9,
    stockValueCr: 3.2,
  },
  {
    id: "s601",
    code: "#601",
    name: "Delhi — Rohini",
    region: "Delhi NCR",
    city: "Delhi",
    dc: "dc-north",
    status: "critical",
    daysOfCover: 3.4,
    stockValueCr: 4.6,
  },
  {
    id: "s608",
    code: "#608",
    name: "Delhi — Saket",
    region: "Delhi NCR",
    city: "Delhi",
    dc: "dc-north",
    status: "healthy",
    daysOfCover: 15.2,
    stockValueCr: 3.9,
  },
  {
    id: "s318",
    code: "#318",
    name: "Hyderabad — Gachibowli",
    region: "Telangana",
    city: "Hyderabad",
    dc: "dc-south",
    status: "excess",
    daysOfCover: 22.1,
    stockValueCr: 4.0,
  },
];

// ---------------------------------------------------------------------------
// Categories, SKUs
// ---------------------------------------------------------------------------

export const categories = [
  "Beverages",
  "Snacks",
  "Dairy",
  "Staples",
  "Personal Care",
  "Home Care",
  "Packaged Food",
] as const;
export type Category = (typeof categories)[number];

export interface Sku {
  id: string;
  code: string;
  name: string;
  category: Category;
  unitPrice: number;
  supplierId: string;
}

export const skus: Sku[] = [
  {
    id: "sku-bev-x",
    code: "BEV-1001",
    name: "Beverage X — Cola 750ml",
    category: "Beverages",
    unitPrice: 98,
    supplierId: "sup-a",
  },
  {
    id: "sku-bev-y",
    code: "BEV-1042",
    name: "Beverage Y — Lemon 1L",
    category: "Beverages",
    unitPrice: 74,
    supplierId: "sup-b",
  },
  {
    id: "sku-snk-y",
    code: "SNK-2210",
    name: "Snack Y — Salted Chips 120g",
    category: "Snacks",
    unitPrice: 42,
    supplierId: "sup-c",
  },
  {
    id: "sku-snk-e",
    code: "SNK-2244",
    name: "Snack E — Namkeen Mix 200g",
    category: "Snacks",
    unitPrice: 55,
    supplierId: "sup-c",
  },
  {
    id: "sku-dai-z",
    code: "DAI-3305",
    name: "Dairy Z — Toned Milk 1L",
    category: "Dairy",
    unitPrice: 66,
    supplierId: "sup-b",
  },
  {
    id: "sku-stp-a",
    code: "STP-4110",
    name: "Staple A — Sona Masoori 10kg",
    category: "Staples",
    unitPrice: 620,
    supplierId: "sup-d",
  },
  {
    id: "sku-stp-f",
    code: "STP-4188",
    name: "Staple F — Toor Dal 5kg",
    category: "Staples",
    unitPrice: 540,
    supplierId: "sup-d",
  },
  {
    id: "sku-per-c",
    code: "PER-6210",
    name: "Personal Care C — Herbal Shampoo 340ml",
    category: "Personal Care",
    unitPrice: 185,
    supplierId: "sup-c",
  },
  {
    id: "sku-hom-b",
    code: "HOM-5120",
    name: "Home Care B — Detergent 2kg",
    category: "Home Care",
    unitPrice: 249,
    supplierId: "sup-c",
  },
  {
    id: "sku-pkg-d",
    code: "PKG-7305",
    name: "Packaged Food D — Instant Noodles 280g",
    category: "Packaged Food",
    unitPrice: 58,
    supplierId: "sup-a",
  },
];

export interface Supplier {
  id: string;
  name: string;
  spendCr: number;
  delivery: number;
  quality: number;
  pricing: number;
  fillRate: number;
  compliance: number;
  aiScore: number;
  assessment: string;
  recommendation: string;
  skus: string[];
}

export const suppliers: Supplier[] = [
  {
    id: "sup-a",
    name: "Supplier A — Krishna Beverages",
    spendCr: 12.4,
    delivery: 96,
    quality: 94,
    pricing: 91,
    fillRate: 95,
    compliance: 97,
    aiScore: 94,
    assessment:
      "Supplier A delivers consistently with strong quality outcomes and reliable fill rates across beverage SKUs.",
    recommendation:
      "Maintain current allocation and consider volume consolidation to unlock additional price leverage.",
    skus: ["sku-bev-x", "sku-pkg-d"],
  },
  {
    id: "sup-b",
    name: "Supplier B — Sahyadri Foods",
    spendCr: 9.8,
    delivery: 78,
    quality: 91,
    pricing: 95,
    fillRate: 86,
    compliance: 94,
    aiScore: 84,
    assessment:
      "Supplier B provides competitive pricing but presents elevated delivery risk, with lead-time variance rising over the last 6 weeks.",
    recommendation:
      "Reduce dependency for time-sensitive SKUs and diversify selected volume toward higher-performing suppliers.",
    skus: ["sku-bev-y", "sku-dai-z"],
  },
  {
    id: "sup-c",
    name: "Supplier C — Deccan Consumer Goods",
    spendCr: 7.2,
    delivery: 92,
    quality: 96,
    pricing: 88,
    fillRate: 93,
    compliance: 92,
    aiScore: 92,
    assessment:
      "Supplier C performs strongly on quality and delivery but is priced above the competitive benchmark on two SKUs.",
    recommendation:
      "Open a price negotiation cycle referencing benchmark pricing from comparable suppliers.",
    skus: ["sku-snk-y", "sku-snk-e", "sku-hom-b", "sku-per-c"],
  },
  {
    id: "sup-d",
    name: "Supplier D — Godavari Agro",
    spendCr: 5.6,
    delivery: 88,
    quality: 89,
    pricing: 93,
    fillRate: 90,
    compliance: 88,
    aiScore: 88,
    assessment:
      "Supplier D is stable on staples with moderate seasonal delivery variance during harvest cycles.",
    recommendation: "Lock seasonal contract terms ahead of the next harvest window.",
    skus: ["sku-stp-a", "sku-stp-f"],
  },
];

// ---------------------------------------------------------------------------
// Headline demand KPIs — single source of truth for cross-page consistency
// ---------------------------------------------------------------------------

export const kpiHeadline = {
  forecastAccuracyPct: 91.4,
  forecastAccuracyChangePts: 3.8,
  forecastedDemandUnits: 2_840_000,
  forecastedDemandHorizonDays: 14,
  demandGrowthPct: 8.7,
  demandGrowthChangePts: 1.4,
  forecastVariancePct: 6.2,
  forecastVarianceChangePts: -1.4,
  mapePct: 6.2,
  biasPct: 1.8,
  bestPerformingCategory: "Beverages" as Category,
  highestVarianceCategory: "Dairy" as Category,
};

// ---------------------------------------------------------------------------
// Demand series
// ---------------------------------------------------------------------------

export interface DemandPoint {
  date: string;
  actual: number | null;
  forecast: number;
  lower: number;
  upper: number;
  promotion?: boolean;
  seasonal?: boolean;
}

function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export function buildDemandSeries(
  seed: number,
  base: number,
  growth: number,
  historyDays = 84,
  horizonDays = 30,
): DemandPoint[] {
  const rnd = seeded(seed);
  const out: DemandPoint[] = [];
  const start = new Date("2026-05-20T00:00:00Z");
  for (let i = 0; i < historyDays + horizonDays; i++) {
    const d = new Date(start.getTime() + i * 86400000);
    const dow = d.getUTCDay();
    const weekend = dow === 0 || dow === 6 ? 1.18 : 1;
    const season = 1 + 0.08 * Math.sin(i / 12);
    const trend = 1 + (growth * i) / (historyDays + horizonDays);
    const promo = i % 29 === 0 && i > 10;
    const noise = 0.94 + rnd() * 0.12;
    const forecast = Math.round(base * weekend * season * trend * (promo ? 1.16 : 1));
    const isHistory = i < historyDays;
    out.push({
      date: d.toISOString().slice(0, 10),
      actual: isHistory ? Math.round(forecast * noise) : null,
      forecast,
      lower: Math.round(forecast * (isHistory ? 0.97 : 0.9)),
      upper: Math.round(forecast * (isHistory ? 1.03 : 1.11)),
      promotion: promo,
      seasonal: i % 30 === 14,
    });
  }
  return out;
}

/** Uplift signals shown in the "Explain Forecast" panel — additive demand drivers for a single forecast. */
export const forecastSignals = [
  {
    driver: "Promotional Signal",
    impact: 11,
    note: "Weekend beverage promotion active across 6 Mumbai stores",
  },
  { driver: "Recent Consumption", impact: 7, note: "Trailing 3-week consumption above baseline" },
  { driver: "Seasonality", impact: 5, note: "Warm-weather beverage index rising" },
  { driver: "Local Demand Pattern", impact: 3, note: "Residential catchment footfall increase" },
];

/** Portfolio-level driver contribution — shares sum to 100% for the Demand Drivers page. */
export const demandDriverContribution = [
  { driver: "Historical Trend", share: 38, note: "Trailing 12-week consumption baseline" },
  { driver: "Promotion", share: 27, note: "Active and scheduled promotional events" },
  { driver: "Seasonality", share: 21, note: "Calendar and weather-linked demand cycles" },
  { driver: "Local Pattern", share: 14, note: "Store-catchment and footfall effects" },
];

export interface DemandSignal {
  id: string;
  skuId: string;
  storeId: string;
  signal: string;
  severity: Severity;
  interpretation: string;
  detail: string;
  variance: number;
}

export const demandSignals: DemandSignal[] = [
  {
    id: "sig-1",
    skuId: "sku-bev-x",
    storeId: "s142",
    signal: "Demand spike",
    severity: "critical",
    interpretation: "Promotion-driven increase",
    detail:
      "Daily off-take is running 31% above the 8-week baseline since the promotion window opened. Store-level footfall and basket attach rate both increased.",
    variance: 31,
  },
  {
    id: "sig-2",
    skuId: "sku-snk-y",
    storeId: "s031",
    signal: "Demand decline",
    severity: "medium",
    interpretation: "Below baseline",
    detail:
      "Consumption tracked 12% under baseline for 9 consecutive days, consistent with a competing local promotion.",
    variance: -12,
  },
  {
    id: "sig-3",
    skuId: "sku-dai-z",
    storeId: "s087",
    signal: "Demand anomaly",
    severity: "high",
    interpretation: "Local trend deviation",
    detail:
      "Short-interval variance widened beyond the model's confidence band on 4 of the last 7 days.",
    variance: 18,
  },
  {
    id: "sig-4",
    skuId: "sku-bev-y",
    storeId: "s061",
    signal: "Demand spike",
    severity: "high",
    interpretation: "Seasonal uplift",
    detail: "Warm-weather index and weekend demand converged to push volume 16% above plan.",
    variance: 16,
  },
  {
    id: "sig-5",
    skuId: "sku-hom-b",
    storeId: "s203",
    signal: "Forecast drift",
    severity: "opportunity",
    interpretation: "Model self-correction",
    detail: "Forecast bias narrowed to under 2% after the latest retraining cycle.",
    variance: 2,
  },
];

// ---------------------------------------------------------------------------
// Demand anomalies — dedicated dataset for the Demand Anomalies page
// ---------------------------------------------------------------------------

export type AnomalySeverity = "critical" | "high" | "medium";

export interface DemandAnomaly {
  id: string;
  skuId: string;
  storeId: string;
  expectedDemand: number;
  observedDemand: number;
  variance: number;
  severity: AnomalySeverity;
  interpretation: string;
  detail: string;
}

function anomaly(
  id: string,
  skuId: string,
  storeId: string,
  expectedDemand: number,
  variance: number,
  severity: AnomalySeverity,
  interpretation: string,
  detail: string,
): DemandAnomaly {
  return {
    id,
    skuId,
    storeId,
    expectedDemand,
    observedDemand: Math.round(expectedDemand * (1 + variance / 100)),
    variance,
    severity,
    interpretation,
    detail,
  };
}

export const demandAnomalies: DemandAnomaly[] = [
  anomaly(
    "anm-1",
    "sku-bev-x",
    "s142",
    1050,
    18,
    "high",
    "Demand spike",
    "Promotion-driven surge sustained for 6 consecutive days, exceeding the confidence band.",
  ),
  anomaly(
    "anm-2",
    "sku-dai-z",
    "s087",
    620,
    22,
    "critical",
    "Demand spike",
    "Weekend dairy demand breached the upper confidence band for the third consecutive week.",
  ),
  anomaly(
    "anm-3",
    "sku-snk-y",
    "s031",
    890,
    -16,
    "medium",
    "Demand decline",
    "Consumption tracked below baseline following a competing local promotion.",
  ),
  anomaly(
    "anm-4",
    "sku-bev-y",
    "s061",
    740,
    15,
    "high",
    "Seasonal deviation",
    "Warm-weather index and weekend demand converged above the seasonal forecast.",
  ),
  anomaly(
    "anm-5",
    "sku-hom-b",
    "s203",
    410,
    -9,
    "medium",
    "Demand decline",
    "Post-promotion normalisation tracking slightly below the expected decay curve.",
  ),
  anomaly(
    "anm-6",
    "sku-per-c",
    "s512",
    360,
    11,
    "medium",
    "Local demand pattern",
    "New-store catchment effect producing higher-than-modelled early adoption.",
  ),
  anomaly(
    "anm-7",
    "sku-pkg-d",
    "s601",
    480,
    24,
    "critical",
    "Demand spike",
    "Demand exceeded the upper confidence band on 5 of the last 7 days.",
  ),
  anomaly(
    "anm-8",
    "sku-stp-a",
    "s112",
    260,
    -7,
    "medium",
    "Local demand pattern",
    "Slightly below baseline; no material deviation identified.",
  ),
  anomaly(
    "anm-9",
    "sku-snk-e",
    "s519",
    510,
    13,
    "medium",
    "Weekend demand surge",
    "Weekend uplift trending above the model's expected weekend multiplier.",
  ),
  anomaly(
    "anm-10",
    "sku-bev-x",
    "s608",
    690,
    17,
    "high",
    "Demand spike",
    "Promotion window extended; demand has not reverted to baseline as forecast.",
  ),
  anomaly(
    "anm-11",
    "sku-dai-z",
    "s044",
    300,
    -11,
    "medium",
    "Demand decline",
    "Cold-chain disruption reported; demand below forecast for 3 days.",
  ),
  anomaly(
    "anm-12",
    "sku-hom-b",
    "s318",
    330,
    9,
    "medium",
    "Local demand pattern",
    "Regional festival calendar effect producing a mild upside deviation.",
  ),
  anomaly(
    "anm-13",
    "sku-stp-f",
    "s215",
    210,
    -8,
    "medium",
    "Demand decline",
    "Marginally below baseline; within historical seasonal noise.",
  ),
  anomaly(
    "anm-14",
    "sku-snk-y",
    "s405",
    380,
    12,
    "medium",
    "Local demand pattern",
    "New footfall pattern following nearby infrastructure changes.",
  ),
  anomaly(
    "anm-15",
    "sku-per-c",
    "s061",
    240,
    -13,
    "medium",
    "Demand decline",
    "Category substitution effect suspected from a competing local brand launch.",
  ),
  anomaly(
    "anm-16",
    "sku-pkg-d",
    "s142",
    560,
    14,
    "medium",
    "Weekend demand surge",
    "Weekend consumption elevated beyond the confidence band for 2 weeks.",
  ),
  anomaly(
    "anm-17",
    "sku-bev-y",
    "s087",
    470,
    -10,
    "medium",
    "Demand decline",
    "Slight softening following the end of a regional promotion.",
  ),
  anomaly(
    "anm-18",
    "sku-stp-a",
    "s031",
    300,
    8,
    "medium",
    "Local demand pattern",
    "Minor deviation, monitored but not yet actionable.",
  ),
];

// ---------------------------------------------------------------------------
// Forecast accuracy — category, store, SKU and horizon breakdowns
// ---------------------------------------------------------------------------

export const forecastAccuracyByCategory = [
  { category: "Beverages" as Category, accuracy: 94.4, bias: 1.2, mape: 5.4 },
  { category: "Snacks" as Category, accuracy: 92.1, bias: -2.4, mape: 7.6 },
  { category: "Dairy" as Category, accuracy: 86.6, bias: -4.8, mape: 12.8 },
  { category: "Staples" as Category, accuracy: 93.8, bias: 0.6, mape: 5.9 },
  { category: "Personal Care" as Category, accuracy: 90.5, bias: 2.1, mape: 8.9 },
  { category: "Home Care" as Category, accuracy: 91.7, bias: -1.1, mape: 7.8 },
  { category: "Packaged Food" as Category, accuracy: 90.7, bias: 1.6, mape: 8.7 },
];

export const forecastAccuracyByStore = stores.map((s, i) => ({
  storeId: s.id,
  accuracy:
    [88.4, 93.1, 90.2, 91.8, 94.0, 92.6, 90.9, 89.7, 92.4, 93.6, 89.1, 87.8, 94.2, 90.3][i] ?? 90,
  confidence: [82, 90, 85, 87, 92, 88, 84, 83, 89, 91, 84, 79, 93, 86][i] ?? 85,
}));

export const forecastAccuracyBySku = skus.map((s, i) => ({
  skuId: s.id,
  accuracy: [93.6, 90.8, 92.4, 91.0, 86.6, 93.8, 92.9, 90.5, 91.7, 90.7][i] ?? 90,
  confidence: [91, 85, 88, 84, 79, 90, 88, 86, 87, 85][i] ?? 85,
}));

export const forecastAccuracyByHorizon = [
  { horizon: "7D", accuracy: 94.2 },
  { horizon: "14D", accuracy: 91.4 },
  { horizon: "30D", accuracy: 86.8 },
  { horizon: "90D", accuracy: 78.3 },
];

export type BiasBucket = "Under-forecast" | "Balanced" | "Over-forecast";
export function biasBucket(bias: number): BiasBucket {
  if (bias > 1.5) return "Over-forecast";
  if (bias < -1.5) return "Under-forecast";
  return "Balanced";
}

// ---------------------------------------------------------------------------
// Inventory (retained for future phases — not surfaced in the current
// Predictive Demand Intelligence product)
// ---------------------------------------------------------------------------

export interface StockRisk {
  id: string;
  skuId: string;
  storeId: string;
  currentStock: number;
  forecastDemand: number;
  safetyStock: number;
  leadTimeDays: number;
  daysCover: number;
  risk: Severity;
  projectedStockoutDays: number;
  stockoutProbability: number;
  exposureLakh: number;
  sourceStoreId?: string;
  transferQty?: number;
}

export const stockRisks: StockRisk[] = [
  {
    id: "risk-1",
    skuId: "sku-bev-x",
    storeId: "s142",
    currentStock: 340,
    forecastDemand: 580,
    safetyStock: 450,
    leadTimeDays: 3.8,
    daysCover: 2.1,
    risk: "critical",
    projectedStockoutDays: 3.2,
    stockoutProbability: 82,
    exposureLakh: 2.8,
    sourceStoreId: "s087",
    transferQty: 340,
  },
  {
    id: "risk-2",
    skuId: "sku-snk-y",
    storeId: "s031",
    currentStock: 820,
    forecastDemand: 1020,
    safetyStock: 900,
    leadTimeDays: 2.6,
    daysCover: 4.2,
    risk: "high",
    projectedStockoutDays: 5.0,
    stockoutProbability: 61,
    exposureLakh: 1.4,
    sourceStoreId: "s044",
    transferQty: 260,
  },
  {
    id: "risk-3",
    skuId: "sku-dai-z",
    storeId: "s087",
    currentStock: 240,
    forecastDemand: 280,
    safetyStock: 300,
    leadTimeDays: 1.4,
    daysCover: 5.1,
    risk: "medium",
    projectedStockoutDays: 6.4,
    stockoutProbability: 38,
    exposureLakh: 0.7,
    sourceStoreId: "s061",
    transferQty: 120,
  },
  {
    id: "risk-4",
    skuId: "sku-bev-y",
    storeId: "s061",
    currentStock: 510,
    forecastDemand: 760,
    safetyStock: 620,
    leadTimeDays: 3.1,
    daysCover: 3.4,
    risk: "high",
    projectedStockoutDays: 4.1,
    stockoutProbability: 68,
    exposureLakh: 1.9,
    sourceStoreId: "s318",
    transferQty: 300,
  },
  {
    id: "risk-5",
    skuId: "sku-stp-a",
    storeId: "s203",
    currentStock: 1240,
    forecastDemand: 1180,
    safetyStock: 1000,
    leadTimeDays: 5.2,
    daysCover: 8.6,
    risk: "medium",
    projectedStockoutDays: 9.2,
    stockoutProbability: 24,
    exposureLakh: 0.9,
  },
];

export const inventoryHealthDistribution = [
  { state: "Healthy", value: 62, color: "var(--color-positive)" },
  { state: "At Risk", value: 18, color: "var(--color-warning)" },
  { state: "Excess", value: 14, color: "var(--color-accent-blue)" },
  { state: "Critical", value: 6, color: "var(--color-critical)" },
];

export interface ExcessItem {
  id: string;
  skuId: string;
  storeId: string;
  excessUnits: number;
  valueLakh: number;
  daysStatic: number;
  reason: string;
  targetStoreId?: string;
}

export const excessInventory: ExcessItem[] = [
  {
    id: "exc-1",
    skuId: "sku-bev-x",
    storeId: "s087",
    excessUnits: 640,
    valueLakh: 6.3,
    daysStatic: 21,
    reason: "Overstocked store — demand below allocation",
    targetStoreId: "s142",
  },
  {
    id: "exc-2",
    skuId: "sku-snk-y",
    storeId: "s044",
    excessUnits: 480,
    valueLakh: 2.0,
    daysStatic: 17,
    reason: "Slow-moving SKU after promotion end",
    targetStoreId: "s031",
  },
  {
    id: "exc-3",
    skuId: "sku-bev-y",
    storeId: "s318",
    excessUnits: 720,
    valueLakh: 5.3,
    daysStatic: 25,
    reason: "DC push allocation exceeded local demand",
    targetStoreId: "s061",
  },
  {
    id: "exc-4",
    skuId: "sku-hom-b",
    storeId: "s203",
    excessUnits: 310,
    valueLakh: 7.7,
    daysStatic: 32,
    reason: "Category imbalance across region",
    targetStoreId: "s112",
  },
  {
    id: "exc-5",
    skuId: "sku-stp-a",
    storeId: "s112",
    excessUnits: 190,
    valueLakh: 11.8,
    daysStatic: 28,
    reason: "DC excess held at store level",
    targetStoreId: "s044",
  },
];

export type ActionStatus = "pending" | "approved" | "modified" | "rejected";

export interface ReplenishmentItem {
  id: string;
  skuId: string;
  storeId: string;
  recommendedQty: number;
  priority: Severity;
  expectedStockout: string;
  suggestedAction: "Replenish from DC" | "Store transfer" | "Expedite PO";
}

export const replenishmentQueue: ReplenishmentItem[] = [
  {
    id: "rep-1",
    skuId: "sku-bev-x",
    storeId: "s142",
    recommendedQty: 340,
    priority: "critical",
    expectedStockout: "in 3.2 days",
    suggestedAction: "Store transfer",
  },
  {
    id: "rep-2",
    skuId: "sku-bev-y",
    storeId: "s061",
    recommendedQty: 300,
    priority: "high",
    expectedStockout: "in 4.1 days",
    suggestedAction: "Store transfer",
  },
  {
    id: "rep-3",
    skuId: "sku-snk-y",
    storeId: "s031",
    recommendedQty: 260,
    priority: "high",
    expectedStockout: "in 5.0 days",
    suggestedAction: "Replenish from DC",
  },
  {
    id: "rep-4",
    skuId: "sku-dai-z",
    storeId: "s087",
    recommendedQty: 120,
    priority: "medium",
    expectedStockout: "in 6.4 days",
    suggestedAction: "Replenish from DC",
  },
  {
    id: "rep-5",
    skuId: "sku-stp-a",
    storeId: "s203",
    recommendedQty: 400,
    priority: "medium",
    expectedStockout: "in 9.2 days",
    suggestedAction: "Expedite PO",
  },
];

export interface TransferItem {
  id: string;
  skuId: string;
  fromStoreId: string;
  toStoreId: string;
  qty: number;
  priority: Severity;
  impactLakh: number;
  rationale: string;
}

export const transferRecommendations: TransferItem[] = [
  {
    id: "trf-1",
    skuId: "sku-bev-x",
    fromStoreId: "s087",
    toStoreId: "s142",
    qty: 340,
    priority: "critical",
    impactLakh: 2.8,
    rationale: "Nearby excess inventory covers a projected stock-out faster than new procurement.",
  },
  {
    id: "trf-2",
    skuId: "sku-bev-y",
    fromStoreId: "s318",
    toStoreId: "s061",
    qty: 300,
    priority: "high",
    impactLakh: 1.9,
    rationale:
      "Regional imbalance — receiving store has rising demand while source store is static.",
  },
  {
    id: "trf-3",
    skuId: "sku-snk-y",
    fromStoreId: "s044",
    toStoreId: "s031",
    qty: 260,
    priority: "high",
    impactLakh: 1.1,
    rationale: "Post-promotion excess redeployed to a store below safety stock.",
  },
  {
    id: "trf-4",
    skuId: "sku-hom-b",
    fromStoreId: "s203",
    toStoreId: "s112",
    qty: 180,
    priority: "medium",
    impactLakh: 0.8,
    rationale: "Category rebalancing reduces holding cost with no service-level loss.",
  },
];

// ---------------------------------------------------------------------------
// Procurement (retained for future phases — not surfaced in the current
// Predictive Demand Intelligence product)
// ---------------------------------------------------------------------------

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  supplierId: string;
  skuId: string;
  qty: number;
  valueLakh: number;
  status: "Open" | "In Transit" | "Delayed" | "Received";
  expected: string;
  risk: Severity;
}

export const purchaseOrders: PurchaseOrder[] = [
  {
    id: "po-1",
    poNumber: "PO-48210",
    supplierId: "sup-a",
    skuId: "sku-bev-x",
    qty: 42000,
    valueLakh: 41.2,
    status: "In Transit",
    expected: "2026-08-21",
    risk: "opportunity",
  },
  {
    id: "po-2",
    poNumber: "PO-48244",
    supplierId: "sup-b",
    skuId: "sku-bev-y",
    qty: 28000,
    valueLakh: 20.7,
    status: "Delayed",
    expected: "2026-08-19",
    risk: "critical",
  },
  {
    id: "po-3",
    poNumber: "PO-48261",
    supplierId: "sup-c",
    skuId: "sku-snk-y",
    qty: 60000,
    valueLakh: 25.2,
    status: "Open",
    expected: "2026-08-26",
    risk: "medium",
  },
  {
    id: "po-4",
    poNumber: "PO-48277",
    supplierId: "sup-d",
    skuId: "sku-stp-a",
    qty: 9000,
    valueLakh: 55.8,
    status: "Open",
    expected: "2026-08-29",
    risk: "opportunity",
  },
  {
    id: "po-5",
    poNumber: "PO-48288",
    supplierId: "sup-b",
    skuId: "sku-dai-z",
    qty: 36000,
    valueLakh: 23.8,
    status: "Delayed",
    expected: "2026-08-20",
    risk: "high",
  },
  {
    id: "po-6",
    poNumber: "PO-48301",
    supplierId: "sup-c",
    skuId: "sku-hom-b",
    qty: 12000,
    valueLakh: 29.9,
    status: "Received",
    expected: "2026-08-14",
    risk: "opportunity",
  },
];

export interface PriceRow {
  skuId: string;
  quotes: { supplierId: string; price: number }[];
  benchmark: number;
  insight: string;
  savingsLakh: number;
}

export const priceIntelligence: PriceRow[] = [
  {
    skuId: "sku-bev-x",
    quotes: [
      { supplierId: "sup-a", price: 98 },
      { supplierId: "sup-b", price: 104 },
      { supplierId: "sup-c", price: 96 },
    ],
    benchmark: 97,
    insight: "Supplier B is above the current competitive benchmark by 7.2%.",
    savingsLakh: 4.2,
  },
  {
    skuId: "sku-dai-z",
    quotes: [
      { supplierId: "sup-b", price: 66 },
      { supplierId: "sup-c", price: 63 },
      { supplierId: "sup-d", price: 64 },
    ],
    benchmark: 63.5,
    insight: "Contract deviation detected against agreed slab pricing.",
    savingsLakh: 2.8,
  },
  {
    skuId: "sku-snk-y",
    quotes: [
      { supplierId: "sup-c", price: 42 },
      { supplierId: "sup-a", price: 40 },
      { supplierId: "sup-d", price: 41 },
    ],
    benchmark: 40.5,
    insight: "Consolidating volume with Supplier A unlocks a lower slab.",
    savingsLakh: 3.6,
  },
  {
    skuId: "sku-hom-b",
    quotes: [
      { supplierId: "sup-c", price: 249 },
      { supplierId: "sup-b", price: 241 },
      { supplierId: "sup-d", price: 246 },
    ],
    benchmark: 243,
    insight: "Price increase of 3.1% recorded versus last quarter without contract change.",
    savingsLakh: 7.2,
  },
];

export const savingsBreakdown = [
  {
    id: "sav-1",
    lever: "Price Negotiation",
    valueLakh: 7.2,
    detail: "4 supplier-SKU combinations priced above competitive benchmark.",
    skuIds: ["sku-hom-b", "sku-bev-x"],
  },
  {
    id: "sav-2",
    lever: "Supplier Optimization",
    valueLakh: 4.8,
    detail: "Shift 18% of Supplier B volume toward higher-performing suppliers.",
    skuIds: ["sku-bev-y", "sku-dai-z"],
  },
  {
    id: "sav-3",
    lever: "Volume Consolidation",
    valueLakh: 3.6,
    detail: "Consolidate snack volume with Supplier A to reach the next price slab.",
    skuIds: ["sku-snk-y"],
  },
  {
    id: "sav-4",
    lever: "Contract Variance",
    valueLakh: 2.8,
    detail: "Recover deviations against agreed dairy contract slabs.",
    skuIds: ["sku-dai-z"],
  },
];

export const rfqStages = [
  {
    key: "requirement",
    label: "Requirement",
    detail: "100,000 units of Beverage X for next month",
  },
  {
    key: "analysis",
    label: "AI Sourcing Analysis",
    detail: "Historical price, delivery and quality evaluated across 4 suppliers",
  },
  { key: "shortlist", label: "Supplier Shortlist", detail: "Supplier A, Supplier C, Supplier B" },
  {
    key: "rfq",
    label: "RFQ Issued",
    detail: "Evaluation criteria: price, delivery, quality, historical performance",
  },
  { key: "responses", label: "Supplier Responses", detail: "3 of 3 responses received" },
  {
    key: "comparison",
    label: "AI Comparison",
    detail: "Weighted scoring across price and reliability",
  },
  {
    key: "recommendation",
    label: "Recommendation",
    detail: "Award 65% to Supplier A, 35% to Supplier C",
  },
  { key: "decision", label: "Decision", detail: "Awaiting procurement approval" },
];

export const rfqResponses = [
  { supplierId: "sup-a", price: 98, deliveryDays: 26, quality: 94, score: 94 },
  { supplierId: "sup-c", price: 96, deliveryDays: 30, quality: 96, score: 92 },
  { supplierId: "sup-b", price: 104, deliveryDays: 34, quality: 91, score: 81 },
];

// ---------------------------------------------------------------------------
// AI layer — recommendations/alerts retained for future phases; demand-scoped
// notifications, activity and audit below are what the current product surfaces.
// ---------------------------------------------------------------------------

export interface Recommendation {
  id: string;
  domain: "Inventory" | "Demand" | "Procurement";
  severity: Severity;
  title: string;
  reason: string;
  evidence: string[];
  impact: string;
  confidence: number;
  action: string;
  link: string;
}

export const recommendations: Recommendation[] = [
  {
    id: "rec-1",
    domain: "Inventory",
    severity: "critical",
    title: "Transfer 340 units of Beverage X from Store #087 to Store #142",
    reason:
      "Projected stock-out within 3.2 days with insufficient safety stock at the receiving store.",
    evidence: [
      "Forecast demand 580 units vs 340 on hand",
      "Safety stock shortfall of 110 units",
      "Store #087 holds 640 units of excess",
      "Transfer lead time 0.8 days vs 3.8 days procurement",
    ],
    impact: "₹2.8L potential lost sales avoided",
    confidence: 91,
    action: "Approve transfer",
    link: "/inventory/transfers",
  },
  {
    id: "rec-2",
    domain: "Procurement",
    severity: "high",
    title: "Review Supplier B allocation for time-sensitive beverage SKUs",
    reason: "Delivery performance declined to 78% while two POs are already delayed.",
    evidence: [
      "2 delayed purchase orders this week",
      "Lead-time variance up 2.4 days",
      "Supplier A and C fill rates above 93%",
    ],
    impact: "₹4.2L potential savings and reduced delivery risk",
    confidence: 88,
    action: "Simulate supplier shift",
    link: "/procurement/suppliers",
  },
  {
    id: "rec-3",
    domain: "Demand",
    severity: "medium",
    title: "Raise Mumbai beverage forecast by 14% for the next 14 days",
    reason: "Promotion uplift and warm-weather seasonality are compounding above baseline.",
    evidence: ["Promotion impact +11%", "Recent trend +7%", "Seasonality +5%"],
    impact: "Improves forecast accuracy by an estimated 2.1 points",
    confidence: 86,
    action: "Apply forecast adjustment",
    link: "/demand/forecast-explorer",
  },
  {
    id: "rec-4",
    domain: "Procurement",
    severity: "opportunity",
    title: "Consolidate snack volume with Supplier A",
    reason: "Combined volume crosses the next contracted price slab.",
    evidence: [
      "Current split across 3 suppliers",
      "Slab threshold 55,000 units",
      "Projected volume 61,000 units",
    ],
    impact: "₹3.6L annualised savings",
    confidence: 84,
    action: "Explore savings",
    link: "/procurement/savings",
  },
  {
    id: "rec-5",
    domain: "Inventory",
    severity: "medium",
    title: "Redeploy Home Care excess from Store #203 to Store #112",
    reason: "Static stock for 32 days against steady demand in a neighbouring store.",
    evidence: ["310 units excess", "₹7.7L held value", "Receiving store cover at 6 days"],
    impact: "₹0.8L holding cost reduction",
    confidence: 79,
    action: "Create transfer",
    link: "/inventory/excess",
  },
];

export interface Alert {
  id: string;
  severity: Severity;
  title: string;
  what: string;
  why: string;
  evidence: string[];
  action: string;
  impact: string;
  link: string;
  time: string;
}

export const alerts: Alert[] = [
  {
    id: "alr-1",
    severity: "critical",
    title: "Critical inventory risk — Store #142",
    what: "Beverage X cover fell to 2.1 days against a rising forecast.",
    why: "A stock-out during an active promotion converts directly into lost sales and substitution.",
    evidence: ["Cover 2.1 days", "Stock-out probability 82%", "Promotion active for 6 more days"],
    action: "Approve the recommended inter-store transfer.",
    impact: "₹2.8L lost sales avoided",
    link: "/inventory/stock-risk",
    time: "09:42",
  },
  {
    id: "alr-2",
    severity: "high",
    title: "Supplier delivery deterioration — Supplier B",
    what: "On-time delivery dropped to 78% across the last 6 weeks.",
    why: "Beverage and dairy replenishment depends on this supplier for 24% of volume.",
    evidence: ["2 delayed POs", "Fill rate 86%", "Lead-time variance +2.4 days"],
    action: "Review allocation and diversify time-sensitive volume.",
    impact: "Reduced delivery risk on 14 SKUs",
    link: "/procurement/suppliers",
    time: "09:31",
  },
  {
    id: "alr-3",
    severity: "medium",
    title: "Forecast anomaly — Beverages, Mumbai",
    what: "Actuals exceeded the upper confidence band on 4 of 7 days.",
    why: "Sustained deviation indicates the model is under-reading promotional response.",
    evidence: ["Variance +18%", "Confidence band breached 4 days", "3 stores affected"],
    action: "Investigate demand signal and apply adjustment.",
    impact: "Forecast accuracy protection",
    link: "/demand/drivers",
    time: "09:12",
  },
  {
    id: "alr-4",
    severity: "opportunity",
    title: "Savings opportunity — ₹4.2L",
    what: "Price variance detected across beverage supplier quotes.",
    why: "Supplier B pricing sits 7.2% above the competitive benchmark.",
    evidence: ["Supplier A ₹98", "Supplier B ₹104", "Supplier C ₹96"],
    action: "Open a negotiation cycle or reallocate volume.",
    impact: "₹4.2L potential savings",
    link: "/procurement/pricing",
    time: "08:55",
  },
];

/** Demand-only notifications surfaced in the header bell for this product phase. */
export const demandNotifications: Alert[] = [
  {
    id: "dn-1",
    severity: "high",
    title: "Forecast anomaly detected — Beverage X, Mumbai #142",
    what: "Observed demand is running 18% above the expected baseline.",
    why: "Sustained deviation beyond the confidence band affects downstream planning accuracy.",
    evidence: [
      "Observed 1,239 units vs expected 1,050",
      "Variance +18%",
      "Confidence band breached 4 days",
    ],
    action: "Review the anomaly and add to planning review.",
    impact: "Protects forecast reliability for Beverages",
    link: "/demand/anomalies",
    time: "09:42",
  },
  {
    id: "dn-2",
    severity: "medium",
    title: "Low forecast confidence — Dairy category, selected stores",
    what: "Confidence has fallen below 82% for 3 dairy SKU-store combinations.",
    why: "Recently promoted and short-shelf-life SKUs carry higher forecast uncertainty.",
    evidence: ["Dairy accuracy 86.6%", "MAPE 12.8%", "Bias -4.8%"],
    action: "Review accuracy by category before relying on this forecast.",
    impact: "Reduces planning risk on perishables",
    link: "/demand/accuracy",
    time: "09:20",
  },
  {
    id: "dn-3",
    severity: "high",
    title: "Demand surge detected — Beverage category",
    what: "Beverage demand is trending 14% above the historical baseline in Mumbai.",
    why: "Promotion and seasonal signals are compounding above the modelled baseline.",
    evidence: ["Promotion impact +11%", "Recent trend +7%", "Seasonality +5%"],
    action: "Review demand drivers for the affected region.",
    impact: "Improves forecast accuracy by an estimated 2.1 points",
    link: "/demand/drivers",
    time: "09:05",
  },
  {
    id: "dn-4",
    severity: "opportunity",
    title: "Forecast accuracy improved by 3.8%",
    what: "Weighted forecast accuracy rose to 91.4% after the latest retraining cycle.",
    why: "Model retraining incorporated the most recent promotional and seasonal observations.",
    evidence: ["Accuracy 87.6% → 91.4%", "MAPE improved to 6.2%"],
    action: "No action required — informational.",
    impact: "Higher-confidence forecasts across the portfolio",
    link: "/demand/accuracy",
    time: "08:48",
  },
];

export const aiActivity = [
  {
    time: "09:42",
    user: "Ananya Sharma",
    capability: "Demand Forecast",
    action: "Generated a 14-day forecast for Beverages — Mumbai",
    status: "Completed",
  },
  {
    time: "09:38",
    user: "Rahul Mehta",
    capability: "Forecast Explanation",
    action: "Explained the forecast for Beverage X at Store #142",
    status: "Completed",
  },
  {
    time: "09:31",
    user: "Ananya Sharma",
    capability: "Demand Scenario",
    action: "Modelled a +10% demand uplift scenario",
    status: "Completed",
  },
  {
    time: "09:18",
    user: "Rahul Mehta",
    capability: "Anomaly Detection",
    action: "Scanned 10 SKUs across 14 stores for demand anomalies",
    status: "Completed",
  },
  {
    time: "09:05",
    user: "System",
    capability: "Forecast Accuracy Refresh",
    action: "Recomputed accuracy, bias and MAPE across all categories",
    status: "Completed",
  },
  {
    time: "08:52",
    user: "Rahul Mehta",
    capability: "Demand Driver Analysis",
    action: "Decomposed driver contribution for the Beverages category",
    status: "Completed",
  },
];

export const auditTrail = [
  {
    id: "aud-1",
    time: "2026-08-18 09:44",
    user: "Rahul Mehta",
    recommendation: "Raise Mumbai beverage forecast by 14% for the next 14 days",
    evidence: "Promotion +11%, trend +7%, seasonality +5%",
    decision: "Approved",
    outcome: "Forecast published",
  },
  {
    id: "aud-2",
    time: "2026-08-18 09:20",
    user: "Ananya Sharma",
    recommendation: "Reviewed demand scenario — +10% uplift",
    evidence: "Baseline 2.84M units → Scenario 3.12M units",
    decision: "Approved",
    outcome: "Scenario saved to planning review",
  },
  {
    id: "aud-3",
    time: "2026-08-17 17:02",
    user: "Rahul Mehta",
    recommendation: "Flagged anomaly — Beverage X, Mumbai #142",
    evidence: "Variance +18%, confidence band breached 4 days",
    decision: "Added to planning review",
    outcome: "Monitoring",
  },
  {
    id: "aud-4",
    time: "2026-08-17 15:36",
    user: "Ananya Sharma",
    recommendation: "Reviewed forecast bias for the Dairy category",
    evidence: "Bias -4.8%, MAPE 12.8%",
    decision: "Deferred",
    outcome: "Revisit next retraining cycle",
  },
];

export const dataSources = [
  {
    name: "POS Transactions",
    system: "Point of Sale",
    records: "128.4M",
    freshness: "09:42",
    status: "Connected",
    note: "Store-level basket and off-take data — the primary demand signal",
  },
  {
    name: "ERP Master",
    system: "ERP",
    records: "2.1M",
    freshness: "09:30",
    status: "Connected",
    note: "Item, store and calendar master data",
  },
  {
    name: "Promotion Calendar",
    system: "Trade Promotion",
    records: "36K",
    freshness: "09:05",
    status: "Connected",
    note: "Planned and live promotional events used as a forecast signal",
  },
  {
    name: "Weather & Seasonality Index",
    system: "External Feed",
    records: "18K",
    freshness: "08:50",
    status: "Connected",
    note: "Regional weather and seasonal indices",
  },
  {
    name: "Store & Calendar Master",
    system: "Store Operations",
    records: "14K",
    freshness: "09:15",
    status: "Connected",
    note: "Store catchment, footfall and calendar-effect reference data",
  },
];

// helpers -------------------------------------------------------------------

export const skuById = (id: string) => skus.find((s) => s.id === id)!;
export const storeById = (id: string) => stores.find((s) => s.id === id)!;
export const supplierById = (id: string) => suppliers.find((s) => s.id === id)!;
export const inr = (v: number) => `₹${v.toLocaleString("en-IN")}`;

/** This phase surfaces Predictive Demand Intelligence only, for every role. */
const demandScopedPaths = [
  "/overview",
  "/demand",
  "/demand/forecast-explorer",
  "/demand/stores",
  "/demand/skus",
  "/demand/accuracy",
  "/demand/drivers",
  "/demand/anomalies",
  "/ai/insights",
  "/ai/assistant",
  "/ai/scenario",
  "/governance/data-sources",
  "/governance/ai-activity",
  "/governance/audit",
];

export const roleAccess: Record<RoleId, string[]> = {
  supply_chain_head: demandScopedPaths,
  demand_planner: demandScopedPaths,
  inventory_manager: demandScopedPaths,
  procurement_manager: demandScopedPaths,
};

export const canAccess = (role: RoleId, path: string) => roleAccess[role].includes(path);
