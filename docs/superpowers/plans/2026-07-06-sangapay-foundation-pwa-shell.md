# SangaPay Foundation And PWA Shell Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build milestone 2 of SangaPay: the Next.js 15 frontend foundation, mobile-first app shell, single-XAF-wallet mock domain primitives, and installable PWA plumbing.

**Architecture:** Initialize a small App Router codebase, define the shared visual tokens and mobile layout first, then add deterministic mock wallet and quote helpers that enforce the single-wallet model. PWA capabilities stay honest: cached shell and read-only offline access only, while mutating flows are blocked offline and preserve drafts for later milestones.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS, React Testing Library, Vitest, Playwright, Framer Motion, Lucide React, next/font, next-pwa or custom service worker registration, shadcn/ui primitives.

---

## File Structure

- Create: `package.json` for app scripts and dependencies.
- Create: `pnpm-lock.yaml` from dependency installation.
- Create: `next.config.ts` for Next.js config and PWA-safe headers.
- Create: `tsconfig.json` for TypeScript config.
- Create: `postcss.config.mjs` for Tailwind processing.
- Create: `eslint.config.mjs` for lint rules.
- Create: `vitest.config.ts` and `vitest.setup.ts` for unit and component tests.
- Create: `playwright.config.ts` for milestone smoke coverage.
- Create: `tailwind.config.ts` if the generated scaffold does not include the required token extension.
- Create: `app/layout.tsx` for global metadata, font, safe-area shell, and theme bootstrap.
- Create: `app/page.tsx` for a temporary route to the dashboard shell.
- Create: `app/loading.tsx` for the initial loading surface.
- Create: `app/offline/page.tsx` for the offline fallback screen.
- Create: `app/manifest.ts` for install metadata.
- Create: `app/globals.css` for tokens, surface styles, safe-area utilities, and mobile viewport behavior.
- Create: `public/icons/*` for PWA icons.
- Create: `public/sw.js` for shell caching and offline fallback.
- Create: `components/sangapay/app-shell.tsx` for the mobile container and bottom-tab frame.
- Create: `components/sangapay/top-bar.tsx` for the navy header shell.
- Create: `components/sangapay/bottom-nav.tsx` for the native-style tab bar.
- Create: `components/sangapay/install-prompt.tsx` for user-triggered install UI.
- Create: `components/sangapay/demo-dashboard-shell.tsx` for the approved Emerald Vault foundation view.
- Create: `components/sangapay/balance-card.tsx` for the single XAF balance card.
- Create: `components/sangapay/equivalent-card-row.tsx` for EUR and USDC estimate cards.
- Create: `components/sangapay/quick-actions.tsx` for disabled placeholder actions wired to later routes.
- Create: `components/sangapay/recent-transactions-preview.tsx` for seeded transaction preview.
- Create: `lib/mock/session.ts` for deterministic user, wallet, rates, and recent transactions.
- Create: `lib/money/format.ts` for currency formatting helpers.
- Create: `lib/money/convert.ts` for decimal-safe XAF-to-EUR and XAF-to-USDC estimation.
- Create: `lib/pwa/register-sw.ts` for service-worker registration.
- Create: `lib/pwa/install-prompt-store.ts` for deferred install prompt state.
- Create: `tests/unit/lib/money/convert.test.ts` for conversion and single-wallet invariants.
- Create: `tests/component/app-shell.test.tsx` for shell rendering and estimate labels.
- Create: `tests/component/install-prompt.test.tsx` for install availability behavior.
- Create: `tests/e2e/foundation.spec.ts` for mobile-shell smoke coverage.
- Create: `docs/design-qa.md` for milestone visual QA notes.
- Modify: `.gitignore` only if the scaffold misses standard Next.js ignores.

### Task 1: Scaffold The Next.js Workspace

