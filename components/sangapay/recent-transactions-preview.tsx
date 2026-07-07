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
      className="mt-8 rounded-[30px] bg-white px-4 pb-4 pt-1 shadow-[var(--shadow-card)]"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-[2rem] font-semibold tracking-[-0.05em] text-slate-950">
          Recent transactions
        </h2>
      </div>
      <div className="mt-4 space-y-3">
        {transactions.map((transaction) => (
          <article
            key={transaction.id}
            className="rounded-[22px] border-b border-slate-100 px-2 py-4 last:border-b-0"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex min-w-0 items-start gap-3">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-xl font-semibold text-emerald-600">
                  {transaction.title
                    .split(" ")
                    .slice(0, 2)
                    .map((part) => part[0])
                    .join("")}
                </div>
                <div>
                  <p className="text-[1.1rem] font-semibold tracking-[-0.03em] text-slate-950">
                    {transaction.title}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    {transaction.subtitle} -{" "}
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
              <div className="text-right">
                <p className="text-[1.1rem] font-semibold tracking-[-0.03em] text-slate-950">
                  {transaction.amountLabel}
                </p>
                <p className="mt-1 text-sm text-slate-500">{transaction.meta}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
