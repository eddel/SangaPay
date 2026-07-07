import Link from "next/link";
import { Bell } from "lucide-react";

type TopBarProps = {
  firstName: string;
};

export function TopBar({ firstName }: TopBarProps) {
  return (
    <header className="-mx-4 -mt-[calc(18px+env(safe-area-inset-top))] rounded-b-[28px] bg-[radial-gradient(circle_at_top_left,_rgba(25,211,128,0.12),_transparent_32%),linear-gradient(145deg,#061631_0%,#071a36_48%,#061226_100%)] px-5 pb-24 pt-[calc(20px+env(safe-area-inset-top))] text-white shadow-[0_22px_46px_rgba(6,22,49,0.22)]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="inline-flex size-9 items-center justify-center rounded-[11px] bg-linear-to-br from-emerald-300 via-emerald-400 to-emerald-600 text-base font-semibold text-slate-950 shadow-lg"
          >
            S
          </span>
          <p className="text-[1.45rem] font-semibold tracking-[-0.04em] drop-shadow-sm">
            SangaPay
          </p>
        </div>
        <Link
          aria-label="Notifications"
          href="/app/notifications"
          className="relative flex size-10 items-center justify-center rounded-full border border-white/35 bg-white/5 text-white/95"
        >
          <Bell className="size-5" />
          <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-emerald-400" />
        </Link>
      </div>
      <h1 className="mt-1 text-[1.1rem] font-medium text-white/78">
        Good morning, <span className="font-semibold text-emerald-400">{firstName}</span>
      </h1>
    </header>
  );
}
