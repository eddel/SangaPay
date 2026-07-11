"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ChevronRight } from "lucide-react";
import { AppShell } from "@/components/sangapay/app-shell";
import { BottomNav } from "@/components/sangapay/bottom-nav";
import { RouteLoadingSkeleton } from "@/components/sangapay/route-loading-skeleton";
import { ScreenHeader } from "@/components/sangapay/screen-header";
import { useSimulatedLoading } from "@/components/sangapay/use-simulated-loading";
import { demoSession } from "@/lib/mock/session";

type Filter = "all" | "completed" | "pending" | "failed";

const filters: Filter[] = ["all", "completed", "pending", "failed"];

export function DemoHistoryScreen() {
  const [filter, setFilter] = useState<Filter>("all");
  const isLoading = useSimulatedLoading();

  const transactions = useMemo(() => {
    if (filter === "all") {
      return demoSession.historyTransactions;
    }

    return demoSession.historyTransactions.filter((item) => item.filter === filter);
  }, [filter]);

  if (isLoading) {
    return <RouteLoadingSkeleton title="Loading history" caption="Preparing transfer activity" />;
  }

  return (
    <AppShell>
      <ScreenHeader
        title="History"
        subtitle="Track every payout, top up, and network status update."
        badge="4 records"
      />

      <section className="-mt-4 rounded-[32px] border border-slate-200 bg-white p-5 shadow-[var(--shadow-card)]">
        <div className="flex flex-wrap gap-2">
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              aria-pressed={item === filter}
              className={`rounded-full px-4 py-2 text-sm font-semibold capitalize ${
                item === filter
                  ? "bg-slate-950 text-white"
                  : "border border-slate-200 bg-white text-slate-600"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mt-5 space-y-3">
          {transactions.map((transaction) => (
            <Link
              key={transaction.id}
              href={`/app/history/${transaction.id}`}
              className="flex items-center justify-between gap-4 rounded-[24px] border border-slate-200 px-4 py-4"
            >
              <div className="min-w-0">
                <p className="truncate text-base font-semibold tracking-[-0.03em] text-slate-950">
                  {transaction.title}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  {transaction.subtitle} - {transaction.meta}
                </p>
                <p
                  className={`mt-2 text-sm font-semibold ${
                    transaction.statusTone === "success"
                      ? "text-emerald-600"
                      : transaction.statusTone === "failed"
                        ? "text-rose-600"
                        : "text-amber-600"
                  }`}
                >
                  {transaction.status}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-right">
                  <p
                    className={`text-sm font-semibold ${
                      transaction.amountLabel.startsWith("+")
                        ? "text-emerald-600"
                        : "text-slate-950"
                    }`}
                  >
                    {transaction.amountLabel}
                  </p>
                </div>
                <ChevronRight className="size-5 text-slate-400" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <BottomNav activeTab="history" />
    </AppShell>
  );
}
