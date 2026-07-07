"use client";

import { useState } from "react";
import { ChevronRight, Eye, EyeOff } from "lucide-react";
import type { CurrencyCode } from "@/lib/money/convert";
import { formatMoney } from "@/lib/money/format";

type BalanceCardProps = {
  sourceMinor: number;
  walletLabel: string;
  equivalents: Array<{
    destinationCurrency: Exclude<CurrencyCode, "XAF">;
    destinationMinor: number;
  }>;
};

export function BalanceCard({
  sourceMinor,
  walletLabel,
  equivalents,
}: BalanceCardProps) {
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const eurEquivalent = equivalents.find((item) => item.destinationCurrency === "EUR");
  const usdcEquivalent = equivalents.find((item) => item.destinationCurrency === "USDC");
  const xafLabel = (sourceMinor / 100).toLocaleString("en-US");
  const EyeIcon = isBalanceVisible ? Eye : EyeOff;

  return (
    <section
      aria-label={walletLabel}
      className="relative overflow-hidden rounded-[22px] border border-emerald-300/70 bg-linear-to-br from-emerald-500 via-emerald-600 to-emerald-700 px-4 py-3.5 text-white shadow-[0_16px_34px_rgba(16,185,129,0.24)]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.16),transparent_28%),linear-gradient(135deg,transparent_0%,rgba(255,255,255,0.08)_100%)]" />
      <div className="absolute right-0 top-0 h-full w-1/2 opacity-15 [background-image:repeating-linear-gradient(45deg,transparent_0_12px,rgba(255,255,255,0.35)_13px_14px)]" />

      <div className="relative">
        <div className="flex items-center gap-2 text-sm font-medium text-white">
          Total balance
          <button
            type="button"
            aria-label={isBalanceVisible ? "Hide balance" : "Show balance"}
            onClick={() => setIsBalanceVisible((current) => !current)}
            className="-m-1 flex size-7 items-center justify-center rounded-full text-white"
          >
            <EyeIcon className="size-4" />
          </button>
        </div>
        <p className="mt-2.5 flex items-end gap-1.5 text-[2.25rem] font-bold leading-none text-white">
          <span>{isBalanceVisible ? xafLabel : "*,***,***"}</span>
          <span className="pb-0.5 text-[1.2rem] font-bold">XAF</span>
        </p>
      </div>

      <div className="relative mt-2.5 flex flex-wrap items-center gap-2 text-[13px] font-medium text-white/90">
        {eurEquivalent ? (
          <span>
            ~ {isBalanceVisible ? formatMoney("EUR", eurEquivalent.destinationMinor) : "****"}
          </span>
        ) : null}
        {eurEquivalent && usdcEquivalent ? (
          <span className="size-1 rounded-full bg-white/60" />
        ) : null}
        {usdcEquivalent ? (
          <span>{isBalanceVisible ? formatMoney("USDC", usdcEquivalent.destinationMinor) : "**** USDC"}</span>
        ) : null}
      </div>

      <button
        type="button"
        aria-label="Open wallet details"
        className="absolute bottom-3 right-4 flex size-9 items-center justify-center rounded-full border border-white/20 bg-white/14 text-white backdrop-blur-sm"
      >
        <ChevronRight className="size-4" />
      </button>
    </section>
  );
}
