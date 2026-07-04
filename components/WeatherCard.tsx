import Image from "next/image";
import type { DailyForecast } from "@/lib/types";
import { formatDateLabel } from "@/lib/weather";

type WeatherCardProps = {
  cityName: string;
  country: string;
  day: DailyForecast;
};

export default function WeatherCard({ cityName, country, day }: WeatherCardProps) {
  return (
    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg dark:bg-slate-800">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          {cityName}
          {country ? `, ${country}` : ""}
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {formatDateLabel(day.date)}
        </p>
      </div>

      <div className="mt-4 flex flex-col items-center">
        <Image
          src={`https://openweathermap.org/img/wn/${day.weatherIcon}@2x.png`}
          alt={day.weatherDescription}
          width={100}
          height={100}
        />
        <p className="text-6xl font-bold leading-none text-slate-900 dark:text-slate-50">
          {day.temp}°C
        </p>
        <p className="mt-1 text-base capitalize text-slate-600 dark:text-slate-300">
          {day.weatherDescription}
        </p>
        <p className="text-sm text-slate-400 dark:text-slate-500">
          最高 {day.tempMax}° / 最低 {day.tempMin}°
        </p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-slate-50 p-3 text-center dark:bg-slate-700/50">
          <p className="text-xs text-slate-500 dark:text-slate-400">湿度</p>
          <p className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            {day.humidity}%
          </p>
        </div>
        <div className="rounded-xl bg-slate-50 p-3 text-center dark:bg-slate-700/50">
          <p className="text-xs text-slate-500 dark:text-slate-400">降水確率</p>
          <p className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            {day.pop}%
          </p>
        </div>
      </div>
    </div>
  );
}
