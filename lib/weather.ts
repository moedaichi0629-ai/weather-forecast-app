import type { CityForecast, OpenWeatherForecastResponse } from "./types";

const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";

export class WeatherApiError extends Error {}

/**
 * Fetches the 5-day / 3-hour forecast for a city and groups it into one
 * summary per calendar day (OpenWeatherMap's free plan does not offer a
 * true 7-day daily forecast, so 5 days is the max available here).
 */
export async function fetchCityForecast(city: string): Promise<CityForecast> {
  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
  if (!apiKey) {
    throw new WeatherApiError("APIキーが設定されていません");
  }

  const url = `${FORECAST_URL}?q=${encodeURIComponent(
    city
  )}&units=metric&lang=ja&appid=${apiKey}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new WeatherApiError(`天気情報の取得に失敗しました (status: ${res.status})`);
  }

  const data = (await res.json()) as OpenWeatherForecastResponse;
  return {
    cityName: data.city.name,
    country: data.city.country,
    days: groupByDay(data.list),
  };
}

function groupByDay(
  list: OpenWeatherForecastResponse["list"]
): CityForecast["days"] {
  const byDate = new Map<string, OpenWeatherForecastResponse["list"]>();

  for (const entry of list) {
    const date = entry.dt_txt.slice(0, 10);
    const bucket = byDate.get(date) ?? [];
    bucket.push(entry);
    byDate.set(date, bucket);
  }

  const days = Array.from(byDate.entries()).map(([date, entries]) => {
    // Prefer the entry closest to local noon as the "representative" reading.
    const representative = entries.reduce((closest, entry) => {
      const hour = Number(entry.dt_txt.slice(11, 13));
      const closestHour = Number(closest.dt_txt.slice(11, 13));
      return Math.abs(hour - 12) < Math.abs(closestHour - 12) ? entry : closest;
    }, entries[0]);

    const tempMin = Math.min(...entries.map((e) => e.main.temp_min));
    const tempMax = Math.max(...entries.map((e) => e.main.temp_max));
    const pop = Math.round(Math.max(...entries.map((e) => e.pop)) * 100);

    return {
      date,
      dt: representative.dt,
      tempMin: Math.round(tempMin),
      tempMax: Math.round(tempMax),
      temp: Math.round(representative.main.temp),
      humidity: representative.main.humidity,
      pop,
      weatherMain: representative.weather[0]?.main ?? "",
      weatherDescription: representative.weather[0]?.description ?? "",
      weatherIcon: representative.weather[0]?.icon ?? "01d",
    };
  });

  return days.sort((a, b) => a.date.localeCompare(b.date));
}

export function formatDateLabel(dateStr: string): string {
  const date = new Date(`${dateStr}T00:00:00`);
  return date.toLocaleDateString("ja-JP", {
    month: "numeric",
    day: "numeric",
    weekday: "short",
  });
}
