import { AppShell } from "@/components/sangapay/app-shell";
import { BottomNav } from "@/components/sangapay/bottom-nav";
import type { BottomNavTab } from "@/components/sangapay/bottom-nav";

type AppPlaceholderPageProps = {
  title: string;
  summary: string;
  activeTab?: BottomNavTab;
};

export function AppPlaceholderPage({
  title,
  summary,
  activeTab,
}: AppPlaceholderPageProps) {
  return (
    <AppShell>
      <section className="rounded-[32px] border border-slate-200 bg-white px-5 py-6 shadow-[var(--shadow-card)]">
        <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
          SangaPay app area
        </p>
        <h1 className="mt-3 text-[28px] font-semibold text-slate-950">
          {title}
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          {summary}
        </p>
      </section>

      <BottomNav activeTab={activeTab} />
    </AppShell>
  );
}
