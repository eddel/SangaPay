export default function OfflinePage() {
  return (
    <main className="min-h-dvh bg-[var(--color-app)] px-4 pt-[calc(18px+env(safe-area-inset-top))]">
      <section className="mx-auto flex min-h-dvh w-full max-w-[430px] flex-col justify-center rounded-[32px] bg-white px-6 py-8 text-center shadow-[var(--shadow-card)]">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
          Offline
        </p>
        <h1 className="mt-4 text-3xl font-semibold text-slate-950">
          SangaPay is available in read-only mode.
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-500">
          Cached balances, rates, and recent activity remain visible. New
          transfers require a connection and keep their drafts when you return
          online.
        </p>
      </section>
    </main>
  );
}
