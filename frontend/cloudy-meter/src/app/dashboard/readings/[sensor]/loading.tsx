"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingDashPage() {
  const cols = 8;
  const sample = [22, 40, 30, 55, 38, 68, 48, 28];

  const points = sample
    .map((v, i) => {
      const x = (i / (cols - 1)) * 100;
      const y = v;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="p-4 h-full gap-2 grid ">
      {/* 🔹 Fallback do gráfico de linha */}
      <div className="rounded-2xl border p-4 flex flex-col gap-4 flex-1 overflow-hidden h-96">
        {/* Título */}
        <Skeleton className="h-6 w-40 rounded-md" />

        {/* Área do gráfico */}
        <Skeleton className="h-full w-full rounded-md" />
        <Skeleton className="h-8 w-full rounded-md" />
      </div>

      {/* 🔹 Fallback da tabela ag-grid */}
      <div className="rounded-2xl border p-4 flex flex-col gap-3 flex-1">
        {/* Cabeçalho */}
        <Skeleton className="h-6 w-40 rounded-md " />
        <Skeleton className="h-4 w-35 rounded-md mb-5" />

        <div className="grid grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-5 rounded-md" />
          ))}
        </div>

        {/* Linhas */}
        <div className="flex flex-col gap-3 mt-2 flex-1">
          {[...Array(8)].map((_, row) => (
            <div key={row} className="grid grid-cols-5 gap-4">
              {[...Array(5)].map((_, col) => (
                <Skeleton key={col} className="h-8 rounded-md" />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
