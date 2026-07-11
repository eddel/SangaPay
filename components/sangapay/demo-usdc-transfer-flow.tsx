"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  BadgeCheck,
  Check,
  Clock3,
  Copy,
  FileCheck2,
  SendHorizontal,
  Share2,
  ShieldCheck,
  Wallet2,
} from "lucide-react";
import { AppShell } from "@/components/sangapay/app-shell";
import { BottomNav } from "@/components/sangapay/bottom-nav";
import { RouteLoadingSkeleton } from "@/components/sangapay/route-loading-skeleton";
import { useSimulatedLoading } from "@/components/sangapay/use-simulated-loading";
import { copyTextToClipboard, shareReceipt } from "@/lib/native-actions";

type Step = "amount" | "wallet" | "review" | "sending" | "receipt";
type Network = "Base" | "Polygon" | "Solana";

const USDC_RATE_XAF = 615.55;
const NETWORK_FEE_XAF: Record<Network, number> = {
  Base: 900,
  Polygon: 1200,
  Solana: 700,
};
const WALLET_XAF = 2450000;
const NETWORK_NOTE: Record<Network, string> = {
  Base: "Low fee routing for EVM wallets and exchanges.",
  Polygon: "Balanced speed and cost for broad exchange support.",
  Solana: "Fast USDC payout for Solana-compatible wallets.",
};

function formatXaf(value: number) {
  return `${Math.round(value).toLocaleString("en-US")} XAF`;
}

function formatUsdc(value: number) {
  return `${value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} USDC`;
}

function maskAddress(value: string) {
  if (value.length <= 10) {
    return value;
  }

  return `${value.slice(0, 6)}...${value.slice(-4)}`;
}

function validateWalletAddress(network: Network, address: string) {
  const trimmed = address.trim();

  if (!trimmed) {
    return "Enter a wallet address.";
  }

  if (network === "Solana") {
    return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(trimmed)
      ? ""
      : "Enter a valid Solana wallet address.";
  }

  return /^0x[a-fA-F0-9]{40}$/.test(trimmed)
    ? ""
    : `Enter a valid ${network} wallet address.`;
}

