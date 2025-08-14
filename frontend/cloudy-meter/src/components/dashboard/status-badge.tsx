import { Meter } from "@/types/meter";
import { Badge } from "../ui/badge";

export function StatusBadge({ status }: { status: Meter["status"] }) {
  const map: Record<
    Meter["status"],
    {
      label: string;
      variant: "primary" | "secondary" | "error" | "neutral";
    }
  > = {
    online: { label: "Online", variant: "primary" },
    offline: { label: "Offline", variant: "error" },
    maintenance: { label: "Maintenance", variant: "neutral" },
  };
  const cfg = map[status];
  return <Badge variant={cfg.variant}>{cfg.label}</Badge>;
}
