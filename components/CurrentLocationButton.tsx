"use client";

import { useState } from "react";
import type { Coordinates } from "@/lib/types";

type CurrentLocationButtonProps = {
  onLocate: (coords: Coordinates) => void;
  onError: (message: string) => void;
  disabled?: boolean;
};

export default function CurrentLocationButton({
  onLocate,
  onError,
  disabled,
}: CurrentLocationButtonProps) {
  const [isRequesting, setIsRequesting] = useState(false);

  const handleClick = () => {
    if (!("geolocation" in navigator)) {
      onError("現在地の天気情報を取得できませんでした");
      return;
    }

    setIsRequesting(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsRequesting(false);
        onLocate({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (positionError) => {
        setIsRequesting(false);
        onError(
          positionError.code === positionError.PERMISSION_DENIED
            ? "位置情報の取得が許可されませんでした"
            : "現在地の天気情報を取得できませんでした"
        );
      },
      { timeout: 10000 }
    );
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled || isRequesting}
      className="flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
    >
      📍 {isRequesting ? "位置情報を取得中..." : "現在地の天気を取得"}
    </button>
  );
}