function StepPill({ activeStep }: { activeStep: Step }) {
  const steps = [
    { key: "amount", label: "Amount" },
    { key: "wallet", label: "Wallet" },
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

export function DemoUsdcTransferFlow() {
  const isLoading = useSimulatedLoading();
  const [step, setStep] = useState<Step>("amount");
  const [amountXaf, setAmountXaf] = useState(150000);
  const [network, setNetwork] = useState<Network>("Base");
  const [walletAddress, setWalletAddress] = useState("");
  const [destinationLabel, setDestinationLabel] = useState("");
  const [addressError, setAddressError] = useState("");
  const [copyLabel, setCopyLabel] = useState("Copy ID");

  const feeXaf = NETWORK_FEE_XAF[network];
  const receiveUsdc = useMemo(() => amountXaf / USDC_RATE_XAF, [amountXaf]);
  const totalDebit = amountXaf + feeXaf;
  const remainingBalance = WALLET_XAF - totalDebit;
  const reference = "SGP-USDC-5831";

  function continueToWallet() {
    setStep("wallet");
  }

  function reviewTransfer() {
    const validationError = validateWalletAddress(network, walletAddress);

    if (validationError) {
      setAddressError(validationError);
      return;
    }

    setAddressError("");
    setStep("review");
  }

  function confirmTransfer() {
    setStep("sending");
    window.setTimeout(() => setStep("receipt"), 420);
  }

  async function handleCopyId() {
    const copied = await copyTextToClipboard(reference);
    setCopyLabel(copied ? "Copied" : "Copy unavailable");
    window.setTimeout(() => setCopyLabel("Copy ID"), 1400);
  }

  async function handleShareReceipt() {
    await shareReceipt({
      title: "SangaPay USDC transfer receipt",
      text: `Transaction ID: ${reference}\nNetwork: ${network}\nWallet: ${maskAddress(walletAddress)}\nPaid out: ${formatUsdc(receiveUsdc)}\nDebit: ${formatXaf(totalDebit)}\nStatus: Completed`,
    });
  }

  if (isLoading) {
    return <RouteLoadingSkeleton title="Loading crypto transfer" caption="Preparing USDC transfer flow" />;
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
            USDC on-chain
          </div>
        </div>
        <div className="mt-9">
          <p className="text-sm font-medium text-emerald-300">XAF to USDC</p>
          <h1 className="mt-2 text-[2.45rem] font-semibold leading-none tracking-[-0.06em]">
            {step === "wallet"
              ? "Wallet details"
              : step === "review"
                ? "Review transfer"
                : step === "receipt"
                  ? "Transfer sent"
                  : "Send USDC"}
          </h1>
          <p className="mt-3 text-sm leading-6 text-white/70">
            Convert from your XAF wallet and deliver USDC to an exchange or external wallet.
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
              max={WALLET_XAF - feeXaf}
              value={amountXaf}
              onChange={(event) => setAmountXaf(Number(event.target.value))}
              className="w-full bg-transparent text-[2.35rem] font-semibold leading-none tracking-[-0.06em] text-slate-950 outline-none"
            />
            <span className="pb-1 text-base font-semibold text-slate-500">XAF</span>
          </div>

          <div className="mt-5">
            <p className="text-sm font-semibold text-slate-600">Network</p>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {(["Base", "Polygon", "Solana"] as Network[]).map((item) => {
                const isActive = item === network;

                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setNetwork(item)}
                    aria-pressed={isActive}
                    className={`min-h-12 rounded-[20px] border px-3 text-sm font-semibold transition ${
                      isActive
                        ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                        : "border-slate-200 bg-white text-slate-700"
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
            <p className="mt-3 text-sm text-slate-500">{NETWORK_NOTE[network]}</p>
          </div>

          <div className="mt-5 rounded-[28px] bg-emerald-50 px-5 py-5">
            <p className="text-sm font-medium text-slate-500">USDC recipient gets</p>
            <p className="mt-2 text-[2rem] font-semibold tracking-[-0.06em] text-emerald-700">
              {formatUsdc(receiveUsdc)}
            </p>
            <p className="mt-2 text-sm text-slate-600">1 USDC = 615.55 XAF</p>
          </div>
          <div className="mt-4 rounded-[26px] border border-slate-200 px-5">
            <DetailRow label="Wallet balance" value={formatXaf(WALLET_XAF)} />
            <DetailRow label="Network fee" value={formatXaf(feeXaf)} />
            <DetailRow label="Total debit" value={formatXaf(totalDebit)} />
            <DetailRow label="Network" value={network} tone="success" />
          </div>
          <button
            type="button"
            onClick={continueToWallet}
            className="mt-5 flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-5 text-base font-semibold text-white shadow-[var(--shadow-card)]"
          >
            Continue to wallet
            <SendHorizontal className="size-5" />
          </button>
        </section>
      ) : null}

      {step === "wallet" ? (
        <section className="-mt-5 rounded-[32px] border border-slate-200 bg-white p-5 shadow-[var(--shadow-card)]">
          <div className="flex items-center gap-3">
            <span className="flex size-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <Wallet2 className="size-5" />
            </span>
            <div>
              <p className="font-semibold tracking-[-0.03em] text-slate-950">USDC wallet</p>
              <p className="text-sm text-slate-500">{network} network destination</p>
            </div>
          </div>
          <div className="mt-6 space-y-4">
            <label className="block">
              <span className="text-sm font-semibold text-slate-600">Wallet address</span>
              <input
                aria-label="Wallet address"
                value={walletAddress}
                onChange={(event) => {
                  setWalletAddress(event.target.value.trim());
                  setAddressError("");
                }}
                className="mt-2 min-h-14 w-full rounded-[22px] border border-slate-200 bg-slate-50 px-4 text-base font-medium text-slate-950 outline-none focus:border-emerald-400"
                placeholder={
                  network === "Solana"
                    ? "7xKXtg2CWb7xY3L4B6A9i6aV2mC7rJv8sUqP5nHd4QzE"
                    : "0x4Cbe58c50480..."
                }
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
              />
              {addressError ? (
                <p className="mt-2 text-sm font-medium text-red-600">{addressError}</p>
              ) : (
                <p className="mt-2 text-sm text-slate-500">
                  Match the address format to the selected network before sending.
                </p>
              )}
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-slate-600">Destination label</span>
              <input
                aria-label="Destination label"
                value={destinationLabel}
                onChange={(event) => setDestinationLabel(event.target.value)}
                className="mt-2 min-h-14 w-full rounded-[22px] border border-slate-200 bg-slate-50 px-4 text-base font-medium text-slate-950 outline-none focus:border-emerald-400"
                placeholder="Binance wallet"
              />
            </label>
          </div>
          <button
            type="button"
            onClick={reviewTransfer}
            disabled={!walletAddress.trim()}
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
              {formatUsdc(receiveUsdc)}
            </p>
            <p className="mt-3 text-sm text-emerald-300">Expected on-chain confirmation in under a minute</p>
          </div>
          <div className="mt-4 rounded-[26px] border border-slate-200 px-5">
            <DetailRow label="Network" value={network} />
            <DetailRow label="Wallet" value={maskAddress(walletAddress)} />
            <DetailRow label="Destination" value={destinationLabel || "External wallet"} />
            <DetailRow label="You send" value={formatXaf(amountXaf)} />
            <DetailRow label="Network fee" value={formatXaf(feeXaf)} />
            <DetailRow label="Total debit" value={formatXaf(totalDebit)} />
            <DetailRow label="Remaining balance" value={formatXaf(remainingBalance)} />
          </div>
          <div className="mt-5 flex items-center gap-3 rounded-[24px] bg-emerald-50 px-4 py-4 text-sm text-emerald-800">
            <ShieldCheck className="size-5 shrink-0" />
            <p>Transfers are protected by address checks, OTP confirmation, and network routing controls.</p>
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
          <p className="mt-2 text-sm text-slate-500">Broadcasting your USDC payout to the selected network.</p>
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
            <p className="mt-3 text-sm text-white/86">USDC is on the way to the recipient wallet</p>
          </div>
          <div className="mt-4 rounded-[26px] border border-slate-200 px-5">
            <DetailRow label="Transaction ID" value={reference} />
            <DetailRow label="Network" value={network} />
            <DetailRow label="Wallet" value={maskAddress(walletAddress)} />
            <DetailRow label="Paid out" value={formatUsdc(receiveUsdc)} />
            <DetailRow label="Debit" value={formatXaf(totalDebit)} />
            <DetailRow label="Status" value="Completed" tone="success" />
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleCopyId}
              className="flex min-h-14 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-950"
            >
              <Copy className="size-4" />
              {copyLabel}
            </button>
            <button
              type="button"
              onClick={handleShareReceipt}
              className="flex min-h-14 items-center justify-center gap-2 rounded-full bg-slate-950 px-4 text-sm font-semibold text-white"
            >
              <Share2 className="size-4" />
              Share receipt
            </button>
          </div>
          <div className="mt-5 flex items-center gap-3 rounded-[24px] bg-slate-50 px-4 py-4 text-sm text-slate-600">
            <Clock3 className="size-5 shrink-0 text-emerald-600" />
            <p>We will keep network status synced in your transaction history.</p>
          </div>
        </section>
      ) : null}

      <BottomNav />
    </AppShell>
  );
}
