"use client";

export async function registerServiceWorker() {
  if (
    typeof window === "undefined" ||
    !("serviceWorker" in navigator)
  ) {
    return;
  }

  const isLocalPreview =
    window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost";

  if (process.env.NODE_ENV !== "production" && !isLocalPreview) {
    return;
  }

  await navigator.serviceWorker.register("/sw.js");
}
