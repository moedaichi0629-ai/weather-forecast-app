"use client";

import { useState } from "react";
import SearchForm from "@/components/SearchForm";
import DateSelector from "@/components/DateSelector";
import WeatherCard from "@/components/WeatherCard";
import SearchHistory from "@/components/SearchHistory";
import FavoriteCities from "@/components/FavoriteCities";
import { fetchCityForecast } from "@/lib/weather";
import type { CityForecast } from "@/lib/types";
import {
  addFavoriteCity,
  addSearchHistory,
  getFavoriteCities,
  getSearchHistory,
  isFavoriteCity,
  removeFavoriteCity,
  removeSearchHistory,
} from "@/lib/storage";

export default function Home() {
  const [forecast, setForecast] = useState<CityForecast | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>(() => getSearchHistory());
  const [favorites, setFavorites] = useState<string[]>(() =>
    getFavoriteCities()
  );

  const handleSearch = async (city: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetchCityForecast(city);
      setForecast(result);
      setSelectedDate(result.days[0]?.date ?? null);
      setHistory(addSearchHistory(result.cityName));
    } catch {
      setForecast(null);
      setSelectedDate(null);
      setError("天気情報を取得できませんでした");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveHistory = (city: string) => {
    setHistory(removeSearchHistory(city));
  };

  const handleRemoveFavorite = (city: string) => {
    setFavorites(removeFavoriteCity(city));
  };

  const handleToggleFavorite = () => {
    if (!forecast) return;
    setFavorites(
      isFavoriteCity(forecast.cityName, favorites)
        ? removeFavoriteCity(forecast.cityName)
        : addFavoriteCity(forecast.cityName)
    );
  };

  const selectedDay = forecast?.days.find((d) => d.date === selectedDate);
  const isCurrentCityFavorite =
    !!forecast && isFavoriteCity(forecast.cityName, favorites);

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

        <SearchHistory
          history={history}
          onSelect={handleSearch}
          onRemove={handleRemoveHistory}
        />

        <FavoriteCities
          favorites={favorites}
          onSelect={handleSearch}
          onRemove={handleRemoveFavorite}
        />

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
            <button
              type="button"
              onClick={handleToggleFavorite}
              className="text-sm font-medium text-amber-600 hover:underline dark:text-amber-400"
            >
              {isCurrentCityFavorite
                ? "★ お気に入りに登録済み"
                : "☆ お気に入りに追加"}
            </button>
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
