# SangaPay Entry And Authentication Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build milestone 3 of SangaPay: splash, onboarding, sign up, login, OTP verification, and biometric login UI as a complete mobile-first entry flow.

**Architecture:** Add a dedicated entry route group under the App Router and keep the existing dashboard route intact as the post-auth destination. Introduce a small auth feature layer for mock session state, onboarding progress, OTP validation, and biometric prompt state so the flow feels real without a backend.

**Tech Stack:** Next.js 15 App Router, TypeScript, Tailwind CSS, Framer Motion, Lucide React, Vitest, React Testing Library, Playwright.

---

## File Structure

- Create: `app/(entry)/layout.tsx` for entry-shell layout without the dashboard tab bar.
- Create: `app/(entry)/page.tsx` for the splash screen route at `/`.
- Create: `app/(entry)/onboarding/page.tsx` for the 3-slide onboarding carousel.
- Create: `app/(entry)/signup/page.tsx` for the sign-up screen.
- Create: `app/(entry)/login/page.tsx` for the login screen.
- Create: `app/(entry)/verify/page.tsx` for OTP verification.
- Create: `app/(entry)/biometric/page.tsx` for the biometric login prompt.
- Move: `app/page.tsx` to `app/(app)/page.tsx` so dashboard becomes the authenticated destination.
- Create: `app/(app)/layout.tsx` for app-area layout if a dedicated route-group wrapper becomes useful.
- Create: `components/sangapay/splash-screen.tsx`
- Create: `components/sangapay/onboarding-carousel.tsx`
- Create: `components/sangapay/onboarding-progress.tsx`
- Create: `components/sangapay/auth-card.tsx`
- Create: `components/sangapay/auth-header.tsx`
- Create: `components/sangapay/otp-input.tsx`
- Create: `components/sangapay/biometric-card.tsx`
- Create: `features/auth/mock-auth.ts` for seed user data and OTP code rules.
- Create: `features/auth/use-auth-flow.ts` for entry-flow client state and navigation helpers.
- Create: `tests/component/splash-screen.test.tsx`
- Create: `tests/component/onboarding-carousel.test.tsx`
- Create: `tests/component/auth-flow.test.tsx`
- Create: `tests/e2e/entry-auth.spec.ts`
- Modify: `components/sangapay/demo-dashboard-shell.tsx` only if route links need to point to the new auth stack.
- Modify: `docs/design-qa.md` with milestone 3 notes.

### Task 1: Route The App Into Entry And Authenticated Areas

**Files:**
- Create: `app/(entry)/layout.tsx`
- Create: `app/(entry)/page.tsx`
- Create: `app/(app)/page.tsx`
- Modify: `app/page.tsx`
- Test: `tests/component/splash-screen.test.tsx`

- [ ] **Step 1: Write the failing splash test**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SplashScreen } from "@/components/sangapay/splash-screen";

