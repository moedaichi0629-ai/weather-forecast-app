"use client";

type SearchHistoryProps = {
  history: string[];
  onSelect: (city: string) => void;
  onRemove: (city: string) => void;
};

export default function SearchHistory({
  history,
  onSelect,
  onRemove,
}: SearchHistoryProps) {
  return (
    <div className="w-full max-w-md">
      <h2 className="mb-2 text-sm font-medium text-slate-600 dark:text-slate-300">
        検索履歴
      </h2>
      {history.length === 0 ? (
        <p className="text-sm text-slate-400 dark:text-slate-500">
          まだ検索履歴がありません
        </p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {history.map((city) => (
            <span
              key={city}
              className="flex items-center gap-1 rounded-full bg-slate-100 py-1 pl-3 pr-1 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              <button
                type="button"
                onClick={() => onSelect(city)}
                className="hover:underline"
              >
                {city}
              </button>
              <button
                type="button"
                onClick={() => onRemove(city)}
                aria-label={`${city}を検索履歴から削除`}
                className="flex h-5 w-5 items-center justify-center rounded-full text-slate-400 hover:bg-slate-200 hover:text-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-200"
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
