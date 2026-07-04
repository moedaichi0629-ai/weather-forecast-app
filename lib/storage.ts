import { useSyncExternalStore } from "react";

const SEARCH_HISTORY_KEY = "weather_search_history";
const FAVORITE_CITIES_KEY = "weather_favorite_cities";
const SEARCH_HISTORY_LIMIT = 5;

const EMPTY_LIST: string[] = [];

function readList(key: string): string[] {
  try {
    const raw = window.localStorage.getItem(key);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((v) => typeof v === "string") : [];
  } catch {
    return [];
  }
}

function withoutCity(list: string[], city: string): string[] {
  return list.filter((c) => c.toLowerCase() !== city.toLowerCase());
}

/**
 * Minimal external store per key so `useSyncExternalStore` can read
 * localStorage without a server/client hydration mismatch: the server (and
 * the client's first hydration pass) always see `getServerSnapshot`'s empty
 * list, and React re-syncs to the real localStorage value right after
 * hydration instead of during render.
 */
function createListStore(key: string) {
  let snapshot: string[] | null = null;
  const listeners = new Set<() => void>();

  return {
    subscribe(listener: () => void) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    getSnapshot(): string[] {
      if (snapshot === null) {
        snapshot = readList(key);
      }
      return snapshot;
    },
    getServerSnapshot(): string[] {
      return EMPTY_LIST;
    },
    set(next: string[]): string[] {
      snapshot = next;
      window.localStorage.setItem(key, JSON.stringify(next));
      listeners.forEach((listener) => listener());
      return next;
    },
  };
}

const historyStore = createListStore(SEARCH_HISTORY_KEY);
const favoritesStore = createListStore(FAVORITE_CITIES_KEY);

export function useSearchHistory(): string[] {
  return useSyncExternalStore(
    historyStore.subscribe,
    historyStore.getSnapshot,
    historyStore.getServerSnapshot
  );
}

export function useFavoriteCities(): string[] {
  return useSyncExternalStore(
    favoritesStore.subscribe,
    favoritesStore.getSnapshot,
    favoritesStore.getServerSnapshot
  );
}

export function addSearchHistory(city: string): string[] {
  const next = [city, ...withoutCity(historyStore.getSnapshot(), city)].slice(
    0,
    SEARCH_HISTORY_LIMIT
  );
  return historyStore.set(next);
}

export function removeSearchHistory(city: string): string[] {
  return historyStore.set(withoutCity(historyStore.getSnapshot(), city));
}

export function addFavoriteCity(city: string): string[] {
  const next = [city, ...withoutCity(favoritesStore.getSnapshot(), city)];
  return favoritesStore.set(next);
}

export function removeFavoriteCity(city: string): string[] {
  return favoritesStore.set(withoutCity(favoritesStore.getSnapshot(), city));
}

export function isFavoriteCity(city: string, favorites: string[]): boolean {
  return favorites.some((c) => c.toLowerCase() === city.toLowerCase());
}
