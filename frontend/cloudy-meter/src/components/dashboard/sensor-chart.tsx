"use client";

import { Reading } from "@/types/reading";
import { useEffect, useMemo, useRef } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import ReactECharts from "echarts-for-react";
import { useTheme } from "next-themes";

export function SensorChart({
  readings,
  unit,
  title,
  minThreshold,
  maxThreshold,
}: {
  readings: Reading[];
  unit: string;
  title: string;
  minThreshold?: number | null;
  maxThreshold?: number | null;
}) {
  const chartRef = useRef<any>(null);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.getEchartsInstance().setOption({
        series: [
          {
            data: readings.map((r) => [new Date(r.time).getTime(), r.value]),
          },
        ],
      });
    }
  }, [readings]);

  const option = useMemo(() => {
    const markLineData: any[] = [];
    if (minThreshold != null) {
      markLineData.push({ yAxis: minThreshold, name: "Min" });
    }
    if (maxThreshold != null) {
      markLineData.push({ yAxis: maxThreshold, name: "Max" });
    }

    return {
      tooltip: {
        trigger: "axis",
        formatter: (params: any) => {
          const point = params[0];
          const date = new Date(point.value[0]).toLocaleString();
          return `
            <b>${point.seriesName}</b><br/>
            ${date}<br/>
            Valor: ${point.value[1]} ${unit}
          `;
        },
      },
      grid: { top: 24, right: 16, bottom: 60, left: 60 }, // mais espaço p/ slider

      xAxis: { type: "time" },
      yAxis: {
        type: "value",
        axisLabel: {
          formatter: (val: number) => `${val} ${unit}`, // ✅ unidade em cada tick
        },
      },
      dataZoom: [
        {
          type: "inside", // ✅ zoom por scroll/arrasto
          throttle: 50,
        },
        {
          type: "slider", // ✅ slider abaixo do gráfico
          show: true,
          height: 20,
          bottom: 10,
        },
      ],
      series: [
        {
          type: "line",
          name: title,
          showSymbol: true,
          smooth: true,
          connectNulls: false,
          data: readings.map((r) => [new Date(r.time).getTime(), r.value]),
          areaStyle: {},
          ...(markLineData.length > 0 && {
            markLine: {
              symbol: "none",
              lineStyle: { type: "dashed" },
              data: markLineData,
              label: {
                formatter: (param: any) => param.name,
                position: "insideStart",
                fontWeight: "bold",
              },
            },
          }),
        },
      ],
    } as echarts.EChartsOption;
  }, [readings, unit, title, minThreshold, maxThreshold]);
  const theme = useTheme().theme;
  return (
    <Card className="w-full h-fit">
      <CardHeader className="mb-10">
        <CardTitle>{title}</CardTitle>
        <CardDescription>Leituras do Sensor</CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <div className="h-[250px]">
          <ReactECharts
            ref={chartRef}
            theme={theme === "dark" ? "light" : "light"}
            option={option}
            style={{ height: "100%", width: "100%" }}
            notMerge
            lazyUpdate
          />
        </div>
      </CardContent>
    </Card>
  );
}
