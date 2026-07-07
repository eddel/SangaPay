"use client";

import { motion } from "framer-motion";
import { AppShell } from "@/components/sangapay/app-shell";
import { BalanceCard } from "@/components/sangapay/balance-card";
import { BottomNav } from "@/components/sangapay/bottom-nav";
import { EquivalentCardRow } from "@/components/sangapay/equivalent-card-row";
import { LiveRateCard } from "@/components/sangapay/live-rate-card";
import { QuickActions } from "@/components/sangapay/quick-actions";
import { RecentTransactionsPreview } from "@/components/sangapay/recent-transactions-preview";
import { TopBar } from "@/components/sangapay/top-bar";
import { demoSession } from "@/lib/mock/session";

export function DemoDashboardShell() {
  return (
    <AppShell>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <TopBar firstName={demoSession.user.firstName} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08, duration: 0.35, ease: "easeOut" }}
        className="-mt-8"
      >
        <BalanceCard
          sourceMinor={demoSession.wallet.sourceMinor}
          walletLabel={demoSession.wallet.label}
          equivalents={demoSession.wallet.equivalents}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.14, duration: 0.35, ease: "easeOut" }}
      >
        <EquivalentCardRow
          sourceMinor={demoSession.wallet.sourceMinor}
          items={demoSession.wallet.equivalents}
        />
        <QuickActions />
        <LiveRateCard
          eurLabel={demoSession.rates.eur}
          usdcLabel={demoSession.rates.usdc}
          updatedAt={demoSession.rates.updatedAt}
        />
        <RecentTransactionsPreview transactions={demoSession.recentTransactions} />
      </motion.div>

      <BottomNav activeTab="home" />
    </AppShell>
  );
}
