import { Reading } from "@/types/reading";
import { useMemo } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import ReactECharts from "echarts-for-react";

export function SensorChart({
  readings,
  unit,
  title,
}: {
  readings: Reading[];
  unit: string;
  title: string;
}) {
  const option = useMemo(() => {
    return {
      tooltip: { trigger: "axis" },
      grid: { top: 24, right: 16, bottom: 40, left: 48 },
      xAxis: { type: "time" },
      yAxis: { type: "value", name: unit, nameLocation: "end", nameGap: 0 },
      series: [
        {
          type: "line",
          name: title,
          showSymbol: true,
          smooth: true,
          data: readings.map((r) => [r.time, r.value]),
          areaStyle: {},
        },
      ],
    } as echarts.EChartsOption;
  }, [readings, unit, title]);

  return (
    <Card className="w-full h-full">
      <CardHeader className="mb-10">
        <CardTitle>{title}</CardTitle>
        <CardDescription>Last 24 hours</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ReactECharts
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
