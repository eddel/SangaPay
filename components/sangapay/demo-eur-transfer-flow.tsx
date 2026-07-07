"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  BadgeCheck,
  Banknote,
  Check,
  Clock3,
  Copy,
  FileCheck2,
  SendHorizontal,
  Share2,
  ShieldCheck,
} from "lucide-react";
import { AppShell } from "@/components/sangapay/app-shell";
import { BottomNav } from "@/components/sangapay/bottom-nav";

type Step = "amount" | "recipient" | "review" | "sending" | "receipt";

const EUR_RATE_XAF = 655.96;
const FEE_XAF = 1500;
const WALLET_XAF = 2450000;

function formatXaf(value: number) {
  return `${Math.round(value).toLocaleString("en-US")} XAF`;
}

function formatEur(value: number) {
  return `EUR ${value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function normalizeIban(value: string) {
  return value.replace(/\s+/g, "").toUpperCase();
}

function formatIban(value: string) {
  return normalizeIban(value).replace(/(.{4})/g, "$1 ").trim();
}

function StepPill({ activeStep }: { activeStep: Step }) {
  const steps = [
    { key: "amount", label: "Amount" },
    { key: "recipient", label: "Recipient" },
    { key: "review", label: "Review" },
  ] as const;
  const activeIndex = steps.findIndex((step) => step.key === activeStep);
  const completed = activeStep === "sending" || activeStep === "receipt";

  return (
    <div aria-label="Transfer progress" className="mt-6 grid grid-cols-3 gap-2">
      {steps.map((step, index) => {
        const isActive = completed || index <= activeIndex;

        return (
          <div
            key={step.key}
            className={`h-2 rounded-full ${isActive ? "bg-emerald-400" : "bg-white/16"}`}
          >
            <span className="sr-only">{step.label}</span>
          </div>
        );
      })}
    </div>
  );
}

function DetailRow({
  label,
  value,
  tone = "default",
}: {
  label: string;
  value: string;
  tone?: "default" | "success";
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-slate-100 py-4 last:border-b-0">
      <span className="text-sm text-slate-500">{label}</span>
      <span
        className={`text-right text-base font-semibold tracking-[-0.03em] ${
          tone === "success" ? "text-emerald-600" : "text-slate-950"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

export function DemoEurTransferFlow() {
  const [step, setStep] = useState<Step>("amount");
  const [amountXaf, setAmountXaf] = useState(150000);
  const [recipientName, setRecipientName] = useState("");
  const [iban, setIban] = useState("");
  const [note, setNote] = useState("");
  const [ibanError, setIbanError] = useState("");

  const receiveEur = useMemo(() => amountXaf / EUR_RATE_XAF, [amountXaf]);
  const totalDebit = amountXaf + FEE_XAF;
  const remainingBalance = WALLET_XAF - totalDebit;
  const reference = "SGP-EUR-4872";

  function continueToRecipient() {
    setStep("recipient");
  }

  function reviewTransfer() {
    const compactIban = normalizeIban(iban);

    if (compactIban.length < 15) {
      setIbanError("Enter a valid IBAN with at least 15 characters.");
      return;
    }

    setIbanError("");
    setStep("review");
  }

  function confirmTransfer() {
    setStep("sending");
    window.setTimeout(() => setStep("receipt"), 420);
  }

  return (
    <AppShell>
      <header className="-mx-4 -mt-[calc(18px+env(safe-area-inset-top))] rounded-b-[36px] bg-[radial-gradient(circle_at_top_left,_rgba(19,206,125,0.18),_transparent_30%),linear-gradient(180deg,#061631_0%,#09193b_100%)] px-5 pb-7 pt-[calc(22px+env(safe-area-inset-top))] text-white shadow-[var(--shadow-card)]">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/app"
            aria-label="Back to home"
            className="flex size-12 items-center justify-center rounded-full border border-white/15 bg-white/8 text-white"
          >
            <ArrowLeft className="size-5" />
          </Link>
          <div className="rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm font-medium text-white/88">
            SEPA Instant
          </div>
        </div>
        <div className="mt-9">
          <p className="text-sm font-medium text-emerald-300">XAF to EUR</p>
          <h1 className="mt-2 text-[2.45rem] font-semibold leading-none tracking-[-0.06em]">
            {step === "recipient"
              ? "Recipient details"
              : step === "review"
                ? "Review transfer"
                : step === "receipt"
                  ? "Transfer sent"
                  : "Send EUR"}
          </h1>
          <p className="mt-3 text-sm leading-6 text-white/70">
            Convert from your XAF wallet and deliver to a European bank account.
          </p>
        </div>
        <StepPill activeStep={step} />
      </header>

      {step === "amount" ? (
        <section className="-mt-5 rounded-[32px] border border-slate-200 bg-white p-5 shadow-[var(--shadow-card)]">
          <label htmlFor="amount-xaf" className="text-sm font-semibold text-slate-600">
            Amount in XAF
          </label>
          <div className="mt-3 flex items-end justify-between gap-4 rounded-[26px] bg-slate-50 px-4 py-4">
            <input
              id="amount-xaf"
              aria-label="Amount in XAF"
              type="number"
              min={10000}
              max={WALLET_XAF - FEE_XAF}
              value={amountXaf}
              onChange={(event) => setAmountXaf(Number(event.target.value))}
              className="w-full bg-transparent text-[2.35rem] font-semibold leading-none tracking-[-0.06em] text-slate-950 outline-none"
            />
            <span className="pb-1 text-base font-semibold text-slate-500">XAF</span>
          </div>
          <div className="mt-5 rounded-[28px] bg-emerald-50 px-5 py-5">
            <p className="text-sm font-medium text-slate-500">EUR recipient gets</p>
            <p className="mt-2 text-[2rem] font-semibold tracking-[-0.06em] text-emerald-700">
              {formatEur(receiveEur)}
            </p>
            <p className="mt-2 text-sm text-slate-600">1 EUR = 655.96 XAF</p>
          </div>
          <div className="mt-4 rounded-[26px] border border-slate-200 px-5">
            <DetailRow label="Wallet balance" value={formatXaf(WALLET_XAF)} />
            <DetailRow label="Fee" value={formatXaf(FEE_XAF)} />
            <DetailRow label="Total debit" value={formatXaf(totalDebit)} />
            <DetailRow label="Delivery" value="SEPA Instant" tone="success" />
          </div>
          <button
            type="button"
            onClick={continueToRecipient}
            className="mt-5 flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-5 text-base font-semibold text-white shadow-[var(--shadow-card)]"
          >
            Continue to recipient
            <SendHorizontal className="size-5" />
          </button>
        </section>
      ) : null}

      {step === "recipient" ? (
        <section className="-mt-5 rounded-[32px] border border-slate-200 bg-white p-5 shadow-[var(--shadow-card)]">
          <div className="flex items-center gap-3">
            <span className="flex size-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <Banknote className="size-5" />
            </span>
            <div>
              <p className="font-semibold tracking-[-0.03em] text-slate-950">
                European bank account
              </p>
              <p className="text-sm text-slate-500">SEPA Instant compatible recipient</p>
            </div>
          </div>
          <div className="mt-6 space-y-4">
            <label className="block">
              <span className="text-sm font-semibold text-slate-600">Recipient full name</span>
              <input
                aria-label="Recipient full name"
                value={recipientName}
                onChange={(event) => setRecipientName(event.target.value)}
                className="mt-2 min-h-14 w-full rounded-[22px] border border-slate-200 bg-slate-50 px-4 text-base font-medium text-slate-950 outline-none focus:border-emerald-400"
                placeholder="Marie Dubois"
              />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-slate-600">IBAN</span>
              <input
                aria-label="IBAN"
                value={iban}
                onChange={(event) => {
                  setIban(event.target.value.toUpperCase());
                  setIbanError("");
                }}
                className="mt-2 min-h-14 w-full rounded-[22px] border border-slate-200 bg-slate-50 px-4 text-base font-medium uppercase tracking-[0.04em] text-slate-950 outline-none focus:border-emerald-400"
                placeholder="FR14 2004 1010 0505 0001 3M02 606"
              />
              {ibanError ? (
                <p className="mt-2 text-sm font-medium text-red-600">{ibanError}</p>
              ) : null}
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-slate-600">Transfer note</span>
              <input
                aria-label="Transfer note"
                value={note}
                onChange={(event) => setNote(event.target.value)}
                className="mt-2 min-h-14 w-full rounded-[22px] border border-slate-200 bg-slate-50 px-4 text-base font-medium text-slate-950 outline-none focus:border-emerald-400"
                placeholder="Family support"
              />
            </label>
          </div>
          <button
            type="button"
            onClick={reviewTransfer}
            disabled={!recipientName.trim() || !iban.trim()}
            className="mt-6 flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-5 text-base font-semibold text-white shadow-[var(--shadow-card)] disabled:bg-slate-300"
          >
            Review transfer
            <FileCheck2 className="size-5" />
          </button>
        </section>
      ) : null}

      {step === "review" ? (
        <section
          aria-label="Transfer review"
          className="-mt-5 rounded-[32px] border border-slate-200 bg-white p-5 shadow-[var(--shadow-card)]"
        >
          <div className="rounded-[28px] bg-slate-950 px-5 py-5 text-white">
            <p className="text-sm text-white/64">Recipient gets</p>
            <p className="mt-2 text-[2.35rem] font-semibold leading-none tracking-[-0.06em]">
              {formatEur(receiveEur)}
            </p>
            <p className="mt-3 text-sm text-emerald-300">Arrives in seconds via SEPA Instant</p>
          </div>
          <div className="mt-4 rounded-[26px] border border-slate-200 px-5">
            <DetailRow label="Recipient" value={recipientName} />
            <DetailRow label="IBAN" value={formatIban(iban)} />
            <DetailRow label="You send" value={formatXaf(amountXaf)} />
            <DetailRow label="Fee" value={formatXaf(FEE_XAF)} />
            <DetailRow label="Total debit" value={formatXaf(totalDebit)} />
            <DetailRow label="Remaining balance" value={formatXaf(remainingBalance)} />
            <DetailRow label="Note" value={note || "SangaPay transfer"} />
          </div>
          <div className="mt-5 flex items-center gap-3 rounded-[24px] bg-emerald-50 px-4 py-4 text-sm text-emerald-800">
            <ShieldCheck className="size-5 shrink-0" />
            <p>Protected by OTP confirmation, device checks, and bank-grade monitoring.</p>
          </div>
          <button
            type="button"
            onClick={confirmTransfer}
            className="mt-5 flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-emerald-500 px-5 text-base font-semibold text-white shadow-[var(--shadow-card)]"
          >
            Confirm and send
            <Check className="size-5" />
          </button>
        </section>
      ) : null}

      {step === "sending" ? (
        <section
          role="status"
          className="-mt-5 rounded-[32px] border border-slate-200 bg-white px-5 py-10 text-center shadow-[var(--shadow-card)]"
        >
          <span className="mx-auto flex size-16 animate-pulse items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <SendHorizontal className="size-7" />
          </span>
          <p className="mt-5 text-xl font-semibold tracking-[-0.04em] text-slate-950">
            Sending transfer
          </p>
          <p className="mt-2 text-sm text-slate-500">Locking rate and submitting to SEPA.</p>
        </section>
      ) : null}

      {step === "receipt" ? (
        <section className="-mt-5 rounded-[32px] border border-slate-200 bg-white p-5 shadow-[var(--shadow-card)]">
          <div className="rounded-[30px] bg-emerald-500 px-5 py-7 text-center text-white">
            <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-white text-emerald-600">
              <BadgeCheck className="size-8" />
            </span>
            <h2 className="mt-5 text-[2.25rem] font-semibold leading-none tracking-[-0.06em]">
              Transfer sent
            </h2>
            <p className="mt-3 text-sm text-white/86">Arrives in seconds via SEPA Instant</p>
          </div>
          <div className="mt-4 rounded-[26px] border border-slate-200 px-5">
            <DetailRow label="Reference" value={reference} />
            <DetailRow label="Recipient" value={recipientName} />
            <DetailRow label="Paid out" value={formatEur(receiveEur)} />
            <DetailRow label="Debit" value={formatXaf(totalDebit)} />
            <DetailRow label="Status" value="Completed" tone="success" />
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <button
              type="button"
              className="flex min-h-14 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-950"
            >
              <Copy className="size-4" />
              Copy ID
            </button>
            <button
              type="button"
              className="flex min-h-14 items-center justify-center gap-2 rounded-full bg-slate-950 px-4 text-sm font-semibold text-white"
            >
              <Share2 className="size-4" />
              Share receipt
            </button>
          </div>
          <div className="mt-5 flex items-center gap-3 rounded-[24px] bg-slate-50 px-4 py-4 text-sm text-slate-600">
            <Clock3 className="size-5 shrink-0 text-emerald-600" />
            <p>We will keep the transfer status synced in your transaction history.</p>
          </div>
        </section>
      ) : null}

      <BottomNav />
    </AppShell>
  );
}
