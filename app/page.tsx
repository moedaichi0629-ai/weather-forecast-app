"use client";

import { useState } from "react";
import SearchForm from "@/components/SearchForm";
import DateSelector from "@/components/DateSelector";
import WeatherCard from "@/components/WeatherCard";
import { fetchCityForecast } from "@/lib/weather";
import type { CityForecast } from "@/lib/types";

export default function Home() {
  const [forecast, setForecast] = useState<CityForecast | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (city: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetchCityForecast(city);
      setForecast(result);
      setSelectedDate(result.days[0]?.date ?? null);
    } catch {
      setForecast(null);
      setSelectedDate(null);
      setError("天気情報を取得できませんでした");
    } finally {
      setIsLoading(false);
    }
  };

  const selectedDay = forecast?.days.find((d) => d.date === selectedDate);

  return (
    <div className="flex flex-1 flex-col items-center bg-slate-50 dark:bg-slate-950">
      <main className="flex w-full max-w-3xl flex-1 flex-col items-center gap-6 px-4 py-10 sm:py-16">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 sm:text-3xl">
            天気予報
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            都市名を入力して天気予報を検索してください
          </p>
        </div>

        <SearchForm onSearch={handleSearch} isLoading={isLoading} />

        {isLoading && (
          <p className="text-slate-500 dark:text-slate-400">読み込み中...</p>
        )}

        {!isLoading && error && (
          <p className="text-red-600 dark:text-red-400">{error}</p>
        )}

        {!isLoading && !error && forecast && selectedDay && (
          <div className="flex w-full max-w-md flex-col items-center gap-4">
            <DateSelector
              days={forecast.days}
              selectedDate={selectedDay.date}
              onSelect={setSelectedDate}
            />
            <WeatherCard
              cityName={forecast.cityName}
              country={forecast.country}
              day={selectedDay}
            />
          </div>
        )}
      </main>
    </div>
  );
}
