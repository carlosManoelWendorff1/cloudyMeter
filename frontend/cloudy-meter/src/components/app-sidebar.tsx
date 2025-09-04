import * as React from "react";

import { SearchForm } from "@/components/search-form";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { MeterList } from "./dashboard/meter-list";
import { Cloud } from "lucide-react";
import { Meter } from "@/types/meter";
import { useMemo } from "react";

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  onMeterSelect: (value: string) => void;
  meters?: Meter[];
};

export function AppSidebar({
  onMeterSelect,
  meters,
  ...props
}: AppSidebarProps) {
  const [filterText, setFilterText] = React.useState("");
  const filteredMeters = useMemo(
    () =>
      meters?.filter((m) =>
        m.name.toLowerCase().includes(filterText.toLowerCase())
      ) ?? [],
    [filterText, meters]
  );

  const [selectedMeterId, setSelectedMeterId] = React.useState<
    string | undefined
  >(filteredMeters[0]?.id);
  return (
    <Sidebar {...props} collapsible="none" className="w-80">
      <SidebarHeader>
        <div className="flex flex-col items-center space-y-2">
          <Cloud className="text-primary-700 w-10 h-10" />
          <h1 className="text-2xl text-primary-700 font-semibold">
            CloudyMeter
          </h1>
        </div>
        <SearchForm
          onSearchSubmit={(value) => {
            setFilterText(value);
          }}
        />
      </SidebarHeader>

      <SidebarContent>
        <MeterList
          items={filteredMeters}
          selectedId={selectedMeterId}
          onSelect={(value) => {
            setSelectedMeterId(value);
            onMeterSelect?.(value);
          }}
        />
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
