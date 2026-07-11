import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type ScreenHeaderProps = {
  title: string;
  subtitle: string;
  backHref?: string;
  badge?: string;
};

export function ScreenHeader({
  title,
  subtitle,
  backHref = "/app",
  badge,
}: ScreenHeaderProps) {
  return (
    <header className="-mx-4 -mt-[calc(18px+env(safe-area-inset-top))] rounded-b-[32px] bg-[radial-gradient(circle_at_top_left,_rgba(19,206,125,0.16),_transparent_30%),linear-gradient(180deg,#061631_0%,#09193b_100%)] px-5 pb-6 pt-[calc(20px+env(safe-area-inset-top))] text-white shadow-[var(--shadow-card)]">
      <div className="flex items-center justify-between gap-4">
        <Link
          href={backHref}
          aria-label="Back"
          className="flex size-11 items-center justify-center rounded-full border border-white/15 bg-white/8 text-white"
        >
          <ArrowLeft className="size-5" />
        </Link>
        {badge ? (
          <div className="rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm font-medium text-white/88">
            {badge}
          </div>
        ) : (
          <span className="size-11" aria-hidden="true" />
        )}
      </div>

      <div className="mt-8">
        <h1 className="text-[2.2rem] font-semibold leading-none tracking-[-0.06em]">{title}</h1>
        <p className="mt-3 text-sm leading-6 text-white/70">{subtitle}</p>
      </div>
    </header>
  );
}
