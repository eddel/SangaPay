"use client";

import { AppShell } from "@/components/sangapay/app-shell";
import { BalanceCard } from "@/components/sangapay/balance-card";
import { BottomNav } from "@/components/sangapay/bottom-nav";
import { LiveRateCard } from "@/components/sangapay/live-rate-card";
import { QuickActions } from "@/components/sangapay/quick-actions";
import { RecentTransactionsPreview } from "@/components/sangapay/recent-transactions-preview";
import { TopBar } from "@/components/sangapay/top-bar";
import { demoSession } from "@/lib/mock/session";

export function DemoDashboardShell() {
  return (
    <AppShell>
      <div>
        <TopBar firstName={demoSession.user.firstName} />
      </div>

      <div className="-mt-20">
        <BalanceCard
          sourceMinor={demoSession.wallet.sourceMinor}
          walletLabel={demoSession.wallet.label}
          equivalents={demoSession.wallet.equivalents}
        />
      </div>

      <div>
        <QuickActions />
        <LiveRateCard
          eurLabel={demoSession.rates.eur}
          usdcLabel={demoSession.rates.usdc}
          updatedAt={demoSession.rates.updatedAt}
        />
        <RecentTransactionsPreview transactions={demoSession.recentTransactions} />
      </div>

      <BottomNav activeTab="home" />
    </AppShell>
  );
}
