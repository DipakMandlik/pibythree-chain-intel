import {
  LayoutDashboard, TrendingUp, Compass, Store, Package, Target, Waypoints,
  Boxes, AlertTriangle, Layers, Network, RefreshCw, ArrowLeftRight,
  ShoppingCart, Building2, FileText, ClipboardList, IndianRupee, PiggyBank,
  Sparkles, BellRing, FlaskConical, MessageSquareText, Database, Activity, ScrollText,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
}
export interface NavGroup {
  label: string;
  items: NavItem[];
}

export const navGroups: NavGroup[] = [
  {
    label: "Primary",
    items: [{ to: "/overview", label: "Executive Overview", icon: LayoutDashboard }],
  },
  {
    label: "Demand Intelligence",
    items: [
      { to: "/demand", label: "Demand Overview", icon: TrendingUp },
      { to: "/demand/forecast-explorer", label: "Forecast Explorer", icon: Compass },
      { to: "/demand/stores", label: "Store Demand", icon: Store },
      { to: "/demand/skus", label: "SKU Demand", icon: Package },
      { to: "/demand/accuracy", label: "Forecast Accuracy", icon: Target },
      { to: "/demand/drivers", label: "Demand Drivers", icon: Waypoints },
    ],
  },
  {
    label: "Inventory Intelligence",
    items: [
      { to: "/inventory", label: "Inventory Overview", icon: Boxes },
      { to: "/inventory/stock-risk", label: "Stock Risk", icon: AlertTriangle },
      { to: "/inventory/excess", label: "Excess Inventory", icon: Layers },
      { to: "/inventory/balance", label: "Store / DC Balance", icon: Network },
      { to: "/inventory/replenishment", label: "Replenishment", icon: RefreshCw },
      { to: "/inventory/transfers", label: "Transfer Recommendations", icon: ArrowLeftRight },
    ],
  },
  {
    label: "Procurement Intelligence",
    items: [
      { to: "/procurement", label: "Procurement Overview", icon: ShoppingCart },
      { to: "/procurement/suppliers", label: "Supplier Intelligence", icon: Building2 },
      { to: "/procurement/purchase-orders", label: "Purchase Orders", icon: FileText },
      { to: "/procurement/rfq", label: "RFQ Intelligence", icon: ClipboardList },
      { to: "/procurement/pricing", label: "Price Intelligence", icon: IndianRupee },
      { to: "/procurement/savings", label: "Savings Opportunities", icon: PiggyBank },
    ],
  },
  {
    label: "AI Decision Center",
    items: [
      { to: "/ai/recommendations", label: "Recommendations", icon: Sparkles },
      { to: "/ai/alerts", label: "Alerts", icon: BellRing },
      { to: "/ai/simulator", label: "Scenario Simulator", icon: FlaskConical },
      { to: "/ai/assistant", label: "Ask Supply Chain AI", icon: MessageSquareText },
    ],
  },
  {
    label: "Governance",
    items: [
      { to: "/governance/data-sources", label: "Data Sources", icon: Database },
      { to: "/governance/ai-activity", label: "AI Activity", icon: Activity },
      { to: "/governance/audit", label: "Audit Trail", icon: ScrollText },
    ],
  },
];

export const pageTitles: Record<string, string> = Object.fromEntries(
  navGroups.flatMap((g) => g.items.map((i) => [i.to, i.label])),
);
