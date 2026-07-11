"use client";

import { useEffect } from "react";
import { initializeTheme } from "@/lib/theme/theme-store";

export function ThemeBootstrap() {
  useEffect(() => {
    initializeTheme();
  }, []);

  return null;
}
