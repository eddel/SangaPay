"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Clock3, House, Landmark, UserRound } from "lucide-react";

const items = [
  { key: "home", label: "Home", icon: House, href: "/app" },
  { key: "rates", label: "Rates", icon: Landmark, href: "/app/rates" },
  { key: "history", label: "History", icon: Clock3, href: "/app/history" },
  { key: "profile", label: "Profile", icon: UserRound, href: "/app/profile" },
];

export type BottomNavTab = (typeof items)[number]["key"];

function getActiveTab(pathname: string | null): BottomNavTab | undefined {
  if (!pathname) {
    return undefined;
  }

  return items.find((item) => {
    if (item.href === "/app") {
      return pathname === item.href;
    }

    return pathname === item.href || pathname.startsWith(`${item.href}/`);
  })?.key;
}

export function BottomNav({ activeTab }: { activeTab?: BottomNavTab }) {
  const pathname = usePathname();
  const currentTab = activeTab ?? getActiveTab(pathname);

  return (
    <nav
      aria-label="Primary navigation"
      className="fixed inset-x-0 bottom-0 mx-auto flex w-full max-w-[430px] items-center justify-between border-t border-slate-200 bg-white/95 px-6 py-3 backdrop-blur-xl"
    >
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = item.key === currentTab;
        const itemClass = "flex flex-col items-center gap-1 text-[11px] font-medium";
        const iconClass = isActive
          ? "flex size-10 items-center justify-center rounded-full text-emerald-600"
          : "flex size-10 items-center justify-center rounded-full text-slate-400";
        const labelClass = isActive ? "text-emerald-600" : "text-slate-400";

        return (
          <Link
            key={item.label}
            aria-current={isActive ? "page" : undefined}
            href={item.href}
            className={`${itemClass} relative`}
          >
            {isActive ? (
              <span className="absolute -top-3 h-1 w-10 rounded-full bg-emerald-500" />
            ) : null}
            <span className={iconClass}>
              <Icon className="size-5" />
            </span>
            <span className={labelClass}>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
