"use client";

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
import { ThresholdAlertDialog } from "../alerts/TreshholdAlertDialog";
import AlertsPopover from "../alerts/AlertsPopover";

export function SensorGrid({
  sensors,
  onSelect,
  selectedId,
}: {
  sensors: Sensor[];
  onSelect: (id: Sensor) => void;
  selectedId?: string;
}) {
  return (
    <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-1  md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
      {sensors.map((s) => {
        return (
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

            <CardContent className="pt-0 space-y-3">
              <div className="flex items-center justify-between text-sm text-neutral-600">
                <span>Unidade de Medida</span>
                <span className="font-medium">{s.unit}</span>
              </div>

              <Separator />

              <div className="flex items-center justify-between gap-2">
                <ThresholdAlertDialog sensorId={s.id} />
                <AlertsPopover sensorId={s.id} />
              </div>

              <Button
                className="w-full"
                variant="default"
                onClick={() => onSelect(s)}
              >
                View readings
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
