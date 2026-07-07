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
      icon: "xaf",
      name: "CFA Franc",
      amount: (sourceMinor / 100).toLocaleString("en-US"),
      suffix: "XAF",
      accent: "border-emerald-500 bg-white",
    },
    ...items.map((item) => ({
      code: item.destinationCurrency,
      icon: item.destinationCurrency === "EUR" ? "eur" : "usdc",
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

  function renderPocketIcon(icon: string) {
    if (icon === "xaf") {
      return (
        <span className="flex size-10 overflow-hidden rounded-full shadow-sm">
          <span className="flex-1 bg-emerald-600" />
          <span className="flex flex-1 items-center justify-center bg-red-600">
            <span className="size-1.5 rounded-full bg-yellow-300" />
          </span>
          <span className="flex-1 bg-yellow-400" />
        </span>
      );
    }

    if (icon === "eur") {
      return (
        <span className="relative flex size-10 items-center justify-center rounded-full bg-blue-700 shadow-sm">
          {Array.from({ length: 8 }).map((_, index) => (
            <span
              key={index}
              className="absolute left-1/2 top-1/2 size-1 rounded-full bg-yellow-300"
              style={{
                transform: `translate(-50%, -50%) rotate(${index * 45}deg) translateY(-13px)`,
              }}
            />
          ))}
        </span>
      );
    }

    return (
      <span className="flex size-10 items-center justify-center rounded-full bg-blue-500 text-xl font-semibold text-white shadow-sm">
        $
      </span>
    );
  }

  return (
    <section aria-label="My pockets" className="mt-5">
      <div className="mb-2 flex items-center justify-between px-2">
        <h2 className="text-[1.3rem] font-semibold tracking-[-0.05em] text-slate-950">
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
              className={`h-[118px] min-w-[112px] rounded-[22px] border p-3.5 shadow-[0_12px_28px_rgba(15,23,42,0.06)] ${item.accent}`}
            >
              <div className="flex items-center gap-2.5">
                {renderPocketIcon(item.icon)}
                <div>
                  <p className="text-base font-semibold tracking-[-0.04em] text-slate-950">
                    {item.code}
                  </p>
                  <p className="whitespace-nowrap text-xs text-slate-500">{item.name}</p>
                </div>
              </div>
              <p className="mt-4 whitespace-nowrap text-[1.15rem] font-semibold tracking-[-0.05em] text-slate-950">
                {item.amount}
              </p>
              {item.suffix ? <p className="mt-1 text-sm text-slate-500">{item.suffix}</p> : null}
            </article>
          ))}
          <article
            aria-hidden="true"
            className="h-[118px] min-w-[50px] rounded-[22px] border border-slate-200 bg-slate-50"
          />
        </div>
      </div>
    </section>
  );
}
