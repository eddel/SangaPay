import type { CurrencyCode } from "@/lib/money/convert";
import { formatMoney } from "@/lib/money/format";

type Equivalent = {
  destinationCurrency: Exclude<CurrencyCode, "XAF">;
  destinationMinor: number;
  label: string;
};

export function EquivalentCardRow({
  sourceMinor,
  items,
}: {
  sourceMinor: number;
  items: Equivalent[];
}) {
  const pocketCards = [
    {
      code: "XAF" as const,
      tag: "Main wallet",
      name: "CFA Franc",
      amount: `${(sourceMinor / 100).toLocaleString("en-US")} XAF`,
      accent: "border-emerald-500 bg-white",
      amountClass:
        "mt-10 text-[2rem] font-semibold tracking-[-0.05em] text-slate-950",
    },
    ...items.map((item) => ({
      code: item.destinationCurrency,
      tag: "Equivalent view",
      name: item.destinationCurrency === "EUR" ? "Euro" : "USD Coin",
      amount: formatMoney(item.destinationCurrency, item.destinationMinor),
      accent: "border-slate-200 bg-slate-50/70",
      amountClass:
        "mt-10 text-[1.6rem] font-medium tracking-[-0.03em] text-slate-700",
    })),
  ];

  return (
    <section aria-label="My pockets" className="mt-7">
      <div className="mb-4">
        <h2 className="text-[2rem] font-semibold tracking-[-0.05em] text-slate-950">
          My pockets
        </h2>
      </div>
      <div className="overflow-x-auto pb-1">
        <div className="flex gap-4">
          {pocketCards.map((item) => (
            <article
              key={item.code}
              className={`min-w-[168px] rounded-[28px] border p-5 shadow-[var(--shadow-card)] ${item.accent}`}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                {item.tag}
              </p>
              <p className="mt-3 text-[2rem] font-semibold tracking-[-0.05em] text-slate-950">
                {item.code}
              </p>
              <p className="mt-1 text-base text-slate-500">{item.name}</p>
              <p className={item.amountClass}>{item.amount}</p>
            </article>
          ))}
        </div>
      </div>
      <p className="mt-3 text-sm text-slate-500">
        Equivalent views only - no separate funded wallets
      </p>
    </section>
  );
}
