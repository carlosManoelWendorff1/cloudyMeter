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
    const times = readings.map((r) => r.time);
    const values = readings.map((r) => r.value);
    return {
      tooltip: { trigger: "axis" },
      grid: { top: 24, right: 16, bottom: 40, left: 48 },
      xAxis: { type: "time" },
      yAxis: { type: "value", name: unit },
      series: [
        {
          type: "line",
          name: title,
          showSymbol: false,
          smooth: true,
          data: readings.map((r) => [r.time, r.value]),
          areaStyle: {},
        },
      ],
    } as echarts.EChartsOption;
  }, [readings, unit, title]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Last 24 hours</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[320px]">
          <ReactECharts
            option={option}
            style={{ height: 320 }}
            notMerge
            lazyUpdate
          />
        </div>
      </CardContent>
    </Card>
  );
}
