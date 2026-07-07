import Link from "next/link";
import { Bell } from "lucide-react";

type TopBarProps = {
  firstName: string;
};

export function TopBar({ firstName }: TopBarProps) {
  return (
    <header className="-mx-4 -mt-[calc(18px+env(safe-area-inset-top))] rounded-b-[30px] bg-[radial-gradient(circle_at_top_left,_rgba(25,211,128,0.12),_transparent_32%),linear-gradient(145deg,#061631_0%,#071a36_48%,#061226_100%)] px-6 pb-28 pt-[calc(28px+env(safe-area-inset-top))] text-white shadow-[0_22px_46px_rgba(6,22,49,0.22)]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="inline-flex size-12 items-center justify-center rounded-[14px] bg-linear-to-br from-emerald-300 via-emerald-400 to-emerald-600 text-xl font-semibold text-slate-950 shadow-lg"
          >
            S
          </span>
          <p className="text-[2.05rem] font-semibold tracking-[-0.08em] drop-shadow-sm">
            SangaPay
          </p>
        </div>
        <Link
          aria-label="Notifications"
          href="/app/notifications"
          className="relative flex size-[58px] items-center justify-center rounded-full border border-white/35 bg-white/5 text-white/95"
        >
          <Bell className="size-7" />
          <span className="absolute right-2 top-1.5 size-3 rounded-full bg-emerald-400" />
        </Link>
      </div>
      <h1 className="mt-11 text-[1.7rem] font-medium tracking-[-0.05em] text-white/78">
        Good morning, <span className="font-semibold text-emerald-400">{firstName}</span>
      </h1>
    </header>
  );
}
