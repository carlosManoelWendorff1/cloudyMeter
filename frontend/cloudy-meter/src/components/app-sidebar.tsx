import * as React from "react";

import { SearchForm } from "@/components/search-form";
import { VersionSwitcher } from "@/components/version-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { MeterList } from "./dashboard/meter-list";
import { Reading } from "@/types/reading";
import { Cloud } from "lucide-react";

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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [filterText, setFilterText] = React.useState("");
  const filteredMeters = React.useMemo(
    () =>
      MOCK_METERS.filter((m) =>
        m.name.toLowerCase().includes(filterText.toLowerCase())
      ),
    [filterText]
  );

  const [selectedMeterId, setSelectedMeterId] = React.useState<
    string | undefined
  >(filteredMeters[0]?.id);

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarHeader>
          <div className="flex flex-col items-center space-y-2">
            <Cloud className="text-primary-700 w-10 h-10" />
            <h1 className="text-2xl text-primary-700 font-semibold">
              CloudyMeter
            </h1>
          </div>
        </SidebarHeader>
        <SearchForm />
      </SidebarHeader>
      {/* <SidebarTrigger className="-ml-1" /> */}

      <SidebarContent>
        <MeterList
          items={filteredMeters}
          selectedId={selectedMeterId}
          onSelect={setSelectedMeterId}
        />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
