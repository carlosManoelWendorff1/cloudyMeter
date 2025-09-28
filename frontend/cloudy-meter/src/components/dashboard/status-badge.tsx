import { Meter } from "@/types/meter";
import { Badge } from "../ui/badge";
import { MeterStatus } from "@/types/enums/MeterStatus";

export function StatusBadge({ status }: { status: string }) {
  const getVariant = (status: string) => {
    switch (status) {
      case "PROVISIONED":
        return "neutral";
      case "ACTIVE":
        return "primary";
      case "INACTIVE":
        return "error";
      case "UNKNOWN":
        return "secondary";
    }
  };
  console.log(getVariant(status));
  return <Badge variant={getVariant(status)}>{status}</Badge>;
}
