type LiveRateCardProps = {
  eurLabel: string;
  usdcLabel: string;
  updatedAt: string;
};

export function LiveRateCard({ eurLabel }: LiveRateCardProps) {
  return (
    <section
      aria-label="Live rates"
      className="mt-4 rounded-[18px] border border-emerald-100 bg-emerald-50/70 px-3.5 py-3 text-slate-950 shadow-[0_8px_20px_rgba(15,23,42,0.035)]"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <h2 className="whitespace-nowrap text-[13px] font-semibold text-slate-950">
            Live rate
          </h2>
          <span className="size-2.5 rounded-full bg-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,0.12)]" />
        </div>
        <p className="whitespace-nowrap text-[13px] font-semibold text-slate-950">
          {eurLabel}
        </p>
      </div>
    </section>
  );
}
