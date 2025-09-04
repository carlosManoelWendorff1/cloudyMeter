import { Meter } from "@/types/meter";
import { Badge } from "../ui/badge";
import { MeterStatus } from "@/types/enums/MeterStatus";

export function StatusBadge({ status }: { status: Meter["status"] }) {
  const getVariant = (status: MeterStatus) => {
    switch (status) {
      case MeterStatus.PROVISIONED:
        return "neutral";
      case MeterStatus.ACTIVE:
        return "primary";
      case MeterStatus.INACTIVE:
        return "error";
      case MeterStatus.UNKNOWN:
        return "secondary";
    }
  };
  return <Badge variant={getVariant(status)}>{status}</Badge>;
}
