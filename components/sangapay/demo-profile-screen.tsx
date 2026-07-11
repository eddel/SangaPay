"use client";

import { useState } from "react";
import { AppShell } from "@/components/sangapay/app-shell";
import { BottomNav } from "@/components/sangapay/bottom-nav";
import { RouteLoadingSkeleton } from "@/components/sangapay/route-loading-skeleton";
import { ScreenHeader } from "@/components/sangapay/screen-header";
import { useSimulatedLoading } from "@/components/sangapay/use-simulated-loading";
import { demoSession } from "@/lib/mock/session";
import { useThemeMode } from "@/lib/theme/theme-store";

function ToggleRow({
  label,
  description,
  defaultChecked,
}: {
  label: string;
  description: string;
  defaultChecked: boolean;
}) {
  const [enabled, setEnabled] = useState(defaultChecked);

  return (
    <button
      type="button"
      onClick={() => setEnabled((current) => !current)}
      aria-pressed={enabled}
      className="flex w-full items-center justify-between gap-4 border-b border-slate-100 py-4 text-left last:border-b-0"
    >
      <div>
        <p className="text-sm font-semibold text-slate-950">{label}</p>
        <p className="mt-1 text-sm leading-6 text-slate-500">{description}</p>
      </div>
      <span
        className={`relative h-7 w-12 rounded-full transition ${
          enabled ? "bg-emerald-500" : "bg-slate-200"
        }`}
      >
        <span
          className={`absolute top-1 size-5 rounded-full bg-white transition ${
            enabled ? "left-6" : "left-1"
          }`}
        />
      </span>
    </button>
  );
}

export function DemoProfileScreen() {
  const isLoading = useSimulatedLoading();
  const [isKycModalOpen, setIsKycModalOpen] = useState(false);
  const isKycVerified = demoSession.profile.kycStatus === "Verified";
  const { isDark, toggleTheme } = useThemeMode();

  if (isLoading) {
    return <RouteLoadingSkeleton title="Loading profile" caption="Preparing account settings" />;
  }

  return (
    <AppShell>
      <ScreenHeader
        title="Profile"
        subtitle="Manage your identity, KYC tier, and security preferences."
        badge={isKycVerified ? demoSession.profile.kycStatus : "KYC pending"}
      />

      <section className="-mt-4 rounded-[32px] border border-slate-200 bg-white p-5 shadow-[var(--shadow-card)]">
        <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Personal</p>
        <h2 className="mt-3 text-xl font-semibold tracking-[-0.03em] text-slate-950">
          {demoSession.user.fullName}
        </h2>
        <p className="mt-1 text-sm text-slate-500">{demoSession.user.phone}</p>
        <p className="mt-1 text-sm text-slate-500">{demoSession.user.email}</p>
      </section>

      <section className="mt-4 rounded-[32px] border border-slate-200 bg-white p-5 shadow-[var(--shadow-card)]">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-slate-500">KYC</p>
            <h2 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-slate-950">
              {demoSession.profile.kycTier}
            </h2>
          </div>
          {isKycVerified ? (
            <span className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-600">
              {demoSession.profile.kycStatus}
            </span>
          ) : (
            <button
              type="button"
              onClick={() => setIsKycModalOpen(true)}
              className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white"
            >
              Complete KYC verification
            </button>
          )}
        </div>
        <div className="mt-4 rounded-[24px] bg-slate-50 px-4 py-4">
          <div className="flex items-center justify-between gap-4 text-sm">
            <span className="text-slate-500">Daily limit</span>
            <span className="font-semibold text-slate-950">{demoSession.profile.dailyLimit}</span>
          </div>
          <div className="mt-3 flex items-center justify-between gap-4 text-sm">
            <span className="text-slate-500">Monthly limit</span>
            <span className="font-semibold text-slate-950">{demoSession.profile.monthlyLimit}</span>
          </div>
        </div>
      </section>

      <section className="mt-4 rounded-[32px] border border-slate-200 bg-white px-5 py-2 shadow-[var(--shadow-card)]">
        <p className="pt-3 text-xs uppercase tracking-[0.28em] text-slate-500">Security</p>
        <ToggleRow
          label="Face ID"
          description="Unlock SangaPay faster on this device."
          defaultChecked={demoSession.profile.security.faceId}
        />
        <ToggleRow
          label="Trusted device"
          description="Reduce repeated verification on this phone."
          defaultChecked={demoSession.profile.security.trustedDevice}
        />
        <ToggleRow
          label="Push alerts"
          description="Get transfer and rate notifications instantly."
          defaultChecked={demoSession.profile.security.pushAlerts}
        />
        <button
          type="button"
          onClick={toggleTheme}
          aria-pressed={isDark}
          className="flex w-full items-center justify-between gap-4 py-4 text-left"
        >
          <div>
            <p className="text-sm font-semibold text-slate-950">Dark mode</p>
            <p className="mt-1 text-sm leading-6 text-slate-500">
              Switch the app appearance for low-light viewing.
            </p>
          </div>
          <span
            className={`relative h-7 w-12 rounded-full transition ${
              isDark ? "bg-emerald-500" : "bg-slate-200"
            }`}
          >
            <span
              className={`absolute top-1 size-5 rounded-full bg-white transition ${
                isDark ? "left-6" : "left-1"
              }`}
            />
          </span>
        </button>
      </section>

      {isKycModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/40 px-4 pb-[calc(24px+env(safe-area-inset-bottom))] pt-8">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="kyc-modal-title"
            className="w-full max-w-[398px] rounded-[28px] bg-white p-5 shadow-[0_18px_42px_rgba(15,23,42,0.2)]"
          >
            <h2
              id="kyc-modal-title"
              className="text-xl font-semibold tracking-[-0.03em] text-slate-950"
            >
              Complete KYC verification
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Still under development for now.
            </p>
            <button
              type="button"
              onClick={() => setIsKycModalOpen(false)}
              className="mt-5 flex min-h-12 w-full items-center justify-center rounded-full bg-slate-950 px-4 text-sm font-semibold text-white"
            >
              Close
            </button>
          </div>
        </div>
      ) : null}

      <BottomNav activeTab="profile" />
    </AppShell>
  );
}