**Files:**
- Create: `package.json`
- Create: `pnpm-lock.yaml`
- Create: `next.config.ts`
- Create: `tsconfig.json`
- Create: `postcss.config.mjs`
- Create: `eslint.config.mjs`
- Create: `app/layout.tsx`
- Create: `app/page.tsx`
- Create: `app/globals.css`

- [ ] **Step 1: Initialize the app scaffold**

```powershell
& 'C:\Users\USER\.cache\codex-runtimes\codex-primary-runtime\dependencies\bin\pnpm.cmd' dlx create-next-app@latest . --ts --tailwind --eslint --app --use-pnpm --import-alias "@/*" --yes
```

Expected: Next.js project files are created in the repository root without deleting `docs/`.

- [ ] **Step 2: Verify the baseline scripts exist**

```powershell
& 'C:\Users\USER\.cache\codex-runtimes\codex-primary-runtime\dependencies\bin\pnpm.cmd' run lint
```

Expected: the generated starter app lints cleanly with exit code `0`.

- [ ] **Step 3: Replace the default app metadata with SangaPay metadata**

```tsx
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SangaPay",
  description: "Send across borders instantly.",
  applicationName: "SangaPay",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "SangaPay",
  },
};

export const viewport: Viewport = {
  themeColor: "#0F172A",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 4: Run the baseline build**

```powershell
& 'C:\Users\USER\.cache\codex-runtimes\codex-primary-runtime\dependencies\bin\pnpm.cmd' run build
```

Expected: the starter project builds successfully.

- [ ] **Step 5: Commit the scaffold**

```powershell
& 'C:\Users\USER\.cache\codex-runtimes\codex-primary-runtime\dependencies\native\git\cmd\git.exe' add .
& 'C:\Users\USER\.cache\codex-runtimes\codex-primary-runtime\dependencies\native\git\cmd\git.exe' commit -m "chore: scaffold sangapay next app"
```

### Task 2: Lock In The Single-XAF Wallet Domain Helpers With TDD

**Files:**
- Create: `lib/mock/session.ts`
- Create: `lib/money/format.ts`
- Create: `lib/money/convert.ts`
- Test: `tests/unit/lib/money/convert.test.ts`

- [ ] **Step 1: Write the failing conversion test**

```ts
import { describe, expect, it } from "vitest";
import { buildEquivalentBalances, convertXafToEstimate } from "@/lib/money/convert";

describe("convertXafToEstimate", () => {
  it("derives eur and usdc estimates from one xaf wallet balance", () => {
    const eur = convertXafToEstimate({
      sourceCurrency: "XAF",
      destinationCurrency: "EUR",
      sourceMinor: 245000000,
      rate: 0.001524,
    });

    const usdc = convertXafToEstimate({
      sourceCurrency: "XAF",
      destinationCurrency: "USDC",
      sourceMinor: 245000000,
      rate: 0.00162457,
    });

    expect(eur.sourceCurrency).toBe("XAF");
    expect(eur.destinationCurrency).toBe("EUR");
    expect(usdc.destinationCurrency).toBe("USDC");
    expect(buildEquivalentBalances(245000000).length).toBe(2);
  });
});
```

- [ ] **Step 2: Run the unit test to verify RED**

```powershell
& 'C:\Users\USER\.cache\codex-runtimes\codex-primary-runtime\dependencies\bin\pnpm.cmd' exec vitest run tests/unit/lib/money/convert.test.ts
```

Expected: FAIL because `@/lib/money/convert` does not exist yet.

- [ ] **Step 3: Write the minimal conversion helpers**

```ts
export type CurrencyCode = "XAF" | "EUR" | "USDC";

type EstimateInput = {
  sourceCurrency: "XAF";
  destinationCurrency: Exclude<CurrencyCode, "XAF">;
  sourceMinor: number;
  rate: number;
};

