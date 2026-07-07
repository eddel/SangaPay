import { ChevronRight, Eye } from "lucide-react";
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
  const eurEquivalent = equivalents.find((item) => item.destinationCurrency === "EUR");
  const usdcEquivalent = equivalents.find((item) => item.destinationCurrency === "USDC");
  const xafLabel = (sourceMinor / 100).toLocaleString("en-US");

  return (
    <section
      aria-label={walletLabel}
      className="relative overflow-hidden rounded-[28px] border border-emerald-300/70 bg-linear-to-br from-emerald-500 via-emerald-600 to-emerald-700 px-5 py-6 text-white shadow-[0_18px_40px_rgba(16,185,129,0.28)]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.16),transparent_28%),linear-gradient(135deg,transparent_0%,rgba(255,255,255,0.08)_100%)]" />
      <div className="absolute right-0 top-0 h-full w-1/2 opacity-15 [background-image:repeating-linear-gradient(45deg,transparent_0_12px,rgba(255,255,255,0.35)_13px_14px)]" />
      <div className="relative flex items-center justify-between">
        <div>
          <p className="flex items-center gap-3 text-[1.05rem] font-semibold tracking-[-0.03em] text-white">
            Total balance
            <Eye className="size-5" />
          </p>
          <p className="mt-5 flex items-end gap-2 text-[3.55rem] font-semibold leading-none tracking-[-0.07em] text-white">
            <span>{xafLabel}</span>
            <span className="pb-1 text-[1.65rem] tracking-[-0.05em]">XAF</span>
          </p>
        </div>
      </div>
      <div className="relative mt-5 flex flex-wrap items-center gap-3 text-[1.08rem] font-medium tracking-[-0.03em] text-white/90">
        {eurEquivalent ? <span>~ {formatMoney("EUR", eurEquivalent.destinationMinor)}</span> : null}
        {eurEquivalent && usdcEquivalent ? <span className="text-white/60">•</span> : null}
        {usdcEquivalent ? <span>{formatMoney("USDC", usdcEquivalent.destinationMinor)}</span> : null}
      </div>
      <button
        type="button"
        aria-label="Open wallet details"
        className="absolute bottom-7 right-6 flex size-14 items-center justify-center rounded-full border border-white/20 bg-white/14 text-white backdrop-blur-sm"
      >
        <ChevronRight className="size-7" />
      </button>
    </section>
  );
}
