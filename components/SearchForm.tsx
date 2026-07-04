"use client";

import { useState } from "react";

type SearchFormProps = {
  onSearch: (city: string) => void;
  isLoading: boolean;
};

export default function SearchForm({ onSearch, isLoading }: SearchFormProps) {
  const [city, setCity] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = city.trim();
    if (trimmed) {
      onSearch(trimmed);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-md gap-2"
    >
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="都市名を入力（例: Tokyo）"
        className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
      />
      <button
        type="submit"
        disabled={isLoading || !city.trim()}
        className="shrink-0 rounded-lg bg-sky-600 px-5 py-3 font-medium text-white shadow-sm transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        検索
      </button>
    </form>
  );
}
