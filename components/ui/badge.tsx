import { labelize } from "@/lib/format";

type BadgeTone = "neutral" | "success" | "warning" | "error" | "info";

const statusTones: Record<string, BadgeTone> = {
  occupied: "success", vacant: "neutral", confirmed: "info", active: "success", completed: "neutral", cancelled: "error",
  open: "warning", in_progress: "info", resolved: "success", low: "neutral", medium: "warning", high: "warning", critical: "error",
};

export function Badge({ value, tone }: { value: string; tone?: BadgeTone }) {
  const resolvedTone = tone ?? statusTones[value] ?? "neutral";
  return <span className={`badge badge-${resolvedTone}`}><span className="badge-dot" />{labelize(value)}</span>;
}
