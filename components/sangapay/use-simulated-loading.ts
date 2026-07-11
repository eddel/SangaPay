"use client";

import { useEffect, useState } from "react";

export function useSimulatedLoading(durationMs = 700) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (process.env.NODE_ENV === "test") {
      setIsLoading(false);
      return;
    }

    const timeoutId = window.setTimeout(() => setIsLoading(false), durationMs);
    return () => window.clearTimeout(timeoutId);
  }, [durationMs]);

  return isLoading;
}
