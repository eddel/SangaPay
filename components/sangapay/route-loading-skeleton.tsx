import { AppShell } from "@/components/sangapay/app-shell";

export function RouteLoadingSkeleton({
  title,
  caption,
  sheet = false,
}: {
  title: string;
  caption: string;
  sheet?: boolean;
}) {
  const card = (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className="space-y-4"
    >
      <div className="loading-shimmer h-3 w-20 rounded-full" />
      <div className="loading-shimmer h-10 w-44 rounded-[18px]" />
      <div className="loading-shimmer h-24 rounded-[28px]" />
      <div className="grid grid-cols-2 gap-3">
        <div className="loading-shimmer h-24 rounded-[24px]" />
        <div className="loading-shimmer h-24 rounded-[24px]" />
      </div>
      <div className="loading-shimmer h-40 rounded-[28px]" />
      <p className="text-sm text-slate-500">{caption}</p>
      <span className="sr-only">{title}</span>
    </div>
  );

  if (sheet) {
    return (
      <AppShell>
        <div className="-mx-4 -mt-[calc(18px+env(safe-area-inset-top))] min-h-dvh bg-[rgba(6,18,38,0.5)] px-4 pb-[calc(24px+env(safe-area-inset-bottom))] pt-[calc(18px+env(safe-area-inset-top))] backdrop-blur-sm">
          <div className="flex min-h-[calc(100dvh-36px-env(safe-area-inset-top))] items-end">
            <section className="w-full rounded-[34px] border border-slate-200 bg-white px-5 pb-6 pt-4 shadow-[0_24px_56px_rgba(15,23,42,0.22)]">
              <div className="mx-auto h-1.5 w-12 rounded-full bg-slate-200" />
              <div className="mt-5">{card}</div>
            </section>
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <section className="rounded-[32px] border border-slate-200 bg-white p-5 shadow-[var(--shadow-card)]">
        {card}
      </section>
    </AppShell>
  );
}
