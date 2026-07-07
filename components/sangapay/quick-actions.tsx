import Link from "next/link";
import { ArrowUpRight, Plus, SendHorizontal } from "lucide-react";

const actions = [
  { label: "Send EUR", icon: SendHorizontal, href: "/app/send-eur" },
  { label: "Send Crypto", icon: ArrowUpRight, href: "/app/send-crypto" },
  { label: "Add Money", icon: Plus, href: "/app/add-money" },
] as const;

export function QuickActions() {
  return (
    <section
      aria-label="Quick actions"
      className="mt-8 rounded-[30px] border border-slate-200 bg-white p-2 shadow-[var(--shadow-card)]"
    >
      <div className="grid grid-cols-3 divide-x divide-slate-200">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.label}
              aria-label={action.label}
              href={action.href}
              className="px-4 py-5 text-center"
            >
              <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-sm">
                <Icon className="size-6" />
              </span>
              <span className="mt-4 block text-[1.05rem] font-semibold tracking-[-0.03em] text-slate-950">
                {action.label}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
