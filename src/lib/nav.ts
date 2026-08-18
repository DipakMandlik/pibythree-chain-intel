import {
  LayoutDashboard,
  Compass,
  Store,
  Package,
  Target,
  Waypoints,
  AlertTriangle,
  Sparkles,
  MessageSquareText,
  FlaskConical,
  Database,
  Activity,
  ScrollText,
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
    items: [{ to: "/overview", label: "Demand Overview", icon: LayoutDashboard }],
  },
  {
    label: "Demand Intelligence",
    items: [
      { to: "/demand/forecast-explorer", label: "Forecast Explorer", icon: Compass },
      { to: "/demand/stores", label: "Store Demand", icon: Store },
      { to: "/demand/skus", label: "SKU Demand", icon: Package },
      { to: "/demand/accuracy", label: "Forecast Accuracy", icon: Target },
      { to: "/demand/drivers", label: "Demand Drivers", icon: Waypoints },
      { to: "/demand/anomalies", label: "Demand Anomalies", icon: AlertTriangle },
    ],
  },
  {
    label: "AI Intelligence",
    items: [
      { to: "/ai/insights", label: "AI Demand Insights", icon: Sparkles },
      { to: "/ai/assistant", label: "Ask Demand AI", icon: MessageSquareText },
      { to: "/ai/scenario", label: "Scenario Analysis", icon: FlaskConical },
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
