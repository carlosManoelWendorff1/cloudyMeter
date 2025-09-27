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
import { useRouter, usePathname } from "next/navigation";

export function SensorGrid({ sensors }: { sensors: Sensor[] }) {
  const router = useRouter();
  const pathName = usePathname();
  const selectedSensorId = pathName?.split("/")[3] || "";

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 min-h-screen">
      {sensors.map((s, index) => (
        <Card
          key={s.id}
          className={cn(
            selectedSensorId === s.id && "ring-2 ring-primary-500",
            "h-full flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl",
            index === 0 || index === 1
              ? "lg:col-span-3 md:col-span-2 sm:col-span-1"
              : "xl:col-span-2 lg:col-span-3 md:col-span-2 sm:col-span-1"
          )}
        >
          {/* Cabeçalho */}
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center justify-between">
              <span>{s.name}</span>
              <Badge variant="outline">{s.type}</Badge>
            </CardTitle>
            <CardDescription>ID: {s.id}</CardDescription>
          </CardHeader>

          {/* Alertas no topo */}
          <div className="flex items-center justify-between px-4">
            <ThresholdAlertDialog sensorId={s.id} />
            <AlertsPopover sensorId={s.id} />
          </div>

          <CardContent className="pt-3 flex-1 flex flex-col justify-between">
            {/* Informações do sensor */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between text-sm text-neutral-600">
                <span>Unidade de Medida</span>
                <span className="font-medium">{s.unit}</span>
              </div>

              <Separator />
            </div>

            {/* Botão no final */}
            <Button
              className="w-full mt-4"
              variant="default"
              onClick={() => router.push(`/dashboard/readings/${s.id}`)}
            >
              View readings
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