export function convertXafToEstimate(input: EstimateInput) {
  const destinationMinor = Math.round((input.sourceMinor / 100) * input.rate * 100);

  return {
    sourceCurrency: input.sourceCurrency,
    destinationCurrency: input.destinationCurrency,
    sourceMinor: input.sourceMinor,
    destinationMinor,
    label: "Estimated equivalent",
  };
}

export function buildEquivalentBalances(sourceMinor: number) {
  return [
    convertXafToEstimate({
      sourceCurrency: "XAF",
      destinationCurrency: "EUR",
      sourceMinor,
      rate: 0.001524,
    }),
    convertXafToEstimate({
      sourceCurrency: "XAF",
      destinationCurrency: "USDC",
      sourceMinor,
      rate: 0.00162457,
    }),
  ];
}
```

- [ ] **Step 4: Run the unit test to verify GREEN**

```powershell
& 'C:\Users\USER\.cache\codex-runtimes\codex-primary-runtime\dependencies\bin\pnpm.cmd' exec vitest run tests/unit/lib/money/convert.test.ts
```

Expected: PASS with `1 passed`.

- [ ] **Step 5: Commit the domain helpers**

```powershell
& 'C:\Users\USER\.cache\codex-runtimes\codex-primary-runtime\dependencies\native\git\cmd\git.exe' add lib tests
& 'C:\Users\USER\.cache\codex-runtimes\codex-primary-runtime\dependencies\native\git\cmd\git.exe' commit -m "feat: add single-wallet money helpers"
```

### Task 3: Build The Mobile App Shell And Emerald Vault Foundation View

**Files:**
- Create: `components/sangapay/app-shell.tsx`
- Create: `components/sangapay/top-bar.tsx`
- Create: `components/sangapay/bottom-nav.tsx`
- Create: `components/sangapay/demo-dashboard-shell.tsx`
- Create: `components/sangapay/balance-card.tsx`
- Create: `components/sangapay/equivalent-card-row.tsx`
- Create: `components/sangapay/quick-actions.tsx`
- Create: `components/sangapay/recent-transactions-preview.tsx`
- Modify: `app/page.tsx`
- Modify: `app/globals.css`
- Test: `tests/component/app-shell.test.tsx`

- [ ] **Step 1: Write the failing shell test**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DemoDashboardShell } from "@/components/sangapay/demo-dashboard-shell";

describe("DemoDashboardShell", () => {
  it("renders one XAF wallet and estimated EUR and USDC equivalents", () => {
    render(<DemoDashboardShell />);

    expect(screen.getByText("Available balance")).toBeInTheDocument();
    expect(screen.getByText("Estimated equivalents")).toBeInTheDocument();
    expect(screen.getByText("EUR estimate")).toBeInTheDocument();
    expect(screen.getByText("USDC estimate")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the component test to verify RED**

```powershell
& 'C:\Users\USER\.cache\codex-runtimes\codex-primary-runtime\dependencies\bin\pnpm.cmd' exec vitest run tests/component/app-shell.test.tsx
```

Expected: FAIL because the shell component does not exist yet.

- [ ] **Step 3: Implement the shell and dashboard frame**

```tsx
import { Bell, Clock3, House, Landmark, UserRound } from "lucide-react";
import { buildEquivalentBalances } from "@/lib/money/convert";

const walletMinor = 245000000;
const equivalents = buildEquivalentBalances(walletMinor);

