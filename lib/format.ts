const currencyByCity: Record<string, string> = { London: "GBP", Paris: "EUR", Lisbon: "EUR", Algiers: "DZD" };

export function formatCurrency(value: number, city: string): string {
  return new Intl.NumberFormat("en-GB", { style: "currency", currency: currencyByCity[city] ?? "EUR", maximumFractionDigits: 0 }).format(value);
}

export function formatDate(value: string): string {
  return new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(`${value.slice(0, 10)}T00:00:00Z`));
}

export function formatShortDate(value: string): string {
  return new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", timeZone: "UTC" }).format(new Date(`${value.slice(0, 10)}T00:00:00Z`));
}

export function labelize(value: string): string {
  return value.replaceAll("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}
