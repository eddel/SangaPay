import Link from "next/link";
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
      icon: "🇨🇲",
      name: "CFA Franc",
      amount: (sourceMinor / 100).toLocaleString("en-US"),
      suffix: "XAF",
      accent: "border-emerald-500 bg-white",
    },
    ...items.map((item) => ({
      code: item.destinationCurrency,
      icon: item.destinationCurrency === "EUR" ? "🇪🇺" : "$",
      name: item.destinationCurrency === "EUR" ? "Euro" : "USD Coin",
      amount:
        item.destinationCurrency === "EUR"
          ? formatMoney(item.destinationCurrency, item.destinationMinor)
          : (item.destinationMinor / 100).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }),
      suffix: item.destinationCurrency === "EUR" ? "" : "USDC",
      accent: "border-slate-200 bg-slate-50/70",
    })),
  ];

  return (
    <section aria-label="My pockets" className="mt-7">
      <div className="mb-4 flex items-center justify-between px-2">
        <h2 className="text-[1.35rem] font-semibold tracking-[-0.05em] text-slate-950">
          My pockets
        </h2>
        <Link href="/app/profile" className="text-base font-semibold text-emerald-600">
          Manage
        </Link>
      </div>
      <div className="-mx-4 overflow-x-auto px-4 pb-1">
        <div className="flex gap-3">
          {pocketCards.map((item) => (
            <article
              key={item.code}
              className={`min-h-[128px] min-w-[118px] rounded-[24px] border p-4 shadow-[0_12px_28px_rgba(15,23,42,0.06)] ${item.accent}`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`flex size-10 items-center justify-center rounded-full text-lg shadow-sm ${
                    item.code === "USDC"
                      ? "bg-blue-500 text-white"
                      : "bg-white text-slate-950"
                  }`}
                >
                  {item.icon}
                </span>
                <div>
                  <p className="text-base font-semibold tracking-[-0.04em] text-slate-950">
                    {item.code}
                  </p>
                  <p className="text-sm text-slate-500">{item.name}</p>
                </div>
              </div>
              <p className="mt-8 text-[1.32rem] font-semibold tracking-[-0.05em] text-slate-950">
                {item.amount}
              </p>
              {item.suffix ? <p className="mt-1 text-base text-slate-500">{item.suffix}</p> : null}
            </article>
          ))}
          <article
            aria-hidden="true"
            className="min-h-[128px] min-w-[56px] rounded-[24px] border border-slate-200 bg-slate-50"
          />
        </div>
      </div>
    </section>
  );
}
