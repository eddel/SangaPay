# SangaPay UI Correction Pass Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Realign the existing SangaPay entry, auth, and home-dashboard screens with the approved minimalist correction spec and the uploaded dashboard reference image.

**Architecture:** Keep the current route structure intact and refine the presentational layer in place. Split the work into two bounded parts: entry/auth simplification and dashboard reference alignment, then verify the corrected UI through component and end-to-end checks.

**Tech Stack:** Next.js 15 App Router, TypeScript, Tailwind CSS, Framer Motion, Lucide React, Vitest, React Testing Library, Playwright.

---

## File Structure

- Modify: `components/sangapay/splash-screen.tsx`
- Modify: `components/sangapay/onboarding-carousel.tsx`
- Modify: `components/sangapay/onboarding-progress.tsx` only if needed for a lighter visual treatment
- Modify: `components/sangapay/auth-card.tsx`
- Modify: `components/sangapay/auth-header.tsx`
- Modify: `components/sangapay/otp-input.tsx`
- Modify: `components/sangapay/biometric-card.tsx`
- Modify: `app/(entry)/signup/page.tsx`
- Modify: `app/(entry)/login/page.tsx`
- Modify: `app/(entry)/verify/page.tsx`
- Modify: `app/(entry)/biometric/page.tsx`
- Modify: `components/sangapay/demo-dashboard-shell.tsx`
- Modify: `components/sangapay/top-bar.tsx`
- Modify: `components/sangapay/balance-card.tsx`
- Modify: `components/sangapay/equivalent-card-row.tsx`
- Modify: `components/sangapay/quick-actions.tsx`
- Modify: `components/sangapay/live-rate-card.tsx`
- Modify: `components/sangapay/recent-transactions-preview.tsx`
- Modify: `components/sangapay/bottom-nav.tsx`
- Modify: `lib/mock/session.ts`
- Modify: `tests/component/onboarding-carousel.test.tsx`
- Modify: `tests/component/auth-flow.test.tsx`
- Modify: `tests/component/dashboard-shell.test.tsx`
- Modify: `tests/component/top-bar.test.tsx`
- Modify: `tests/e2e/entry-auth.spec.ts`
- Modify: `tests/e2e/home-dashboard.spec.ts`
- Modify: `docs/design-qa.md`

### Task 1: Simplify Onboarding And Auth Expectations With Tests

**Files:**
- Modify: `tests/component/onboarding-carousel.test.tsx`
- Modify: `tests/component/auth-flow.test.tsx`
- Modify: `tests/e2e/entry-auth.spec.ts`

- [ ] **Step 1: Add the failing onboarding CTA timing assertions**

```tsx
expect(screen.queryByRole("link", { name: "Create account" })).not.toBeInTheDocument();
expect(screen.queryByRole("link", { name: "Log in" })).not.toBeInTheDocument();
```

after advancing to the last slide:

```tsx
expect(screen.getByRole("link", { name: "Create account" })).toBeInTheDocument();
expect(screen.getByRole("link", { name: "Log in" })).toBeInTheDocument();
```

- [ ] **Step 2: Add the failing OTP privacy assertion**

```tsx
expect(screen.queryByText("204811")).not.toBeInTheDocument();
expect(screen.queryByText("Demo code")).not.toBeInTheDocument();
```

- [ ] **Step 3: Run the focused tests to verify RED**

Run: `npm exec vitest run tests/component/onboarding-carousel.test.tsx tests/component/auth-flow.test.tsx`

Expected: FAIL because onboarding still shows auth actions too early and OTP still exposes the demo code.

### Task 2: Simplify Entry And Auth Screens

**Files:**
- Modify: `components/sangapay/onboarding-carousel.tsx`
- Modify: `components/sangapay/auth-card.tsx`
- Modify: `components/sangapay/auth-header.tsx`
- Modify: `components/sangapay/otp-input.tsx`
- Modify: `components/sangapay/biometric-card.tsx`
- Modify: `app/(entry)/signup/page.tsx`
- Modify: `app/(entry)/login/page.tsx`
- Modify: `app/(entry)/verify/page.tsx`
- Modify: `app/(entry)/biometric/page.tsx`

- [ ] **Step 1: Implement the minimal onboarding CTA behavior**

```tsx
const showAuthActions = currentIndex === slides.length - 1;
```

Only render the sign-up and login links when `showAuthActions` is true.

