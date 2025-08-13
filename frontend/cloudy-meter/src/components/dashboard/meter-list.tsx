import { cn } from "@/lib/utils";
import { Meter } from "@/types/meter";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { StatusBadge } from "./status-badge";

export function MeterList({
  items,
  selectedId,
  onSelect,
}: {
  items: Meter[];
  selectedId?: string;
  onSelect: (id: string) => void;
}) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Meters</CardTitle>
        <CardDescription>Select a meter to view sensors</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[60vh] pr-2">
          <div className="flex flex-col gap-2">
            {items.map((m) => (
              <button
                key={m.id}
                onClick={() => onSelect(m.id)}
                className={cn(
                  "w-full text-left rounded-xl p-3 border transition hover:bg-primary-50",
                  selectedId === m.id
                    ? "border-primary-500 bg-primary-50"
                    : "border-neutral-200"
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="font-medium">{m.name}</div>
                  <StatusBadge status={m.status} />
                </div>
                <div className="mt-1 text-xs text-neutral-500">ID: {m.id}</div>
                <div className="mt-1 h-2 w-full rounded bg-neutral-200">
                  <div
                    className="h-2 rounded bg-secondary-500"
                    style={{ width: `${m.battery}%` }}
                    aria-label={`Battery ${m.battery}%`}
                  />
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