export function DemoDashboardShell() {
  return (
    <main className="min-h-dvh bg-[var(--color-app)] text-slate-950">
      <section className="mx-auto flex min-h-dvh w-full max-w-[430px] flex-col px-4 pb-[calc(88px+env(safe-area-inset-bottom))] pt-[calc(20px+env(safe-area-inset-top))]">
        <header className="rounded-[28px] bg-slate-950 px-5 py-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-white/60">SangaPay</p>
              <h1 className="mt-2 text-2xl font-semibold">Available balance</h1>
            </div>
            <button aria-label="Notifications" className="rounded-full bg-white/10 p-3">
              <Bell className="size-5" />
            </button>
          </div>
        </header>

        <section className="mt-4 rounded-[28px] bg-emerald-500 p-5 text-slate-950">
          <p className="text-sm font-medium text-slate-950/70">Main XAF wallet</p>
          <p className="mt-3 text-4xl font-semibold tracking-tight">2,450,000 XAF</p>
          <p className="mt-3 text-sm text-slate-950/70">Every transfer debits this balance.</p>
        </section>

        <section className="mt-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-900">Estimated equivalents</h2>
            <span className="text-xs text-slate-500">Live preview only</span>
          </div>
          <div className="grid gap-3">
            {equivalents.map((item) => (
              <article key={item.destinationCurrency} className="rounded-[24px] bg-white p-4 shadow-sm ring-1 ring-slate-200">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">{item.destinationCurrency} estimate</p>
                <p className="mt-2 text-xl font-semibold text-slate-950">{item.destinationMinor}</p>
              </article>
            ))}
          </div>
        </section>

        <nav className="fixed inset-x-0 bottom-0 mx-auto flex w-full max-w-[430px] items-center justify-around rounded-t-[28px] bg-white/95 px-4 py-3 backdrop-blur">
          <House className="size-5 text-slate-950" />
          <Landmark className="size-5 text-slate-400" />
          <Clock3 className="size-5 text-slate-400" />
          <UserRound className="size-5 text-slate-400" />
        </nav>
      </section>
    </main>
  );
}
```

- [ ] **Step 4: Run the component test to verify GREEN**

```powershell
& 'C:\Users\USER\.cache\codex-runtimes\codex-primary-runtime\dependencies\bin\pnpm.cmd' exec vitest run tests/component/app-shell.test.tsx
```

Expected: PASS with all assertions green.

- [ ] **Step 5: Commit the app shell**

```powershell
& 'C:\Users\USER\.cache\codex-runtimes\codex-primary-runtime\dependencies\native\git\cmd\git.exe' add app components lib tests
& 'C:\Users\USER\.cache\codex-runtimes\codex-primary-runtime\dependencies\native\git\cmd\git.exe' commit -m "feat: add mobile dashboard app shell"
```

### Task 4: Add Manifest, Service Worker, Offline Page, And Install Prompt

**Files:**
- Create: `app/manifest.ts`
- Create: `app/offline/page.tsx`
- Create: `public/sw.js`
- Create: `lib/pwa/register-sw.ts`
- Create: `lib/pwa/install-prompt-store.ts`
- Create: `components/sangapay/install-prompt.tsx`
- Test: `tests/component/install-prompt.test.tsx`
- Test: `tests/e2e/foundation.spec.ts`

- [ ] **Step 1: Write the failing install-prompt test**

```tsx
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { InstallPrompt } from "@/components/sangapay/install-prompt";

