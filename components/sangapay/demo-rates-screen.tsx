"use client";

import { useMemo, useState } from "react";
import { ArrowUpDown } from "lucide-react";
import { AppShell } from "@/components/sangapay/app-shell";
import { BottomNav } from "@/components/sangapay/bottom-nav";
import { RouteLoadingSkeleton } from "@/components/sangapay/route-loading-skeleton";
import { ScreenHeader } from "@/components/sangapay/screen-header";
import { useSimulatedLoading } from "@/components/sangapay/use-simulated-loading";
import { demoSession } from "@/lib/mock/session";

type Currency = "EUR" | "XAF" | "USDC";

const USDC_POINTS = [614.7, 615.0, 614.8, 615.3, 615.1, 615.7, 615.55];

const CONVERSION_RATES: Record<string, number> = {
  "EUR:XAF": 655.96,
  "EUR:USDC": 1.0657,
  "XAF:EUR": 1 / 655.96,
  "XAF:USDC": 1 / 615.55,
  "USDC:XAF": 615.55,
  "USDC:EUR": 0.9383,
};

const FEE_RATES: Record<string, number> = {
  "EUR:XAF": 0.008,
  "EUR:USDC": 0.008,
  "XAF:EUR": 0.008,
  "XAF:USDC": 0.008,
  "USDC:XAF": 0.008,
  "USDC:EUR": 0.008,
};

function formatAmount(currency: Currency, value: number) {
  if (currency === "XAF") {
    return `${Math.round(value).toLocaleString("en-US")} XAF`;
  }

  return `${value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} ${currency}`;
}

function formatRate(source: Currency, target: Currency, rate: number) {
  if (target === "XAF") {
    return `1 ${source} = ${rate.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })} XAF`;
  }

  if (source === "XAF") {
    return `1 ${target} = ${(1 / rate).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })} XAF`;
  }

  return `1 ${source} = ${rate.toLocaleString("en-US", {
    minimumFractionDigits: 4,
    maximumFractionDigits: 4,
  })} ${target}`;
}

