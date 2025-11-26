"use client";
import * as React from "react";
import { useRouter } from "next/navigation";

import { SearchForm } from "@/components/search-form";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { MeterList } from "./dashboard/meter-list";
import { Cloud } from "lucide-react";
import { Meter } from "@/types/meter";
import { ComponentProps, useMemo, useState } from "react";
import { ModeToggle } from "./mode-toggle";

type AppSidebarProps = ComponentProps<typeof Sidebar> & {
  meters?: Meter[];
};

export function AppSidebar({ meters, ...props }: AppSidebarProps) {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string>("");
  const [filterText, setFilterText] = useState("");
  const filteredMeters = useMemo(
    () =>
      meters?.filter((m) =>
        m.name.toLowerCase().includes(filterText.toLowerCase())
      ) ?? [],
    [filterText, meters]
  );

  console.log(filteredMeters);
  return (
    <Sidebar
      className="bg-primary-50 border-r border-primary-100 shadow-md flex flex-col justify-between"
      {...props}
    >
      <SidebarTrigger className="md:hidden" />
      {/* Header */}
      <SidebarHeader
        className="px-6 pt-8 pb-6 hover:cursor-pointer"
        onClick={() => router.push("/")}
      >
        <div className="flex items-center gap-3 mb-6">
          <Cloud className="w-12 h-12 text-primary" />
          <h1 className="text-4xl font-bold text-primary">CloudyMeter</h1>
        </div>
      </SidebarHeader>
      {/* Content */}
      <SidebarContent className="shadow-none border-none">
        <SearchForm
          onSearchSubmit={(value) => {
            setFilterText(value);
          }}
        />
        <MeterList
          items={filteredMeters}
          selectedId={selectedId}
          onSelect={(value) => {
            setSelectedId(value);
            router.push(`/dashboard/${value}`);
          }}
        />
      </SidebarContent>
      {/* Footer */}
      <SidebarFooter className="px-6 py-4 ">
        <div className="flex items-center justify-between w-full">
          <span className="text-sm text-primary-700">
            &copy; {new Date().getFullYear()} CloudyMeter
          </span>
          <ModeToggle />
        </div>
      </SidebarFooter>
      {/* Optional Sidebar Rail */}
      <SidebarRail />
    </Sidebar>
  );
}
