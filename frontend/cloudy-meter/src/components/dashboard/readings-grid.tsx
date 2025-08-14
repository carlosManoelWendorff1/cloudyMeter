import { Reading } from "@/types/reading";
import { AgGridReact } from "ag-grid-react";
import { useMemo, useRef, useState } from "react";
import { ColDef, GridApi } from "ag-grid-community";
import "ag-grid-community/styles/ag-theme-quartz.css";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export function ReadingsGrid({ rows }: { rows: Reading[] }) {
  const gridRef = useRef<GridApi | null>(null);

  // Estado de paginação
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // número de linhas por página
  const pageCount = Math.ceil(rows.length / pageSize);

  // Definições das colunas
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

  // Dados da página atual
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return rows.slice(start, start + pageSize);
  }, [rows, currentPage]);
  const defaultColDef = {
    filter: true,
    sortable: true,
    resizable: true,
    flex: 1,
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Data</CardTitle>
        <CardDescription>Tabular readings</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="ag-theme-quartz" style={{ height: 400, width: "100%" }}>
          <AgGridReact
            rowData={paginatedData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            animateRows
          />
        </div>

        {/* Paginação */}
        <div className="mt-4 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  aria-disabled={currentPage === 1}
                />
              </PaginationItem>

              <span className="px-4 py-2 text-sm">
                Página {currentPage} de {pageCount}
              </span>

              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    setCurrentPage((p) => Math.min(pageCount, p + 1))
                  }
                  aria-disabled={currentPage === pageCount}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </CardContent>
    </Card>
  );
}