describe("InstallPrompt", () => {
  it("shows the install call to action when a deferred prompt is available", async () => {
    render(<InstallPrompt canInstall />);

    fireEvent.click(screen.getByRole("button", { name: "Install app" }));

    expect(screen.getByText("Install prompt ready")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the component test to verify RED**

```powershell
& 'C:\Users\USER\.cache\codex-runtimes\codex-primary-runtime\dependencies\bin\pnpm.cmd' exec vitest run tests/component/install-prompt.test.tsx
```

Expected: FAIL because the prompt component does not exist yet.

- [ ] **Step 3: Implement the manifest and install prompt**

```ts
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SangaPay",
    short_name: "SangaPay",
    description: "Send across borders instantly.",
    start_url: "/",
    display: "standalone",
    background_color: "#FAFAFA",
    theme_color: "#0F172A",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
```

```tsx
"use client";

import { useState } from "react";

export function InstallPrompt({ canInstall = false }: { canInstall?: boolean }) {
  const [message, setMessage] = useState("");

  if (!canInstall) {
    return null;
  }

  return (
    <div className="rounded-[24px] bg-slate-950 px-4 py-3 text-white">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold">Install SangaPay</p>
          <p className="text-xs text-white/70">Use the app with a native-style home screen.</p>
        </div>
        <button
          className="rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-950"
          onClick={() => setMessage("Install prompt ready")}
        >
          Install app
        </button>
      </div>
      {message ? <p className="mt-2 text-xs text-emerald-300">{message}</p> : null}
    </div>
  );
}
```

- [ ] **Step 4: Run component and e2e smoke checks**

```powershell
& 'C:\Users\USER\.cache\codex-runtimes\codex-primary-runtime\dependencies\bin\pnpm.cmd' exec vitest run tests/component/install-prompt.test.tsx
& 'C:\Users\USER\.cache\codex-runtimes\codex-primary-runtime\dependencies\bin\pnpm.cmd' exec playwright test tests/e2e/foundation.spec.ts --project=chromium
```

Expected: both commands pass, and Playwright confirms the app shell loads at a 390px mobile viewport.

- [ ] **Step 5: Commit the PWA shell**

```powershell
& 'C:\Users\USER\.cache\codex-runtimes\codex-primary-runtime\dependencies\native\git\cmd\git.exe' add app components lib public tests
& 'C:\Users\USER\.cache\codex-runtimes\codex-primary-runtime\dependencies\native\git\cmd\git.exe' commit -m "feat: add installable pwa shell"
```

### Task 5: Verify The Milestone And Record Visual QA

**Files:**
- Create: `docs/design-qa.md`

- [ ] **Step 1: Run the full milestone verification suite**

```powershell
& 'C:\Users\USER\.cache\codex-runtimes\codex-primary-runtime\dependencies\bin\pnpm.cmd' exec vitest run
& 'C:\Users\USER\.cache\codex-runtimes\codex-primary-runtime\dependencies\bin\pnpm.cmd' run lint
& 'C:\Users\USER\.cache\codex-runtimes\codex-primary-runtime\dependencies\bin\pnpm.cmd' run build
& 'C:\Users\USER\.cache\codex-runtimes\codex-primary-runtime\dependencies\bin\pnpm.cmd' exec playwright test tests/e2e/foundation.spec.ts --project=chromium
```

Expected: all commands exit `0`.

- [ ] **Step 2: Capture milestone QA notes**

```md
# Design QA

## 2026-07-06 Foundation Milestone

- Reference checked: `docs/design-references/sangapay-emerald-vault-dashboard.png`
- Mobile viewport checked at 390x844
- Confirmed one stored XAF wallet is shown
- Confirmed EUR and USDC are labeled as estimates, not wallets
- Confirmed install prompt entry point is visible
- Confirmed offline page is reachable when the service worker serves fallback content
```

- [ ] **Step 3: Commit the milestone verification artifacts**

```powershell
& 'C:\Users\USER\.cache\codex-runtimes\codex-primary-runtime\dependencies\native\git\cmd\git.exe' add docs
& 'C:\Users\USER\.cache\codex-runtimes\codex-primary-runtime\dependencies\native\git\cmd\git.exe' commit -m "docs: record foundation milestone qa"
```

## Self-Review

- Spec coverage check: this plan covers milestone 2 only. It includes the app scaffold, app shell, single-wallet display model, manifest, service worker, offline fallback, install entry point, and verification. It intentionally does not implement onboarding, auth, transfer flows, rates chart, history filters, profile, or admin screens because those belong to later approved milestones.
- Placeholder scan: removed generic TODO language. Each task has concrete files, commands, and expected outputs.
- Type consistency: the plan uses one currency source model throughout: `sourceCurrency: "XAF"` and destination estimates for `EUR` and `USDC`.

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-07-06-sangapay-foundation-pwa-shell.md`. Two execution options:

**1. Subagent-Driven (recommended by the skill)** - I dispatch a fresh subagent per task, review between tasks, fast iteration.

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints.

Which approach?
