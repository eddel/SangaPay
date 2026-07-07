import { buildEquivalentBalances } from "@/lib/money/convert";

const walletMinor = 245000000;

export const demoSession = {
  user: {
    firstName: "Alain",
  },
  wallet: {
    sourceCurrency: "XAF" as const,
    sourceMinor: walletMinor,
    label: "Main XAF wallet",
    equivalents: buildEquivalentBalances(walletMinor),
  },
  rates: {
    eur: "1 EUR = 655.96 XAF",
    usdc: "1 USDC = 615.55 XAF",
    updatedAt: "Updated 12 sec ago",
  },
  recentTransactions: [
    {
      id: "txn_10428",
      title: "Marie Dubois",
      subtitle: "SEPA Instant",
      meta: "Today, 08:34",
      amountLabel: "-EUR 350.00",
      status: "Sent",
      statusTone: "success" as const,
    },
    {
      id: "txn_10419",
      title: "Binance Wallet",
      subtitle: "USDC",
      meta: "Yesterday, 21:17",
      amountLabel: "-250.00 USDC",
      status: "Completed",
      statusTone: "success" as const,
    },
    {
      id: "txn_10411",
      title: "Wallet top up",
      subtitle: "Mobile Money",
      meta: "Yesterday, 10:42",
      amountLabel: "+1,000,000 XAF",
      status: "Completed",
      statusTone: "success" as const,
    },
  ],
};
