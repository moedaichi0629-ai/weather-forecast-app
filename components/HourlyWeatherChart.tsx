"use client";

import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { TooltipContentProps } from "recharts";
import type { HourlyPoint } from "@/lib/types";

type HourlyWeatherChartProps = {
  hourly: HourlyPoint[];
};

function formatHour(hour: number): string {
  return `${hour}:00`;
}

function ChartTooltip({ active, payload, label }: TooltipContentProps) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs shadow-md dark:border-slate-600 dark:bg-slate-800">
      <p className="mb-1 font-medium text-slate-700 dark:text-slate-200">
        {formatHour(Number(label))}
      </p>
      {payload.map((entry) => (
        <p key={String(entry.dataKey)} style={{ color: entry.color }}>
          {entry.name}: {entry.value}
          {entry.dataKey === "pop" ? "%" : "°C"}
        </p>
      ))}
    </div>
  );
}

export default function HourlyWeatherChart({
  hourly,
}: HourlyWeatherChartProps) {
  if (hourly.length === 0) return null;

  return (
    <div className="w-full max-w-md rounded-2xl bg-white p-4 shadow-lg dark:bg-slate-800">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-medium text-slate-600 dark:text-slate-300">
          時間帯ごとの気温・降水確率
        </h3>
        <div className="flex items-center gap-3 text-xs text-slate-400 dark:text-slate-500">
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-orange-500" />
            気温
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-sm bg-sky-400" />
            降水確率
          </span>
        </div>
      </div>

      <div className="h-56 w-full overflow-x-auto text-slate-500 dark:text-slate-400">
        <div className="h-full min-w-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={hourly}
              margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
            >
              <CartesianGrid strokeOpacity={0.3} stroke="currentColor" />
              <XAxis
                dataKey="hour"
                tickFormatter={formatHour}
                stroke="currentColor"
                tick={{ fill: "currentColor", fontSize: 12 }}
              />
              <YAxis
                yAxisId="temp"
                stroke="currentColor"
                tick={{ fill: "currentColor", fontSize: 12 }}
                unit="°C"
                width={44}
              />
              <YAxis
                yAxisId="pop"
                orientation="right"
                domain={[0, 100]}
                stroke="currentColor"
                tick={{ fill: "currentColor", fontSize: 12 }}
                unit="%"
                width={40}
              />
              <Tooltip content={ChartTooltip} />
              <Bar
                yAxisId="pop"
                dataKey="pop"
                name="降水確率"
                fill="#38bdf8"
                fillOpacity={0.5}
                radius={[4, 4, 0, 0]}
              />
              <Line
                yAxisId="temp"
                type="monotone"
                dataKey="temp"
                name="気温"
                stroke="#f97316"
                strokeWidth={2}
                dot={{ r: 3 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
        ※ OpenWeatherMapの無料プランは3時間ごとのデータのため、1時間単位の予報ではありません
      </p>
    </div>
  );
}
