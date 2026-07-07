"use client";

import { useEffect, useState } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

let deferredPrompt: BeforeInstallPromptEvent | null = null;

export function useInstallPromptState() {
  const [canInstall, setCanInstall] = useState(Boolean(deferredPrompt));

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      deferredPrompt = event as BeforeInstallPromptEvent;
      setCanInstall(true);
    };

    const handleInstalled = () => {
      deferredPrompt = null;
      setCanInstall(false);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
      window.removeEventListener("appinstalled", handleInstalled);
    };
  }, []);

  return {
    canInstall,
    async prompt() {
      if (!deferredPrompt) {
        return false;
      }

      await deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      deferredPrompt = null;
      setCanInstall(false);
      return true;
    },
  };
}
