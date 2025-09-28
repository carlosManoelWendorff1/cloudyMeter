import { cn } from "@/lib/utils";
import { Meter } from "@/types/meter";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
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
  console.log(items);

  return (
    <Card className="h-full flex flex-col shadow-none border-none border-neutral-200">
      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-full">
          <div className="flex flex-col divide-y divide-neutral-200">
            {items.map((m) => (
              <button
                key={m.id}
                onClick={() => onSelect(m.id)}
                className={cn(
                  "w-full text-left p-4 transition-colors rounded-none flex flex-col hover:bg-primary-50",
                  selectedId === m.id
                    ? "bg-primary-100 border-l-4 border-primary-500 border-b-0 border-t-0 border-r-0"
                    : ""
                )}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-primary">{m.name}</span>
                  <StatusBadge status={m.status} />
                </div>
                <span className="text-xs text-neutral-500">ID: {m.id}</span>
              </button>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
