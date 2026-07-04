"use client";

type FavoriteCitiesProps = {
  favorites: string[];
  onSelect: (city: string) => void;
  onRemove: (city: string) => void;
};

export default function FavoriteCities({
  favorites,
  onSelect,
  onRemove,
}: FavoriteCitiesProps) {
  return (
    <div className="w-full max-w-md">
      <h2 className="mb-2 text-sm font-medium text-slate-600 dark:text-slate-300">
        お気に入り都市
      </h2>
      {favorites.length === 0 ? (
        <p className="text-sm text-slate-400 dark:text-slate-500">
          まだお気に入りがありません
        </p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {favorites.map((city) => (
            <span
              key={city}
              className="flex items-center gap-1 rounded-full bg-amber-50 py-1 pl-3 pr-1 text-sm text-amber-800 dark:bg-amber-900/30 dark:text-amber-200"
            >
              <button
                type="button"
                onClick={() => onSelect(city)}
                className="hover:underline"
              >
                ★ {city}
              </button>
              <button
                type="button"
                onClick={() => onRemove(city)}
                aria-label={`${city}をお気に入りから削除`}
                className="flex h-5 w-5 items-center justify-center rounded-full text-amber-500 hover:bg-amber-100 hover:text-amber-700 dark:hover:bg-amber-900/50 dark:hover:text-amber-100"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
