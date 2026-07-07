# SangaPay Home Dashboard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build milestone 4 of SangaPay: the production-quality home dashboard with the refined Emerald Vault layout, single XAF wallet presentation, live estimate cards, quick actions, live exchange-rate card, recent transactions, and bottom tab navigation.

**Architecture:** Keep `/app` as the authenticated home route and evolve the existing dashboard shell into a fuller composition built from focused components and a richer mock session model. Preserve the single-wallet XAF source of truth, with EUR and USDC displayed only as clearly labeled equivalents.

**Tech Stack:** Next.js 15 App Router, TypeScript, Tailwind CSS, Framer Motion, Lucide React, Vitest, React Testing Library, Playwright.

---

## File Structure

- Modify: `app/(app)/app/page.tsx` to keep `/app` as the dashboard route.
- Create: `app/(app)/app/loading.tsx` for route-level dashboard loading.
- Modify: `components/sangapay/demo-dashboard-shell.tsx` to compose the expanded dashboard sections.
- Modify: `components/sangapay/top-bar.tsx` to align the header with milestone-4 hierarchy.
- Modify: `components/sangapay/balance-card.tsx` to expose XAF balance, hidden-balance affordance, and inline equivalent summary.
- Modify: `components/sangapay/equivalent-card-row.tsx` to make the EUR and USDC cards horizontally scrollable and explicitly estimated.
- Modify: `components/sangapay/quick-actions.tsx` to route Send EUR, Send Crypto, and Add Money.
- Modify: `components/sangapay/recent-transactions-preview.tsx` to match grouped investor-ready list styling.
- Modify: `components/sangapay/bottom-nav.tsx` to expose active tab state and accessible labels.
- Create: `components/sangapay/live-rate-card.tsx` for the FX snapshot panel.
- Create: `components/sangapay/dashboard-section-heading.tsx` for consistent home-section headings.
- Modify: `lib/mock/session.ts` to add richer balances, exchange data, and recent-transaction metadata.
- Modify: `lib/money/format.ts` only if formatting support is needed for new labels.
- Create: `tests/component/dashboard-shell.test.tsx`
- Create: `tests/component/bottom-nav.test.tsx`
- Create: `tests/e2e/home-dashboard.spec.ts`
- Modify: `docs/design-qa.md` with milestone 4 notes.

### Task 1: Lock The Refined Dashboard Expectations With Tests

**Files:**
- Create: `tests/component/dashboard-shell.test.tsx`
- Create: `tests/component/bottom-nav.test.tsx`

- [ ] **Step 1: Write the failing dashboard shell test**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DemoDashboardShell } from "@/components/sangapay/demo-dashboard-shell";

