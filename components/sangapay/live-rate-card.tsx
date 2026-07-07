type LiveRateCardProps = {
  eurLabel: string;
  usdcLabel: string;
  updatedAt: string;
};

export function LiveRateCard({
  eurLabel,
  usdcLabel,
  updatedAt,
}: LiveRateCardProps) {
  return (
    <section
      aria-label="Live rates"
      className="mt-8 rounded-[28px] border border-emerald-100 bg-emerald-50/70 px-5 py-5 text-slate-950 shadow-[var(--shadow-card)]"
    >
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <div className="size-3 rounded-full bg-emerald-500" />
        <h2 className="text-xl font-semibold tracking-[-0.04em] text-slate-950">
          Live rate
        </h2>
        <p className="text-sm text-slate-500">{updatedAt}</p>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-base text-slate-700">
        <p>{eurLabel}</p>
        <p>{usdcLabel}</p>
      </div>
    </section>
  );
}
