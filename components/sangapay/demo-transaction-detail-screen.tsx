"use client";

import { Download } from "lucide-react";
import { AppShell } from "@/components/sangapay/app-shell";
import { ScreenHeader } from "@/components/sangapay/screen-header";
import { demoSession } from "@/lib/mock/session";
import { shareReceipt } from "@/lib/native-actions";

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-slate-100 py-4 last:border-b-0">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="text-right text-sm font-semibold text-slate-950">{value}</span>
    </div>
  );
}

export function DemoTransactionDetailScreen({ id }: { id: string }) {
  const transaction = demoSession.historyTransactions.find((item) => item.id === id);

  if (!transaction) {
    return (
      <AppShell>
        <ScreenHeader
          title="Transaction"
          subtitle="This record could not be found in the demo dataset."
          backHref="/app/history"
        />
      </AppShell>
    );
  }

  const currentTransaction = transaction;

  async function handleShareReceipt() {
    await shareReceipt({
      title: "SangaPay transaction receipt",
      text: `Transaction ID: ${currentTransaction.id}\nRecipient: ${currentTransaction.detail.recipient}\nDestination: ${currentTransaction.detail.destination}\nPayout: ${currentTransaction.detail.payout}\nDebit: ${currentTransaction.detail.debit}\nFee: ${currentTransaction.detail.fee}\nStatus: ${currentTransaction.status}`,
    });
  }

  return (
    <AppShell>
      <ScreenHeader
        title="Transaction"
        subtitle={`${currentTransaction.title} - ${currentTransaction.type}`}
        backHref="/app/history"
        badge={currentTransaction.status}
      />

      <section className="-mt-4 rounded-[32px] border border-slate-200 bg-white p-5 shadow-[var(--shadow-card)]">
        <div className="rounded-[28px] bg-slate-950 px-5 py-5 text-white">
          <p className="text-sm text-white/64">Amount</p>
          <p className="mt-2 text-[2.1rem] font-semibold leading-none tracking-[-0.06em]">
            {currentTransaction.amountLabel}
          </p>
          <p className="mt-3 text-sm text-emerald-300">{currentTransaction.detail.timeline}</p>
        </div>

        <div className="mt-4 rounded-[26px] border border-slate-200 px-5">
          <Row label="Transaction ID" value={currentTransaction.id} />
          <Row label="Recipient" value={currentTransaction.detail.recipient} />
          <Row label="Destination" value={currentTransaction.detail.destination} />
          <Row label="Payout" value={currentTransaction.detail.payout} />
          <Row label="Debit" value={currentTransaction.detail.debit} />
          <Row label="Fee" value={currentTransaction.detail.fee} />
          <Row label="Rate" value={currentTransaction.detail.rate} />
          <Row label="Status" value={currentTransaction.status} />
        </div>

        <button
          type="button"
          onClick={handleShareReceipt}
          className="mt-5 flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-5 text-base font-semibold text-white"
        >
          <Download className="size-5" />
          Download receipt
        </button>
      </section>
    </AppShell>
  );
}
