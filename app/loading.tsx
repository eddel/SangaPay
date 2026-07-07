export default function Loading() {
  return (
    <main className="min-h-dvh bg-[var(--color-app)] px-4 pt-[calc(18px+env(safe-area-inset-top))]">
      <section className="mx-auto flex min-h-dvh w-full max-w-[430px] flex-col gap-4">
        <div className="h-28 animate-pulse rounded-[32px] bg-slate-200" />
        <div className="h-44 animate-pulse rounded-[32px] bg-emerald-200" />
        <div className="h-24 animate-pulse rounded-[24px] bg-slate-200" />
        <div className="h-44 animate-pulse rounded-[28px] bg-slate-200" />
      </section>
    </main>
  );
}
