"use client";
import { Sensor } from "@/types/sensor";
import { ReadingsGrid } from "./readings-grid";
import { SensorChart } from "./sensor-chart";
import { Reading } from "@/types/reading";
import { usePolling } from "@/hooks/use-polling";
import LoadingDashPage from "@/app/dashboard/readings/[sensor]/loading";

export function SensorDashboard({
  sensor,
  initialReadings,
}: {
  sensor: Sensor;
  initialReadings?: Reading[];
}) {
  const { data: readings, loading } = usePolling<Reading[]>(
    `/readings/sensor/${sensor.id}`,
    60000,
    initialReadings
  );

  if (!readings) return <LoadingDashPage />;

  return (
    <div className="p-4 h-full gap-4 grid">
      <SensorChart
        title={`${sensor.id} (${sensor.type})`}
        unit={sensor.unit}
        readings={readings}
        minThreshold={sensor.minThreshold}
        maxThreshold={sensor.maxThreshold}
      />
      <ReadingsGrid rows={readings} />
      {loading && <p className="text-sm text-neutral-500">Atualizando...</p>}
    </div>
  );
}