describe("DemoDashboardShell", () => {
  it("shows the main xaf wallet and estimated eur/usdc equivalents", () => {
    render(<DemoDashboardShell />);

    expect(screen.getByText("Available balance")).toBeInTheDocument();
    expect(screen.getByText("Main XAF wallet")).toBeInTheDocument();
    expect(screen.getByText("Estimated equivalents")).toBeInTheDocument();
    expect(screen.getByText("EUR estimate")).toBeInTheDocument();
    expect(screen.getByText("USDC estimate")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Write the failing bottom-nav test**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BottomNav } from "@/components/sangapay/bottom-nav";

describe("BottomNav", () => {
  it("marks home as the active dashboard tab", () => {
    render(<BottomNav activeTab="home" />);

    expect(screen.getByRole("button", { name: "Home" })).toHaveAttribute("aria-current", "page");
  });
});
```

- [ ] **Step 3: Run the component tests to verify RED**

Run: `npm exec vitest run tests/component/dashboard-shell.test.tsx tests/component/bottom-nav.test.tsx`

Expected: FAIL because the refined test expectations or active-tab API are not implemented yet.

- [ ] **Step 4: Commit the red tests only if the workspace policy allows it; otherwise continue without commit**

```bash
git add tests/component/dashboard-shell.test.tsx tests/component/bottom-nav.test.tsx
```

### Task 2: Refine The Core Dashboard Composition

**Files:**
- Modify: `components/sangapay/demo-dashboard-shell.tsx`
- Modify: `components/sangapay/top-bar.tsx`
- Modify: `components/sangapay/balance-card.tsx`
- Modify: `components/sangapay/equivalent-card-row.tsx`
- Create: `components/sangapay/dashboard-section-heading.tsx`
- Modify: `lib/mock/session.ts`

- [ ] **Step 1: Implement the minimal dashboard composition needed for the shell test**

```tsx
<BalanceCard sourceMinor={demoSession.wallet.sourceMinor} />
<EquivalentCardRow items={demoSession.wallet.equivalents} />
```

- [ ] **Step 2: Ensure equivalents remain labels, not wallets**

```tsx
<span className="text-xs text-slate-500">Live preview only</span>
```

- [ ] **Step 3: Run the dashboard shell test to verify GREEN**

Run: `npm exec vitest run tests/component/dashboard-shell.test.tsx`

Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add components/sangapay lib/mock tests/component
git commit -m "feat: refine home dashboard shell"
```

### Task 3: Add Live Rates, Quick Actions, And Transaction Presentation

**Files:**
- Create: `components/sangapay/live-rate-card.tsx`
- Modify: `components/sangapay/quick-actions.tsx`
- Modify: `components/sangapay/recent-transactions-preview.tsx`
- Modify: `lib/mock/session.ts`

- [ ] **Step 1: Add a failing expectation for the live-rate card**

```tsx
expect(screen.getByText("Live rates")).toBeInTheDocument();
expect(screen.getByText("1 EUR = 655.96 XAF")).toBeInTheDocument();
```

- [ ] **Step 2: Run the shell test to verify RED**

Run: `npm exec vitest run tests/component/dashboard-shell.test.tsx`

Expected: FAIL because the live-rate section does not exist yet.

- [ ] **Step 3: Implement the live-rate and recent-activity refinements**

```tsx
<LiveRateCard eurLabel={demoSession.rates.eur} usdcLabel={demoSession.rates.usdc} updatedAt={demoSession.rates.updatedAt} />
```

- [ ] **Step 4: Run the shell test to verify GREEN**

Run: `npm exec vitest run tests/component/dashboard-shell.test.tsx`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add components/sangapay lib/mock tests/component
git commit -m "feat: add live rates and transaction preview"
```

### Task 4: Finalize Active Navigation And Route-Level Loading

**Files:**
- Modify: `components/sangapay/bottom-nav.tsx`
- Create: `app/(app)/app/loading.tsx`
- Modify: `app/(app)/app/page.tsx`

- [ ] **Step 1: Implement active-tab support and loading state**

```tsx
<BottomNav activeTab="home" />
```

```tsx
export default function Loading() {
  return <div className="animate-pulse" />;
}
```

- [ ] **Step 2: Run the bottom-nav test to verify GREEN**

Run: `npm exec vitest run tests/component/bottom-nav.test.tsx`

Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add app/(app)/app components/sangapay tests/component
git commit -m "feat: finalize dashboard navigation state"
```

### Task 5: Verify The Home Dashboard In Browser And QA Notes

**Files:**
- Create: `tests/e2e/home-dashboard.spec.ts`
- Modify: `docs/design-qa.md`

- [ ] **Step 1: Write the home-dashboard smoke test**

```ts
import { expect, test } from "@playwright/test";

test("home dashboard shows the main wallet and quick actions", async ({ page }) => {
  await page.goto("/app");
  await expect(page.getByText("Available balance")).toBeVisible();
  await expect(page.getByRole("button", { name: "Home" })).toHaveAttribute("aria-current", "page");
  await expect(page.getByText("Send EUR")).toBeVisible();
});
```

- [ ] **Step 2: Run the milestone verification suite**

Run: `npm run lint`

Run: `npm run build`

Run: `npm exec vitest run`

Run: `npm exec playwright test tests/e2e/home-dashboard.spec.ts --project=chromium`

Expected: all commands exit `0`.

- [ ] **Step 3: Append milestone 4 QA notes**

```md
## 2026-07-07 Home Dashboard Milestone

- Confirmed `/app` matches the Emerald Vault dashboard hierarchy at 390px width
- Confirmed XAF is the only stored wallet and EUR/USDC are labeled estimates
- Confirmed quick actions and live-rate card are visible
- Confirmed Home tab is marked active in bottom navigation
```

- [ ] **Step 4: Commit**

```bash
git add docs tests/e2e
git commit -m "docs: record home dashboard qa"
```

## Self-Review

- Spec coverage check: this plan covers milestone 4 only: the home dashboard, wallet card, equivalents, rates, recent activity, quick actions, and home-tab navigation state.
- Placeholder scan: all tasks contain concrete files, commands, and outputs. No deferred TODO placeholders remain.
- Type consistency: the plan preserves the single XAF wallet model and adds richer dashboard data without introducing separate EUR or USDC wallets.

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-07-07-sangapay-home-dashboard.md`. Two execution options:

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration.

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints.

Using the approved subagent-driven execution path for this milestone.