function RateChart({ values }: { values: number[] }) {
  const { points, min, max } = useMemo(() => {
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    const spread = maxValue - minValue || 1;
    const coordinates = values
      .map((value, index) => {
        const x = (index / (values.length - 1)) * 100;
        const y = 100 - ((value - minValue) / spread) * 100;
        return `${x},${y}`;
      })
      .join(" ");

    return { points: coordinates, min: minValue, max: maxValue };
  }, [values]);

  return (
    <div className="rounded-[28px] bg-slate-950 px-4 py-4 text-white">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm text-white/64">7 day trend</p>
          <p className="mt-1 text-2xl font-semibold tracking-[-0.04em]">
            {values[values.length - 1].toFixed(2)} XAF
          </p>
        </div>
        <div className="text-right text-xs text-white/64">
          <p>High {max.toFixed(2)}</p>
          <p>Low {min.toFixed(2)}</p>
        </div>
      </div>

      <svg
        viewBox="0 0 100 100"
        role="img"
        aria-label="Exchange rate line chart"
        className="mt-4 h-36 w-full overflow-visible"
      >
        <defs>
          <linearGradient id="rate-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="rgba(16,185,129,0.42)" />
            <stop offset="100%" stopColor="rgba(16,185,129,0.02)" />
          </linearGradient>
        </defs>
        <polyline points={`0,100 ${points} 100,100`} fill="url(#rate-fill)" stroke="none" />
        <polyline
          points={points}
          fill="none"
          stroke="#34d399"
          strokeWidth="3"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

export function DemoRatesScreen() {
  const isLoading = useSimulatedLoading();
  const [sourceCurrency, setSourceCurrency] = useState<Currency>("EUR");
  const [targetCurrency, setTargetCurrency] = useState<Currency>("XAF");
  const [sourceAmount, setSourceAmount] = useState("100");

  const targetOptions = (["EUR", "XAF", "USDC"] as Currency[]).filter(
    (currency) => currency !== sourceCurrency,
  );
  const chartValues =
    sourceCurrency === "USDC" || targetCurrency === "USDC" ? USDC_POINTS : demoSession.rates.points;

  const numericAmount = Math.max(Number(sourceAmount) || 0, 0);
  const rateKey = `${sourceCurrency}:${targetCurrency}`;
  const rate = CONVERSION_RATES[rateKey];
  const feeRate = FEE_RATES[rateKey];
  const convertedValue = numericAmount * rate;
  const feeValue = numericAmount * feeRate;
  const totalQuoteValue = numericAmount + feeValue;

  const quote = {
    convertedAmount: formatAmount(targetCurrency, convertedValue),
    estimatedFee: formatAmount(sourceCurrency, feeValue),
    totalQuote: formatAmount(sourceCurrency, totalQuoteValue),
    currentRate: formatRate(sourceCurrency, targetCurrency, rate),
  };

  if (isLoading) {
    return <RouteLoadingSkeleton title="Loading rates" caption="Refreshing rates and quote preview" />;
  }

  function handleSwap() {
    setSourceCurrency(targetCurrency);
    setTargetCurrency(sourceCurrency);
    setSourceAmount(String(Math.round(convertedValue * 100) / 100));
  }

  return (
    <AppShell>
      <ScreenHeader
        title="Rates"
        subtitle="Watch live conversion levels before you send."
        badge={demoSession.rates.updatedAt}
      />

      <section className="-mt-4 rounded-[32px] border border-slate-200 bg-white p-5 shadow-[var(--shadow-card)]">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-semibold text-slate-600">Convert from {sourceCurrency}</p>
          <button
            type="button"
            aria-label="Swap converting currencies"
            onClick={handleSwap}
            className="flex size-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-950"
          >
            <ArrowUpDown className="size-4" />
          </button>
        </div>
        <div className="mt-3 rounded-[24px] bg-slate-50 px-4 py-4">
          <div className="flex items-end justify-between gap-4">
            <div className="w-full">
              <label htmlFor="reference-amount" className="sr-only">
                Reference amount
              </label>
              <input
                id="reference-amount"
                aria-label="Reference amount"
                inputMode="decimal"
                value={sourceAmount}
                onChange={(event) => setSourceAmount(event.target.value)}
                className="w-full bg-transparent text-[2.25rem] font-semibold leading-none tracking-[-0.06em] text-slate-950 outline-none"
              />
              <p className="mt-2 text-sm text-slate-500">
                {sourceCurrency === "XAF" ? "Main XAF wallet" : `${sourceCurrency} reference amount`}
              </p>
            </div>
            <span className="pb-1 text-base font-semibold text-slate-500">{sourceCurrency}</span>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          {targetOptions.map((item) => {
            const optionRate = CONVERSION_RATES[`${sourceCurrency}:${item}`];
            const optionConverted = formatAmount(item, numericAmount * optionRate);
            const isActive = item === targetCurrency;

            return (
              <button
                key={item}
                type="button"
                onClick={() => setTargetCurrency(item)}
                aria-pressed={isActive}
                className={`rounded-[22px] border px-4 py-4 text-left ${
                  isActive ? "border-emerald-500 bg-emerald-50" : "border-slate-200 bg-white"
                }`}
              >
                <p className="text-sm font-semibold text-slate-950">{item}</p>
                <p className="mt-2 text-lg font-semibold tracking-[-0.03em] text-slate-950">
                  {optionConverted}
                </p>
              </button>
            );
          })}
        </div>

        <div className="mt-4 rounded-[24px] border border-slate-200 px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-medium text-slate-500">Current market rate</p>
            <p className="text-sm font-semibold text-slate-950">{quote.currentRate}</p>
          </div>
          <div className="mt-3 flex items-center justify-between gap-4">
            <p className="text-sm font-medium text-slate-500">Converted amount</p>
            <p className="text-base font-semibold text-emerald-600">{quote.convertedAmount}</p>
          </div>
          <div className="mt-3 flex items-center justify-between gap-4">
            <p className="text-sm font-medium text-slate-500">Estimated fee</p>
            <p className="text-sm font-semibold text-slate-950">{quote.estimatedFee}</p>
          </div>
          <div className="mt-3 flex items-center justify-between gap-4 border-t border-slate-100 pt-3">
            <p className="text-sm font-medium text-slate-500">Total quote</p>
            <p className="text-base font-semibold text-slate-950">{quote.totalQuote}</p>
          </div>
        </div>
      </section>

      <div className="mt-4">
        <RateChart values={chartValues} />
      </div>

      <BottomNav activeTab="rates" />
    </AppShell>
  );
}
