"use client";

import type { DailyForecast } from "@/lib/types";
import { formatDateLabel } from "@/lib/weather";

type DateSelectorProps = {
  days: DailyForecast[];
  selectedDate: string;
  onSelect: (date: string) => void;
};

export default function DateSelector({
  days,
  selectedDate,
  onSelect,
}: DateSelectorProps) {
  return (
    <div className="flex w-full gap-2 overflow-x-auto pb-1">
      {days.map((day) => {
        const isSelected = day.date === selectedDate;
        return (
          <button
            key={day.date}
            type="button"
            onClick={() => onSelect(day.date)}
            className={`flex shrink-0 flex-col items-center rounded-lg px-3 py-2 text-sm transition ${
              isSelected
                ? "bg-sky-600 text-white shadow-sm"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            <span className="font-medium">{formatDateLabel(day.date)}</span>
            <span className="text-xs opacity-80">{day.temp}°C</span>
          </button>
        );
      })}
    </div>
  );
}
