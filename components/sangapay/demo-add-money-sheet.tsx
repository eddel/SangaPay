"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, BadgeCheck, Smartphone } from "lucide-react";
import { AppShell } from "@/components/sangapay/app-shell";
import { RouteLoadingSkeleton } from "@/components/sangapay/route-loading-skeleton";
import { useSimulatedLoading } from "@/components/sangapay/use-simulated-loading";

type Provider = "MTN MoMo" | "Orange Money";
type Step = "form" | "success";

const providerMeta: Record<
  Provider,
  { accent: string; helper: string; phonePrefix: string; feeLabel: string }
> = {
  "MTN MoMo": {
    accent: "bg-yellow-50 text-yellow-700 border-yellow-200",
    helper: "Top up instantly from your MTN Mobile Money wallet.",
    phonePrefix: "+237 67",
    feeLabel: "0.4%",
  },
  "Orange Money": {
    accent: "bg-orange-50 text-orange-700 border-orange-200",
    helper: "Use Orange Money for a fast wallet funding request.",
    phonePrefix: "+237 69",
    feeLabel: "0.4%",
  },
};

function formatXaf(amount: number) {
  return `${Math.round(amount).toLocaleString("en-US")} XAF`;
}

export function DemoAddMoneySheet() {
  const isLoading = useSimulatedLoading();
  const [provider, setProvider] = useState<Provider>("MTN MoMo");
  const [amount, setAmount] = useState("100000");
  const [phone, setPhone] = useState("+237 670 000 000");
  const [step, setStep] = useState<Step>("form");

  const numericAmount = Math.max(Number(amount) || 0, 0);
  const fee = numericAmount * 0.004;
  const totalCharge = useMemo(() => numericAmount + fee, [numericAmount]);

  if (isLoading) {
    return <RouteLoadingSkeleton title="Loading add money" caption="Preparing mobile money top up" sheet />;
  }

  return (
    <AppShell>
      <div className="-mx-4 -mt-[calc(18px+env(safe-area-inset-top))] min-h-dvh bg-[rgba(6,18,38,0.5)] px-4 pb-[calc(20px+env(safe-area-inset-bottom))] pt-[calc(18px+env(safe-area-inset-top))] backdrop-blur-sm">
        <div className="flex min-h-[calc(100dvh-36px-env(safe-area-inset-top))] items-end justify-center">
          <section
            role="dialog"
            aria-modal="true"
            aria-label="Add money"
            className="w-full max-w-[360px] rounded-[30px] border border-slate-200 bg-white px-4 pb-5 pt-3.5 shadow-[0_24px_56px_rgba(15,23,42,0.22)]"
          >
            <div className="mx-auto h-1.5 w-12 rounded-full bg-slate-200" />

            <div className="mt-3 flex items-center justify-between gap-4">
              <Link
                href="/app"
                aria-label="Close add money"
                className="flex size-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-950"
              >
                <ArrowLeft className="size-5" />
              </Link>
              <div className="text-right">
                <h1 className="text-[1.6rem] font-semibold tracking-[-0.05em] text-slate-950">
                  Add Money
                </h1>
                <p className="text-sm text-slate-500">Cameroon mobile money top up</p>
              </div>
            </div>

            {step === "form" ? (
              <>
                <div className="mt-5 grid grid-cols-2 gap-2.5">
                  {(["MTN MoMo", "Orange Money"] as Provider[]).map((item) => {
                    const selected = item === provider;
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => {
                          setProvider(item);
                          if (!phone.startsWith(providerMeta[item].phonePrefix)) {
                            setPhone(`${providerMeta[item].phonePrefix}0 000 000`);
                          }
                        }}
                        aria-pressed={selected}
                        className={`rounded-[22px] border px-3.5 py-3.5 text-left ${
                          selected ? "border-emerald-500 bg-emerald-50" : "border-slate-200 bg-white"
                        }`}
                      >
                        <p className="text-sm font-semibold text-slate-950">{item}</p>
                        <p className="mt-2 text-xs leading-5 text-slate-500">
                          {providerMeta[item].helper}
                        </p>
                      </button>
                    );
                  })}
                </div>

                <div className={`mt-3.5 rounded-[22px] border px-4 py-3.5 ${providerMeta[provider].accent}`}>
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-full bg-white/90">
                      <Smartphone className="size-5" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold">{provider}</p>
                      <p className="mt-1 text-xs">{providerMeta[provider].helper}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 space-y-3.5">
                  <label className="block">
                    <span className="text-sm font-semibold text-slate-600">Amount in XAF</span>
                    <input
                      aria-label="Amount in XAF"
                      inputMode="numeric"
                      value={amount}
                      onChange={(event) => setAmount(event.target.value)}
                      className="mt-2 min-h-13 w-full rounded-[20px] border border-slate-200 bg-slate-50 px-4 text-[1.45rem] font-semibold tracking-[-0.04em] text-slate-950 outline-none"
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm font-semibold text-slate-600">Mobile money number</span>
                    <input
                      aria-label="Mobile money number"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      className="mt-2 min-h-13 w-full rounded-[20px] border border-slate-200 bg-slate-50 px-4 text-base font-medium text-slate-950 outline-none"
                    />
                  </label>
                </div>

                <div className="mt-4 rounded-[24px] border border-slate-200 px-4 py-1.5">
                  <div className="flex items-center justify-between gap-4 border-b border-slate-100 py-4">
                    <span className="text-sm text-slate-500">Provider</span>
                    <span className="text-sm font-semibold text-slate-950">{provider}</span>
                  </div>
                  <div className="flex items-center justify-between gap-4 border-b border-slate-100 py-4">
                    <span className="text-sm text-slate-500">Estimated fee</span>
                    <span className="text-sm font-semibold text-slate-950">
                      {formatXaf(fee)} ({providerMeta[provider].feeLabel})
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-4 py-4">
                    <span className="text-sm text-slate-500">Total charge</span>
                    <span className="text-base font-semibold text-slate-950">
                      {formatXaf(totalCharge)}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStep("success")}
                  disabled={numericAmount <= 0 || !phone.trim()}
                  className="mt-4 flex min-h-13 w-full items-center justify-center rounded-full bg-slate-950 px-5 text-base font-semibold text-white disabled:bg-slate-300"
                >
                  Request top up
                </button>
              </>
            ) : (
              <div className="mt-5">
                <div className="rounded-[28px] bg-emerald-500 px-5 py-6 text-center text-white">
                  <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-white text-emerald-600">
                    <BadgeCheck className="size-8" />
                  </span>
                  <h2 className="mt-5 text-[2rem] font-semibold tracking-[-0.05em]">
                    Request sent
                  </h2>
                  <p className="mt-3 text-sm text-white/85">
                    Approve the charge prompt on your {provider} phone number to finish adding money.
                  </p>
                </div>

                <div className="mt-4 rounded-[24px] border border-slate-200 px-4 py-1.5">
                  <div className="flex items-center justify-between gap-4 border-b border-slate-100 py-4">
                    <span className="text-sm text-slate-500">Provider</span>
                    <span className="text-sm font-semibold text-slate-950">{provider}</span>
                  </div>
                  <div className="flex items-center justify-between gap-4 border-b border-slate-100 py-4">
                    <span className="text-sm text-slate-500">Top up amount</span>
                    <span className="text-sm font-semibold text-slate-950">{formatXaf(numericAmount)}</span>
                  </div>
                  <div className="flex items-center justify-between gap-4 border-b border-slate-100 py-4">
                    <span className="text-sm text-slate-500">Mobile money number</span>
                    <span className="text-sm font-semibold text-slate-950">{phone}</span>
                  </div>
                  <div className="flex items-center justify-between gap-4 py-4">
                    <span className="text-sm text-slate-500">Total charge</span>
                    <span className="text-base font-semibold text-slate-950">{formatXaf(totalCharge)}</span>
                  </div>
                </div>

                <Link
                  href="/app"
                  className="mt-4 flex min-h-13 w-full items-center justify-center rounded-full bg-slate-950 px-5 text-base font-semibold text-white"
                >
                  Back to home
                </Link>
              </div>
            )}
          </section>
        </div>
      </div>
    </AppShell>
  );
}
