import Link from "next/link";
import { BadgeDollarSign, Plus, SendHorizontal } from "lucide-react";

const actions = [
  { label: "Send EUR", subtitle: "SEPA Instant", icon: SendHorizontal, href: "/app/send-eur" },
  {
    label: "Send Crypto",
    subtitle: "USDC on-chain",
    icon: BadgeDollarSign,
    href: "/app/send-crypto",
  },
  { label: "Add Money", subtitle: "Top up wallet", icon: Plus, href: "/app/add-money" },
] as const;

export function QuickActions() {
  return (
    <section
      aria-label="Quick actions"
      className="mt-4 rounded-[24px] border border-slate-200 bg-white px-2 py-2.5 shadow-[0_12px_28px_rgba(15,23,42,0.06)]"
    >
      <div className="grid grid-cols-3 divide-x divide-slate-200">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.label}
              aria-label={action.label}
              href={action.href}
              className="px-2 py-0.5 text-center"
            >
              <span className="mx-auto flex size-11 items-center justify-center rounded-full bg-emerald-600 text-white shadow-[0_10px_18px_rgba(16,185,129,0.22)]">
                <Icon className="size-5" />
              </span>
              <span className="mt-2 block whitespace-nowrap text-[0.9rem] font-semibold tracking-[-0.04em] text-slate-950">
                {action.label}
              </span>
              <span className="mt-1 block text-xs font-medium text-slate-500">
                {action.subtitle}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
