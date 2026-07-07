"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Clock3, House, UserRound } from "lucide-react";

const items = [
  { key: "home", label: "Home", icon: House, href: "/app" },
  { key: "rates", label: "Rates", icon: BarChart3, href: "/app/rates" },
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
      className="fixed inset-x-0 bottom-0 mx-auto flex w-full max-w-[430px] items-center justify-between border-t border-slate-200 bg-white/95 px-8 pb-[calc(12px+env(safe-area-inset-bottom))] pt-5 backdrop-blur-xl"
    >
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = item.key === currentTab;
        const itemClass = "flex flex-col items-center gap-1.5 text-[12px] font-medium";
        const iconClass = isActive
          ? "flex size-10 items-center justify-center rounded-full text-emerald-600"
          : "flex size-10 items-center justify-center rounded-full text-slate-950";
        const labelClass = isActive ? "text-emerald-600" : "text-slate-950";

        return (
          <Link
            key={item.label}
            aria-current={isActive ? "page" : undefined}
            href={item.href}
            className={`${itemClass} relative`}
          >
            {isActive ? (
              <span className="absolute -top-5 h-1 w-11 rounded-full bg-emerald-500" />
            ) : null}
            <span className={iconClass}>
              <Icon className="size-7" />
            </span>
            <span className={labelClass}>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
