import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

export interface FilterState {
  region: string;
  store: string;
  category: string;
  sku: string;
  dateRange: string;
  horizon: string;
}

export const defaultFilters: FilterState = {
  region: "all",
  store: "all",
  category: "all",
  sku: "all",
  dateRange: "30",
  horizon: "14",
};

function Field({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="flex min-w-[9.5rem] flex-1 flex-col gap-1">
      <span className="label-eyebrow">{label}</span>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="h-9 bg-card text-sm">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((o) => (
            <SelectItem key={o.value} value={o.value}>
              {o.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </label>
  );
}

export function FilterBar({
  value,
  onChange,
  storeOptions,
  categoryOptions,
  skuOptions,
  regionOptions,
  showHorizon = true,
  showDateRange = true,
}: {
  value: FilterState;
  onChange: (v: FilterState) => void;
  regionOptions: { value: string; label: string }[];
  storeOptions: { value: string; label: string }[];
  categoryOptions: { value: string; label: string }[];
  skuOptions: { value: string; label: string }[];
  showHorizon?: boolean;
  showDateRange?: boolean;
}) {
  const set = (k: keyof FilterState) => (v: string) => onChange({ ...value, [k]: v });
  return (
    <div className="panel flex flex-wrap items-end gap-3 p-3">
      <Field label="Region" value={value.region} onChange={set("region")} options={regionOptions} />
      <Field label="Store" value={value.store} onChange={set("store")} options={storeOptions} />
      <Field
        label="Category"
        value={value.category}
        onChange={set("category")}
        options={categoryOptions}
      />
      <Field label="SKU" value={value.sku} onChange={set("sku")} options={skuOptions} />
      {showDateRange && (
        <Field
          label="Date range"
          value={value.dateRange}
          onChange={set("dateRange")}
          options={[
            { value: "7", label: "Last 7 days" },
            { value: "30", label: "Last 30 days" },
            { value: "90", label: "Last 90 days" },
          ]}
        />
      )}
      {showHorizon && (
        <Field
          label="Forecast horizon"
          value={value.horizon}
          onChange={set("horizon")}
          options={[
            { value: "7", label: "7 days" },
            { value: "14", label: "14 days" },
            { value: "30", label: "30 days" },
            { value: "90", label: "90 days" },
          ]}
        />
      )}
      <Button variant="ghost" size="sm" className="h-9" onClick={() => onChange(defaultFilters)}>
        <RotateCcw className="size-3.5" /> Reset
      </Button>
    </div>
  );
}
