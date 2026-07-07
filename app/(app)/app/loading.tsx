import { AppShell } from "@/components/sangapay/app-shell";

export default function Loading() {
  return (
    <AppShell>
      <div
        role="status"
        aria-live="polite"
        aria-busy="true"
        className="space-y-4 animate-pulse"
      >
        <div className="rounded-[32px] bg-slate-200/80 px-5 py-6">
          <div className="h-3 w-32 rounded-full bg-slate-300" />
          <div className="mt-4 h-8 w-56 rounded-full bg-slate-300" />
          <div className="mt-3 h-4 w-full rounded-full bg-slate-300" />
          <div className="mt-2 h-4 w-3/4 rounded-full bg-slate-300" />
        </div>

        <div className="h-44 rounded-[32px] bg-slate-200/80" />
        <div className="grid grid-cols-2 gap-3">
          <div className="h-28 rounded-[28px] bg-slate-200/80" />
          <div className="h-28 rounded-[28px] bg-slate-200/80" />
        </div>
        <div className="h-16 rounded-[24px] bg-slate-200/80" />
        <p className="text-sm text-slate-500">Preparing treasury overview</p>
        <span className="sr-only">Loading dashboard</span>
      </div>
    </AppShell>
  );
}
