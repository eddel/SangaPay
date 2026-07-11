import type { ReactNode } from "react";

export default function EntryLayout({ children }: { children: ReactNode }) {
  return (
    <main id="main-content" className="min-h-dvh bg-transparent text-slate-950">
      <section className="mx-auto flex min-h-dvh w-full max-w-[430px] flex-col px-4 pb-[calc(32px+env(safe-area-inset-bottom))] pt-[calc(18px+env(safe-area-inset-top))]">
        {children}
      </section>
    </main>
  );
}
