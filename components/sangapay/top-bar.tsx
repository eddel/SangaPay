import Link from "next/link";
import { Bell } from "lucide-react";

type TopBarProps = {
  firstName: string;
};

export function TopBar({ firstName }: TopBarProps) {
  return (
    <header className="-mx-4 -mt-[calc(18px+env(safe-area-inset-top))] rounded-b-[36px] bg-[radial-gradient(circle_at_top_left,_rgba(19,206,125,0.16),_transparent_28%),linear-gradient(180deg,#061631_0%,#09193b_100%)] px-5 pb-10 pt-[calc(24px+env(safe-area-inset-top))] text-white shadow-[var(--shadow-card)]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="inline-flex size-10 items-center justify-center rounded-2xl bg-linear-to-br from-emerald-300 via-emerald-400 to-emerald-600 text-lg font-semibold text-slate-950 shadow-lg"
          >
            S
          </span>
          <p className="text-[1.95rem] font-semibold tracking-[-0.05em]">SangaPay</p>
        </div>
        <Link
          aria-label="Notifications"
          href="/app/notifications"
          className="relative flex min-h-12 min-w-12 items-center justify-center rounded-full border border-white/20 bg-white/6 px-3 text-white/90"
        >
          <Bell className="size-5" />
          <span className="absolute right-3 top-3 size-2.5 rounded-full bg-emerald-400" />
        </Link>
      </div>
      <h1 className="mt-12 text-[2rem] font-medium tracking-[-0.04em] text-white/90">
        Good morning, <span className="font-semibold text-emerald-400">{firstName}</span>
      </h1>
    </header>
  );
}
