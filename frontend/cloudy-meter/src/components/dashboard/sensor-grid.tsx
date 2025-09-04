import { Sensor } from "@/types/sensor";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export function SensorGrid({
  sensors,
  onSelect,
  selectedId,
}: {
  sensors: Sensor[];
  onSelect: (id: Sensor) => void;
  selectedId?: string;
}) {
  if (!sensors.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No sensors</CardTitle>
          <CardDescription>Select a meter to view sensors</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {sensors.map((s) => (
        <Card
          key={s.id}
          className={cn(selectedId === s.id && "ring-2 ring-primary-500")}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center justify-between">
              <span>{s.name}</span>
              <Badge variant="outline">{s.type}</Badge>
            </CardTitle>
            <CardDescription>ID: {s.id}</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center justify-between text-sm text-neutral-600">
              <span>Unidade de Medida</span>
              <span className="font-medium">{s.unit}</span>
            </div>
            <Separator className="my-3" />
            <Button
              className="w-full"
              variant="default"
              onClick={() => onSelect(s)}
            >
              View readings
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
