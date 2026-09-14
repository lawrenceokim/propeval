import Link from "next/link";
import type { ReactNode } from "react";

export interface FilterOption { label: string; value: string }
export interface FilterField { name: string; label: string; value?: string; options: FilterOption[] }

export function FilterBar({ fields, clearHref, result, pending = false }: { fields: FilterField[]; clearHref: string; result: ReactNode; pending?: boolean }) {
  return <div className="filter-panel"><form className="filter-form" method="get">{fields.map((field) => <label key={field.name} className="field-label"><span>{field.label}</span><select name={field.name} defaultValue={field.value ?? ""} disabled={pending}><option value="">All {field.label.toLowerCase()}</option>{field.options.map((option) => <option value={option.value} key={option.value}>{option.label}</option>)}</select></label>)}<button className="button button-secondary" type="submit" disabled={pending}>Apply filters</button><Link className="button button-text" href={clearHref}>Clear</Link></form><p className="filter-count">{result}</p></div>;
}
