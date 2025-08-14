"use client";

import React, { useMemo, useState, useEffect } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { MeterList } from "@/components/dashboard/meter-list";
import { SensorGrid } from "@/components/dashboard/sensor-grid";
import { SensorChart } from "@/components/dashboard/sensor-chart";
import { ReadingsGrid } from "@/components/dashboard/readings-grid";
import { Meter } from "@/types/meter";
import { Sensor } from "@/types/sensor";
import { Reading } from "@/types/reading";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import { Cloud } from "lucide-react";
import { AppSidebar } from "@/components/app-sidebar";

// ---------- MOCK ----------
function generateMock(): {
  meters: Meter[];
  sensors: Sensor[];
  readings: Reading[];
} {
  const meters: Meter[] = [
    { id: "m-01", name: "Roof Station", status: "online", battery: 86 },
    { id: "m-02", name: "Warehouse A", status: "maintenance", battery: 58 },
    { id: "m-03", name: "Field Probe", status: "offline", battery: 24 },
  ];

  const sensors: Sensor[] = [
    {
      id: "s-01",
      meterId: "m-01",
      name: "Air Temp",
      type: "TEMPERATURE",
      unit: "°C",
    },
    {
      id: "s-02",
      meterId: "m-01",
      name: "Humidity",
      type: "HUMIDITY",
      unit: "%",
    },
    {
      id: "s-03",
      meterId: "m-02",
      name: "Air Temp",
      type: "TEMPERATURE",
      unit: "°C",
    },
    {
      id: "s-04",
      meterId: "m-02",
      name: "Humidity",
      type: "HUMIDITY",
      unit: "%",
    },
    {
      id: "s-05",
      meterId: "m-03",
      name: "Air Temp",
      type: "TEMPERATURE",
      unit: "°C",
    },
  ];

  const readings: Reading[] = [];
  const now = Date.now();
  const step = 15 * 60 * 1000;
  const points = 24 * 4;

  sensors.forEach((s) => {
    for (let i = points; i >= 0; i--) {
      const t = new Date(now - i * step).toISOString();
      let base = s.type === "HUMIDITY" ? 55 : 20;
      if (s.meterId === "m-02") base += 1.5;
      if (s.meterId === "m-03") base -= 0.8;
      const noise =
        (Math.sin((i / 8) * Math.PI) + Math.random() * 0.6 - 0.3) *
        (s.type === "HUMIDITY" ? 4 : 1.2);
      const value = parseFloat((base + noise).toFixed(2));
      readings.push({ sensorId: s.id, time: t, value });
    }
  });

  return { meters, sensors, readings };
}

const {
  meters: MOCK_METERS,
  sensors: MOCK_SENSORS,
  readings: MOCK_READINGS,
} = generateMock();

// ---------- PAGE ----------
export default function DashboardPage() {
  const [meters, setMeters] = useState<Meter[]>([]);
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const [readings, setReadings] = useState<Reading[]>([]);

  const [filterText, setFilterText] = useState("");
  const [selectedMeterId, setSelectedMeterId] = useState<string>();
  const [selectedSensorId, setSelectedSensorId] = useState<string>();

  // Carrega meters
  useEffect(() => {
    fetch("/api/meters")
      .then((res) => res.json())
      .then(setMeters);
  }, []);

  // Carrega sensors quando o meter muda
  useEffect(() => {
    if (!selectedMeterId) return;
    fetch(`/api/meters/${selectedMeterId}/sensors`)
      .then((res) => res.json())
      .then((data) => {
        setSensors(data);
        setSelectedSensorId(data[0]?.id);
      });
  }, [selectedMeterId]);

  // Carrega readings com polling (ex: a cada 5s)
  useEffect(() => {
    if (!selectedSensorId) return;
    let isMounted = true;

    const fetchData = async () => {
      const res = await fetch(
        `/api/sensors/${selectedSensorId}/readings?last=24h`
      );
      const data = await res.json();
      if (isMounted) setReadings(data);
    };

    fetchData();
    const id = setInterval(fetchData, 5000);

    return () => {
      isMounted = false;
      clearInterval(id);
    };
  }, [selectedSensorId]);

  const filteredMeters = meters.filter((m) =>
    m.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const sensorsForMeter = sensors.filter((s) => s.meterId === selectedMeterId);
  const currentSensor = sensorsForMeter.find((s) => s.id === selectedSensorId);

  ModuleRegistry.registerModules([AllCommunityModule]);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-screen">
        {/* Sidebar */}
        <AppSidebar onMeterSelect={setSelectedMeterId} />

        {/* Main content */}
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
                <Badge variant="outline">Meters: {filteredMeters.length}</Badge>
                <Badge variant="outline">
                  Sensors: {sensorsForMeter.length}
                </Badge>
              </div>
            </CardHeader>
          </Card>

          <SensorGrid
            sensors={sensorsForMeter}
            onSelect={setSelectedSensorId}
            selectedId={selectedSensorId}
          />

          {currentSensor && (
            <SensorChart
              title={`${currentSensor.name} (${currentSensor.unit})`}
              unit={currentSensor.unit}
              readings={readings}
            />
          )}

          <ReadingsGrid rows={readings} />
        </div>
      </div>
    </SidebarProvider>
  );
}
