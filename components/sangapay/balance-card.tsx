import { Eye } from "lucide-react";
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
  const xafLabel = `${(sourceMinor / 100).toLocaleString("en-US")} XAF`;

  return (
    <section
      aria-label={walletLabel}
      className="relative overflow-hidden rounded-[32px] border border-emerald-300/70 bg-linear-to-br from-emerald-500 via-emerald-500 to-emerald-600 p-6 text-white shadow-[var(--shadow-card)]"
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_0%,rgba(255,255,255,0.07)_100%)]" />
      <div className="relative flex items-center justify-between">
        <div>
          <p className="flex items-center gap-2 text-sm font-medium text-white/88">
            Total balance
            <Eye className="size-4" />
          </p>
          <p className="mt-5 text-[3.3rem] font-semibold leading-none tracking-[-0.07em] text-white">
            {xafLabel}
          </p>
        </div>
      </div>
      <div className="relative mt-6 flex flex-wrap items-center gap-3 text-[1rem] text-white/90">
        {eurEquivalent ? <span>~ {formatMoney("EUR", eurEquivalent.destinationMinor)}</span> : null}
        {usdcEquivalent ? <span>{formatMoney("USDC", usdcEquivalent.destinationMinor)}</span> : null}
      </div>
    </section>
  );
}