- [ ] **Step 2: Remove OTP demo code from the UI**

Delete the visible demo-code footer from the verify screen. Keep verification logic unchanged in `features/auth/mock-auth.ts`.

- [ ] **Step 3: Reduce auth visual density**

Use one primary action, one quiet secondary route where needed, shorter helper text, and flatter card treatment.

- [ ] **Step 4: Run the focused tests to verify GREEN**

Run: `npm exec vitest run tests/component/onboarding-carousel.test.tsx tests/component/auth-flow.test.tsx`

Expected: PASS.

### Task 3: Lock The Dashboard Reference With Stronger Tests

**Files:**
- Modify: `tests/component/dashboard-shell.test.tsx`
- Modify: `tests/component/top-bar.test.tsx`
- Modify: `tests/e2e/home-dashboard.spec.ts`

- [ ] **Step 1: Add the failing dashboard-reference assertions**

Add checks for:

```tsx
expect(screen.getByText(/Good morning,/i)).toBeInTheDocument();
expect(screen.getByText("My pockets")).toBeInTheDocument();
expect(screen.getByText("Manage")).toBeInTheDocument();
expect(screen.getByText("Live rate")).toBeInTheDocument();
expect(screen.getByText("Recent transactions")).toBeInTheDocument();
```

and ensure the header no longer uses the treasury-style heading copy.

- [ ] **Step 2: Run the dashboard tests to verify RED**

Run: `npm exec vitest run tests/component/dashboard-shell.test.tsx tests/component/top-bar.test.tsx`

Expected: FAIL because the dashboard still uses the denser treasury-style structure.

### Task 4: Rebuild `/app` To Match The Uploaded Reference

**Files:**
- Modify: `components/sangapay/demo-dashboard-shell.tsx`
- Modify: `components/sangapay/top-bar.tsx`
- Modify: `components/sangapay/balance-card.tsx`
- Modify: `components/sangapay/equivalent-card-row.tsx`
- Modify: `components/sangapay/quick-actions.tsx`
- Modify: `components/sangapay/live-rate-card.tsx`
- Modify: `components/sangapay/recent-transactions-preview.tsx`
- Modify: `components/sangapay/bottom-nav.tsx`
- Modify: `lib/mock/session.ts`

- [ ] **Step 1: Restore the dashboard hierarchy to the reference**

Implement:
- dark navy curved top area
- greeting line
- large emerald hero card
- inline EUR/USDC equivalents on hero
- “My pockets” row
- simple three-action strip
- simple live-rate strip
- lighter recent transaction rows

- [ ] **Step 2: Preserve the single-wallet rule**

Keep XAF as the only stored balance and make pocket labels or helper text explicit that EUR and USDC are equivalents, not separately funded wallets.

- [ ] **Step 3: Remove dense copy and unnecessary visual noise**

Delete treasury/ops phrasing, extra helper paragraphs, and over-layered status treatments.

- [ ] **Step 4: Run the dashboard tests to verify GREEN**

Run: `npm exec vitest run tests/component/dashboard-shell.test.tsx tests/component/top-bar.test.tsx tests/component/bottom-nav.test.tsx`

Expected: PASS.

### Task 5: Verify The Correction Pass

**Files:**
- Modify: `docs/design-qa.md`

- [ ] **Step 1: Run the correction-pass verification suite**

Run: `npm run lint`

Run: `npm run build`

Run: `npm exec vitest run`

Run: `npm exec playwright test tests/e2e/entry-auth.spec.ts tests/e2e/home-dashboard.spec.ts --project=chromium`

Expected: all commands exit `0`.

- [ ] **Step 2: Append QA notes**

```md
## 2026-07-07 UI Correction Pass

- Confirmed onboarding only reveals auth CTAs on the final slide
- Confirmed OTP no longer exposes the demo code in the UI
- Confirmed `/app` visually aligns much more closely to the approved dashboard reference
- Confirmed the dashboard is materially less crowded and more app-like
```

## Self-Review

- Spec coverage check: this plan covers the approved correction pass only and does not add new product flows.
- Placeholder scan: all tasks contain concrete files, checks, and outcomes.
- Type consistency: the single XAF wallet model remains intact while the visual layout becomes closer to the original reference.

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-07-07-sangapay-ui-correction-pass.md`. Two execution options:

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration.

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints.

Using the already approved subagent-driven path for this correction pass.
