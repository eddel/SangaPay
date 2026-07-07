import Link from "next/link";

type LiveRateCardProps = {
  eurLabel: string;
  usdcLabel: string;
  updatedAt: string;
};

export function LiveRateCard({ eurLabel }: LiveRateCardProps) {
  return (
    <section
      aria-label="Live rates"
      className="mt-6 rounded-[22px] border border-emerald-100 bg-emerald-50/70 px-4 py-4 text-slate-950 shadow-[0_10px_24px_rgba(15,23,42,0.04)]"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <h2 className="whitespace-nowrap text-sm font-semibold tracking-[-0.04em] text-slate-950">
            Live rate
          </h2>
          <span className="size-3 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.12)]" />
        </div>
        <p className="whitespace-nowrap text-sm font-semibold tracking-[-0.04em] text-slate-950">
          {eurLabel}
        </p>
        <Link href="/app/rates" className="whitespace-nowrap text-sm font-semibold text-emerald-600">
          View all rates
        </Link>
      </div>
    </section>
  );
}
