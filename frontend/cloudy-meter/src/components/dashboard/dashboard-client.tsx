// components/dashboard/dashboard-client.tsx (Client Component)
"use client";

import React, { FC, useEffect, useState } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AppSidebar } from "@/components/app-sidebar";
import { SensorGrid } from "@/components/dashboard/sensor-grid";
import { SensorChart } from "@/components/dashboard/sensor-chart";
import { ReadingsGrid } from "@/components/dashboard/readings-grid";
import { Meter } from "@/types/meter";
import { Reading } from "@/types/reading";
import { Sensor } from "@/types/sensor";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { apiFetch } from "@/lib/api-client";

interface DashboardClientProps {
  organizationId?: string;
}
export const DashboardClient: FC<DashboardClientProps> = ({
  organizationId,
}) => {
  const [meters, setMeters] = useState<Meter[]>([]);
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const [readings, setReadings] = useState<Reading[]>([]);
  const [selectedMeterId, setSelectedMeterId] = useState<string>();
  const [selectedSensor, setSelectedSensor] = useState<Sensor>();
  // fetch + polling igual você já tem...
  // ...

  ModuleRegistry.registerModules([AllCommunityModule]);

  useEffect(() => {
    apiFetch<Meter[]>(`/meters/organization/2`, "Error fetching meters").then(
      (data) => {
        if (data) setMeters(data);
      }
    );
  }, []);

  useEffect(() => {
    if (!selectedMeterId) return;

    apiFetch<Sensor[]>(
      `/sensors/meter/${selectedMeterId}`,
      `Error fetching sensors for meter ${selectedMeterId}`
    ).then((data) => {
      if (data) {
        console.log("Fetched sensors:", data);
        setSensors(data);
      }
    });
  }, [selectedMeterId]);

  useEffect(() => {
    if (!selectedSensor) return;
    let isMounted = true;

    const fetchData = async () => {
      const data = await apiFetch<Reading[]>(
        `/readings/sensor/${selectedSensor?.id}`,
        `Error fetching readings for sensor ${selectedSensor?.id}`
      );
      if (isMounted && data) setReadings(data);
    };

    fetchData();
    const id = setInterval(fetchData, 5000);

    return () => {
      isMounted = false;
      clearInterval(id);
    };
  }, [selectedSensor?.id]);

  const sensorsForMeter = sensors.filter((s) => s.meterId === selectedMeterId);

  return (
    <div className="flex min-h-screen w-screen">
      <AppSidebar onMeterSelect={setSelectedMeterId} meters={meters} />

      <div className="flex-1 flex flex-col space-y-6 p-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>CloudyMeter Dashboard</CardTitle>
              <CardDescription>
                Select a meter and sensor to visualize readings.
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">Meters: {meters.length}</Badge>
            </div>
          </CardHeader>
        </Card>

        <SensorGrid
          sensors={sensors}
          onSelect={(sensor) => {
            setSelectedSensor(sensor);
          }}
          selectedId={selectedSensor?.id}
        />

        {selectedSensor && (
          <SensorChart
            title={`${selectedSensor.name} (${selectedSensor.unit})`}
            unit={selectedSensor.unit}
            readings={readings}
          />
        )}

        <ReadingsGrid rows={readings} />
      </div>
    </div>
  );
};
