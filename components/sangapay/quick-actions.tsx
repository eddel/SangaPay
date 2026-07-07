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
      className="mt-4 rounded-[20px] border border-slate-200 bg-white px-0 py-3 shadow-[0_10px_24px_rgba(15,23,42,0.05)]"
    >
      <div className="grid grid-cols-3 divide-x divide-slate-200">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.label}
              aria-label={action.label}
              href={action.href}
              className="px-2 text-center"
            >
              <span className="mx-auto flex size-9 items-center justify-center rounded-full bg-emerald-600 text-white shadow-[0_8px_16px_rgba(16,185,129,0.2)]">
                <Icon className="size-[18px]" />
              </span>
              <span className="mt-2 block whitespace-nowrap text-sm font-semibold leading-tight text-slate-950">
                {action.label}
              </span>
              <span className="mt-0.5 block whitespace-nowrap text-xs font-normal leading-tight text-slate-500">
                {action.subtitle}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
