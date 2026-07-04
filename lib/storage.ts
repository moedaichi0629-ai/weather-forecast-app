const SEARCH_HISTORY_KEY = "weather_search_history";
const FAVORITE_CITIES_KEY = "weather_favorite_cities";
const SEARCH_HISTORY_LIMIT = 5;

function readList(key: string): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(key);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((v) => typeof v === "string") : [];
  } catch {
    return [];
  }
}

function writeList(key: string, list: string[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(list));
}

function withoutCity(list: string[], city: string): string[] {
  return list.filter((c) => c.toLowerCase() !== city.toLowerCase());
}

export function getSearchHistory(): string[] {
  return readList(SEARCH_HISTORY_KEY);
}

export function addSearchHistory(city: string): string[] {
  const next = [city, ...withoutCity(getSearchHistory(), city)].slice(
    0,
    SEARCH_HISTORY_LIMIT
  );
  writeList(SEARCH_HISTORY_KEY, next);
  return next;
}

export function removeSearchHistory(city: string): string[] {
  const next = withoutCity(getSearchHistory(), city);
  writeList(SEARCH_HISTORY_KEY, next);
  return next;
}

export function getFavoriteCities(): string[] {
  return readList(FAVORITE_CITIES_KEY);
}

export function addFavoriteCity(city: string): string[] {
  const next = [city, ...withoutCity(getFavoriteCities(), city)];
  writeList(FAVORITE_CITIES_KEY, next);
  return next;
}

export function removeFavoriteCity(city: string): string[] {
  const next = withoutCity(getFavoriteCities(), city);
  writeList(FAVORITE_CITIES_KEY, next);
  return next;
}

export function isFavoriteCity(city: string, favorites: string[]): boolean {
  return favorites.some((c) => c.toLowerCase() === city.toLowerCase());
}
