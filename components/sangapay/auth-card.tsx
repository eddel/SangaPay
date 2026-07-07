import type { ReactNode } from "react";

type AuthCardProps = {
  accent: string;
  children: ReactNode;
  footer?: ReactNode;
};

export function AuthCard({ accent, children, footer }: AuthCardProps) {
  return (
    <section className="mt-6 overflow-hidden rounded-[28px] border border-[var(--color-ring)] bg-white">
      <div className={`h-1 w-full bg-gradient-to-r ${accent}`} />
      <div className="space-y-5 p-6">{children}</div>
      {footer ? (
        <div className="border-t border-slate-100 px-6 py-4">
          {footer}
        </div>
      ) : null}
    </section>
  );
}
