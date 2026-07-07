import type { CurrencyCode } from "@/lib/money/convert";

const formatters: Record<CurrencyCode, Intl.NumberFormat> = {
  XAF: new Intl.NumberFormat("fr-CM", {
    style: "currency",
    currency: "XAF",
    maximumFractionDigits: 0,
  }),
  EUR: new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }),
  USDC: new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }),
};

export function formatMoney(currency: CurrencyCode, minor: number) {
  if (currency === "USDC") {
    return `${formatters.USDC.format(minor / 100)} USDC`;
  }

  return formatters[currency].format(minor / 100);
}
