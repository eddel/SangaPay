"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import { useInstallPromptState } from "@/lib/pwa/install-prompt-store";

export function InstallPrompt({ canInstall }: { canInstall?: boolean }) {
  const installState = useInstallPromptState();
  const isInstallable = canInstall ?? installState.canInstall;
  const [message, setMessage] = useState("");

  if (!isInstallable) {
    return null;
  }

  return (
    <div className="mt-5 rounded-[24px] bg-slate-950 px-4 py-4 text-white shadow-[var(--shadow-card)]">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold">Install SangaPay</p>
          <p className="mt-1 text-xs text-white/65">
            Use the app with a native-style home screen.
          </p>
        </div>
        <button
          type="button"
          className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950"
          onClick={async () => {
            if (canInstall) {
              setMessage("Install prompt ready");
              return;
            }

            const prompted = await installState.prompt();
            setMessage(
              prompted ? "Install prompt ready" : "Install is not available yet",
            );
          }}
        >
          <Download className="size-4" />
          Install app
        </button>
      </div>
      {message ? <p className="mt-3 text-xs text-emerald-300">{message}</p> : null}
    </div>
  );
}
