"use client";

import { ScanFace } from "lucide-react";
import { useRouter } from "next/navigation";
import { AuthCard } from "@/components/sangapay/auth-card";

export function BiometricCard() {
  const router = useRouter();

  return (
    <AuthCard
      accent="from-emerald-400 via-teal-400 to-cyan-400"
      footer={
        <p className="text-center text-sm leading-6 text-slate-500">
          You can change this later in security settings.
        </p>
      }
    >
      <div className="rounded-[24px] border border-slate-100 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">
              Biometric unlock
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.05em] text-slate-950">
              Keep future logins effortless.
            </h2>
          </div>
          <div className="flex size-12 items-center justify-center rounded-[18px] border border-slate-200 text-slate-950">
            <ScanFace className="size-6" />
          </div>
        </div>

        <p className="mt-4 text-sm leading-6 text-slate-500">
          Use Face ID to open your vault faster on this device.
        </p>
      </div>

      <div className="space-y-3">
        <button
          type="button"
          onClick={() => router.push("/app")}
          className="flex h-14 w-full items-center justify-center rounded-full bg-slate-950 text-sm font-semibold text-white"
        >
          Enable Face ID
        </button>
        <button
          type="button"
          onClick={() => router.push("/app")}
          className="flex h-14 w-full items-center justify-center rounded-full border border-[var(--color-ring)] bg-white text-sm font-semibold text-slate-950"
        >
          Maybe later
        </button>
      </div>
    </AuthCard>
  );
}