describe("SplashScreen", () => {
  it("shows the sangapay logo and tagline", () => {
    render(<SplashScreen />);

    expect(screen.getByText("SangaPay")).toBeInTheDocument();
    expect(screen.getByText("Send Across Borders Instantly.")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the splash test to verify RED**

Run: `npm exec vitest run tests/component/splash-screen.test.tsx`

Expected: FAIL because `@/components/sangapay/splash-screen` does not exist yet.

- [ ] **Step 3: Implement the route split and splash screen**

```tsx
import { SplashScreen } from "@/components/sangapay/splash-screen";

export default function EntryPage() {
  return <SplashScreen />;
}
```

```tsx
export default function AppHomePage() {
  return <DemoDashboardShell />;
}
```

- [ ] **Step 4: Run the splash test to verify GREEN**

Run: `npm exec vitest run tests/component/splash-screen.test.tsx`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add app tests components
git commit -m "feat: add entry splash routes"
```

### Task 2: Build The Onboarding Carousel

**Files:**
- Create: `components/sangapay/onboarding-carousel.tsx`
- Create: `components/sangapay/onboarding-progress.tsx`
- Create: `app/(entry)/onboarding/page.tsx`
- Test: `tests/component/onboarding-carousel.test.tsx`

- [ ] **Step 1: Write the failing onboarding test**

```tsx
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { OnboardingCarousel } from "@/components/sangapay/onboarding-carousel";

describe("OnboardingCarousel", () => {
  it("advances through the three approved value propositions", () => {
    render(<OnboardingCarousel />);

    expect(screen.getByText("Fast EUR transfers.")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Next slide" }));
    expect(screen.getByText("Crypto transfers.")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Next slide" }));
    expect(screen.getByText("Competitive exchange rates.")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the onboarding test to verify RED**

Run: `npm exec vitest run tests/component/onboarding-carousel.test.tsx`

Expected: FAIL because the onboarding component does not exist yet.

- [ ] **Step 3: Implement the onboarding carousel**

```tsx
const slides = [
  { title: "Fast EUR transfers.", body: "Move XAF into SEPA Instant payouts with clear fees and live conversion." },
  { title: "Crypto transfers.", body: "Convert XAF to USDC and send to supported exchanges or external wallets." },
  { title: "Competitive exchange rates.", body: "Track real-time estimates before you commit any transfer." },
];
```

- [ ] **Step 4: Run the onboarding test to verify GREEN**

Run: `npm exec vitest run tests/component/onboarding-carousel.test.tsx`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add app components tests
git commit -m "feat: add onboarding carousel"
```

### Task 3: Add Mock Auth State, Sign Up, And Login

**Files:**
- Create: `features/auth/mock-auth.ts`
- Create: `features/auth/use-auth-flow.ts`
- Create: `components/sangapay/auth-card.tsx`
- Create: `components/sangapay/auth-header.tsx`
- Create: `app/(entry)/signup/page.tsx`
- Create: `app/(entry)/login/page.tsx`
- Test: `tests/component/auth-flow.test.tsx`

- [ ] **Step 1: Write the failing auth-flow test**

```tsx
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SignUpPage from "@/app/(entry)/signup/page";

describe("SignUpPage", () => {
  it("prevents continuing until the required fields are filled", () => {
    render(<SignUpPage />);

    fireEvent.click(screen.getByRole("button", { name: "Create account" }));

    expect(screen.getByText("Full name is required")).toBeInTheDocument();
    expect(screen.getByText("Phone number is required")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the auth-flow test to verify RED**

Run: `npm exec vitest run tests/component/auth-flow.test.tsx`

Expected: FAIL because the sign-up page and auth helpers do not exist yet.

- [ ] **Step 3: Implement sign-up and login screens**

```ts
export const demoAuthUser = {
  fullName: "Nadine Mvondo",
  phone: "+237 670 000 000",
  email: "nadine@sangapay.demo",
  otpCode: "204811",
};
```

```tsx
if (!fullName.trim()) errors.fullName = "Full name is required";
if (!phone.trim()) errors.phone = "Phone number is required";
```

- [ ] **Step 4: Run the auth-flow test to verify GREEN**

Run: `npm exec vitest run tests/component/auth-flow.test.tsx`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add app components features tests
git commit -m "feat: add sign up and login screens"
```

### Task 4: Add OTP Verification And Biometric Prompt

**Files:**
- Create: `components/sangapay/otp-input.tsx`
- Create: `components/sangapay/biometric-card.tsx`
- Create: `app/(entry)/verify/page.tsx`
- Create: `app/(entry)/biometric/page.tsx`
- Modify: `tests/component/auth-flow.test.tsx`
- Test: `tests/e2e/entry-auth.spec.ts`

- [ ] **Step 1: Extend the auth-flow test with the failing OTP check**

```tsx
it("shows an inline error for an invalid otp code", () => {
  render(<VerifyPage />);

  fireEvent.change(screen.getByLabelText("Verification code"), {
    target: { value: "000000" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Verify account" }));

  expect(screen.getByText("That code is invalid or expired")).toBeInTheDocument();
});
```

- [ ] **Step 2: Run the auth-flow test to verify RED**

Run: `npm exec vitest run tests/component/auth-flow.test.tsx`

Expected: FAIL because verify page behavior is not implemented yet.

- [ ] **Step 3: Implement OTP and biometric screens**

```ts
export function isValidOtp(code: string) {
  return code === demoAuthUser.otpCode;
}
```

```tsx
<button type="button">Enable Face ID</button>
<button type="button">Maybe later</button>
```

- [ ] **Step 4: Run auth-flow and e2e checks to verify GREEN**

Run: `npm exec vitest run tests/component/auth-flow.test.tsx`

Run: `npm exec playwright test tests/e2e/entry-auth.spec.ts --project=chromium`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add app components features tests
git commit -m "feat: add otp and biometric auth screens"
```

### Task 5: Verify Milestone 3 And Record QA

**Files:**
- Modify: `docs/design-qa.md`

- [ ] **Step 1: Run the milestone verification suite**

Run: `npm run lint`

Run: `npm run build`

Run: `npm exec vitest run`

Run: `npm exec playwright test tests/e2e/entry-auth.spec.ts --project=chromium`

Expected: every command exits `0`.

- [ ] **Step 2: Append milestone 3 QA notes**

```md
## 2026-07-06 Entry And Auth Milestone

- Confirmed splash screen shows animated SangaPay mark and approved tagline
- Confirmed onboarding contains the three approved slides
- Confirmed sign up and login flows preserve premium mobile card layout
- Confirmed OTP screen shows invalid-code feedback
- Confirmed biometric screen exposes enable and skip actions
```

- [ ] **Step 3: Commit**

```bash
git add docs
git commit -m "docs: record entry auth qa"
```

## Self-Review

- Spec coverage check: this plan covers milestone 3 only: splash, onboarding, sign up, login, OTP, and biometric UI. It intentionally excludes home-dashboard expansion, send flows, rates, history, profile, and admin.
- Placeholder scan: all steps contain concrete files, commands, and implementation details. No deferred TODO-style placeholders remain.
- Type consistency: the plan keeps auth mock data in `features/auth/mock-auth.ts` and validation logic in the auth feature layer, while pages and components consume those helpers.

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-07-06-sangapay-entry-auth.md`. Two execution options:

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration.

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints.

Using the previously chosen `Inline Execution` path for this milestone.
