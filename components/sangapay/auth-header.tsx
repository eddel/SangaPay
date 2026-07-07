import type { ReactNode } from "react";

type AuthHeaderProps = {
  badge: string;
  title: string;
  description: string;
  eyebrow?: string;
  aside?: ReactNode;
};

export function AuthHeader({
  badge,
  title,
  description,
  eyebrow = "SangaPay Secure Access",
  aside,
}: AuthHeaderProps) {
  return (
    <header className="pt-4">
      <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
        <span className="inline-flex size-2 rounded-full bg-emerald-500" />
        {badge}
      </div>
      <p className="mt-5 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
        {eyebrow}
      </p>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-[-0.05em] text-slate-950">
            {title}
          </h1>
          <p className="mt-3 max-w-[21rem] text-sm leading-6 text-slate-500">
            {description}
          </p>
        </div>
        {aside}
      </div>
    </header>
  );
}
