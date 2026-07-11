"use client";

import { useMemo, useState } from "react";
import { BellRing, CheckCheck, Trash2, TrendingUp, Wallet } from "lucide-react";
import { AppShell } from "@/components/sangapay/app-shell";
import { BottomNav } from "@/components/sangapay/bottom-nav";
import { RouteLoadingSkeleton } from "@/components/sangapay/route-loading-skeleton";
import { ScreenHeader } from "@/components/sangapay/screen-header";
import { useSimulatedLoading } from "@/components/sangapay/use-simulated-loading";
import { demoSession } from "@/lib/mock/session";

type Notification = (typeof demoSession.notifications)[number] & {
  read: boolean;
};

export function DemoNotificationsScreen() {
  const isLoading = useSimulatedLoading();
  const [notifications, setNotifications] = useState<Notification[]>(
    demoSession.notifications.map((notification) => ({
      ...notification,
      read: false,
    })),
  );

  const unreadCount = useMemo(
    () => notifications.filter((notification) => !notification.read).length,
    [notifications],
  );

  if (isLoading) {
    return (
      <RouteLoadingSkeleton
        title="Loading notifications"
        caption="Refreshing transfer and rate alerts"
      />
    );
  }

  function markAsRead(id: string) {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
    );
  }

  function markAllAsRead() {
    setNotifications((current) =>
      current.map((notification) => ({ ...notification, read: true })),
    );
  }

  function clearAll() {
    setNotifications([]);
  }

  return (
    <AppShell>
      <ScreenHeader
        title="Notifications"
        subtitle="Transfer updates, rate alerts, and security signals appear here."
        badge={unreadCount > 0 ? `${unreadCount} new` : "All caught up"}
      />

      <section className="-mt-4 rounded-[32px] border border-slate-200 bg-white p-4 shadow-[var(--shadow-card)]">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-semibold text-slate-600">Inbox actions</p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={markAllAsRead}
              disabled={notifications.length === 0 || unreadCount === 0}
              className="rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 disabled:opacity-40"
            >
              Mark all as read
            </button>
            <button
              type="button"
              onClick={clearAll}
              disabled={notifications.length === 0}
              className="rounded-full bg-slate-950 px-3 py-2 text-xs font-semibold text-white disabled:opacity-40"
            >
              Clear notifications
            </button>
          </div>
        </div>
      </section>

      <section className="mt-3 space-y-3">
        {notifications.length === 0 ? (
          <article className="rounded-[28px] border border-slate-200 bg-white px-5 py-8 text-center shadow-[var(--shadow-card)]">
            <p className="text-base font-semibold tracking-[-0.03em] text-slate-950">
              No notifications
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              New transfer and rate updates will appear here.
            </p>
          </article>
        ) : (
          notifications.map((notification) => {
            const Icon =
              notification.kind === "rate"
                ? TrendingUp
                : notification.kind === "crypto"
                  ? Wallet
                  : BellRing;

            return (
              <article
                key={notification.id}
                className={`rounded-[28px] border bg-white px-4 py-4 shadow-[var(--shadow-card)] ${
                  notification.read ? "border-slate-200" : "border-emerald-200"
                }`}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`flex size-11 shrink-0 items-center justify-center rounded-full ${
                      notification.tone === "success"
                        ? "bg-emerald-50 text-emerald-600"
                        : notification.tone === "pending"
                          ? "bg-amber-50 text-amber-600"
                          : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    <Icon className="size-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-base font-semibold tracking-[-0.03em] text-slate-950">
                          {notification.title}
                        </p>
                        <p className="mt-1 text-sm leading-6 text-slate-600">{notification.body}</p>
                      </div>
                      <div className="shrink-0 text-right">
                        <span className="text-xs font-medium text-slate-400">{notification.time}</span>
                        {!notification.read ? (
                          <span className="ml-auto mt-2 block size-2 rounded-full bg-emerald-500" />
                        ) : null}
                      </div>
                    </div>

                    <div className="mt-4 flex justify-end">
                      {notification.read ? (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-400">
                          <CheckCheck className="size-4" />
                          Read
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => markAsRead(notification.id)}
                          className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700"
                        >
                          <CheckCheck className="size-4" />
                          Mark as read
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </section>

      <BottomNav />
    </AppShell>
  );
}
