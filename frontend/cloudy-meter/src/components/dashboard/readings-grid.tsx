import { Reading } from "@/types/reading";
import { AgGridReact } from "ag-grid-react";
import { useMemo } from "react";
import { ColDef } from "ag-grid-community"; // <--- Add this import
import "ag-grid-community/styles/ag-theme-quartz.css"; // <--- Add a theme style
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";

export function ReadingsGrid({ rows }: { rows: Reading[] }) {
  // Define column definitions with the Reading type
  const columnDefs: ColDef<Reading>[] = useMemo(
    () => [
      {
        headerName: "Time",
        field: "time",
        valueFormatter: (p) => new Date(p.value).toLocaleString(),
      },
      { headerName: "Value", field: "value" },
    ],
    []
  );

  const rowData = rows;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Data</CardTitle>
        <CardDescription>Tabular readings</CardDescription>
      </CardHeader>
      <CardContent>
        <div style={{ height: 360, width: "100%" }}>
          <AgGridReact
            columnDefs={columnDefs}
            rowData={rowData}
            animateRows={true}
          />
        </div>
      </CardContent>
    </Card>
  );
}
