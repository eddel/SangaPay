"use client";

import { AppShell } from "@/components/sangapay/app-shell";
import { BalanceCard } from "@/components/sangapay/balance-card";
import { BottomNav } from "@/components/sangapay/bottom-nav";
import { InstallPrompt } from "@/components/sangapay/install-prompt";
import { LiveRateCard } from "@/components/sangapay/live-rate-card";
import { QuickActions } from "@/components/sangapay/quick-actions";
import { RecentTransactionsPreview } from "@/components/sangapay/recent-transactions-preview";
import { RouteLoadingSkeleton } from "@/components/sangapay/route-loading-skeleton";
import { TopBar } from "@/components/sangapay/top-bar";
import { useSimulatedLoading } from "@/components/sangapay/use-simulated-loading";
import { demoRecentTransactions, demoSession } from "@/lib/mock/session";

export function DemoDashboardShell() {
  const isLoading = useSimulatedLoading();

  if (isLoading) {
    return <RouteLoadingSkeleton title="Loading dashboard" caption="Preparing treasury overview" />;
  }

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
        <InstallPrompt />
        <LiveRateCard
          eurLabel={demoSession.rates.eur}
          usdcLabel={demoSession.rates.usdc}
          updatedAt={demoSession.rates.updatedAt}
        />
        <RecentTransactionsPreview transactions={demoRecentTransactions} />
      </div>

      <BottomNav activeTab="home" />
    </AppShell>
  );
}
