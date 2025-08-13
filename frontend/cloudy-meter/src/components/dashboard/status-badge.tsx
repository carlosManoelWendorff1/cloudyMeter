import { Meter } from "@/types/meter";
import { Badge } from "../ui/badge";

export function StatusBadge({ status }: { status: Meter["status"] }) {
  const map: Record<
    Meter["status"],
    {
      label: string;
      variant: "default" | "secondary" | "destructive" | "outline";
    }
  > = {
    online: { label: "Online", variant: "default" },
    offline: { label: "Offline", variant: "destructive" },
    maintenance: { label: "Maintenance", variant: "secondary" },
  };
  const cfg = map[status];
  return <Badge variant={cfg.variant}>{cfg.label}</Badge>;
}
