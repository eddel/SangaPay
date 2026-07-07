import Link from "next/link";
import { ChevronRight, Download } from "lucide-react";

type Transaction = {
  id: string;
  title: string;
  subtitle: string;
  meta: string;
  amountLabel: string;
  status: string;
  statusTone: "success" | "pending";
};

export function RecentTransactionsPreview({
  transactions,
}: {
  transactions: Transaction[];
}) {
  return (
    <section
      aria-label="Recent transactions"
      className="mt-7 bg-transparent px-2 pb-4"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-[1.35rem] font-semibold tracking-[-0.05em] text-slate-950">
          Recent transactions
        </h2>
        <Link href="/app/history" className="text-base font-semibold text-emerald-600">
          View all
        </Link>
      </div>
      <div className="mt-4">
        {transactions.map((transaction) => (
          <article
            key={transaction.id}
            className="border-b border-slate-200/80 py-3.5 last:border-b-0"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex min-w-0 items-start gap-3">
                <div
                  className={`flex size-14 shrink-0 items-center justify-center rounded-full text-xl font-semibold ${
                    transaction.title === "Binance Wallet"
                      ? "bg-slate-950 text-amber-400"
                      : "bg-emerald-50 text-emerald-600"
                  }`}
                >
                  {transaction.title === "Wallet top up" ? (
                    <Download className="size-7" />
                  ) : transaction.title === "Binance Wallet" ? (
                    "B"
                  ) : (
                    transaction.title
                      .split(" ")
                      .slice(0, 2)
                      .map((part) => part[0])
                      .join("")
                  )}
                </div>
                <div>
                  <p className="whitespace-nowrap text-[1rem] font-semibold tracking-[-0.04em] text-slate-950">
                    {transaction.title}
                  </p>
                  <p className="mt-1.5 text-sm font-medium text-slate-500">
                    {transaction.subtitle}{" "}
                    <span className="text-emerald-600">-</span>{" "}
                    <span
                      className={
                        transaction.statusTone === "success"
                          ? "font-medium text-emerald-600"
                          : "font-medium text-amber-600"
                      }
                    >
                      {transaction.status}
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-right">
                <div className="min-w-[108px]">
                  <p
                    className={`whitespace-nowrap text-[0.95rem] font-semibold tracking-[-0.04em] ${
                      transaction.amountLabel.startsWith("+")
                        ? "text-emerald-600"
                        : "text-slate-950"
                    }`}
                  >
                    {transaction.amountLabel}
                  </p>
                  <p className="mt-1.5 text-sm font-medium text-slate-500">{transaction.meta}</p>
                </div>
                <ChevronRight className="size-5 shrink-0 text-slate-500" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
