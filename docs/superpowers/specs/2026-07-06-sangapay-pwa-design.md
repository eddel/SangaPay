# SangaPay PWA Design Specification

## Product Goal

SangaPay is a mobile-first remittance PWA for African users who fund one XAF wallet and send value to Europe through SEPA Instant or to crypto wallets as USDC. EUR and USDC values are live conversion equivalents of the XAF balance, not independently funded wallets or stored balances. The frontend must communicate speed, security, fee transparency, and delivery certainty.

The first release is an investor-ready, fully interactive frontend. Financial operations, identity checks, exchange-rate updates, biometric authentication, notifications, and admin actions use realistic deterministic mock services. No production backend, custody integration, payment processor, blockchain integration, or KYC vendor is included.

## Approved Visual Direction

The approved direction is **Emerald Vault**, based on [the selected dashboard reference](../../design-references/sangapay-emerald-vault-dashboard.png).

- Mobile baseline: 390 by 844 CSS pixels, with fluid layouts from 320px upward.
- Base surfaces: soft white `#FAFAFA` and light gray `#F3F4F6`.
- Structural color: deep navy `#0F172A`.
- Transaction and action accent: emerald `#10B981`.
- Typography: Inter, with tabular numerals for money values.
- Shape language: 24px primary surfaces, 16-20px controls, restrained borders, minimal elevation.
- Visual hierarchy: navy app header, emerald XAF wallet surface, horizontally scrollable equivalent-value cards, compact action bar, rate strip, grouped transaction list, fixed native-style tab bar.
- Icons: Lucide React icons. Country and currency marks use accessible text or licensed/package assets rather than improvised drawings.
- Motion: short Framer Motion transitions, balance reveals, progress changes, success confirmation, and reduced-motion fallbacks.

The dashboard reference defines the visual system, not a literal requirement to reproduce inaccuracies from generated artwork. Text, spacing, contrast, iconography, and financial formatting must remain production-quality.

## Information Architecture

The app uses an app-like route hierarchy with persistent bottom navigation for primary customer areas.

- Entry: splash, onboarding, sign up, login, OTP, biometric prompt.
- Home: the XAF wallet balance, read-only EUR and USDC equivalents, quick actions, live rate, and recent transactions.
- Send EUR: amount, recipient, review, processing, success receipt.
- Send crypto: amount and asset, network, address, review, processing, success receipt.
- Rates: converter, XAF/EUR and XAF/USDC quotes, time-range chart.
- History: status filters, transaction list, transaction detail, receipt download.
- Notifications: transfer updates and rate alerts.
- Profile: personal information, KYC state, security controls, dark mode, app preferences.
- Admin: mobile metrics, transfer volume, revenue, pending transfers, KYC review queue.

Admin is reachable through a clearly labeled demo-role switch in Profile. This avoids mixing customer and operational navigation while keeping the frontend easy to review.

## Interaction Model

All visible controls are functional. Navigation, onboarding pagination, forms, filters, toggles, drawers, dialogs, charts, install prompt, receipt generation, and demo admin actions have client-side behavior.

Form flows preserve entered values when navigating backward. Amount screens calculate from mock live rates and show fees before confirmation. Every transfer debits the single XAF wallet; selecting EUR or USDC chooses the destination rail and conversion preview rather than another source wallet. Invalid IBANs, unsupported wallet addresses, insufficient balance, expired OTP codes, offline submission, and simulated transfer failures receive explicit inline feedback and recovery actions.

Success screens use generated transaction identifiers and expose receipt viewing, receipt download, sharing when Web Share is available, and a fallback copy action.

## Frontend Architecture

The application uses Next.js 15 App Router, TypeScript, Tailwind CSS, shadcn/ui primitives where they reduce custom accessibility work, Lucide React, and Framer Motion.

Code is separated by responsibility:

- `app/`: route entry points, metadata, manifest, layouts, and route-level loading/error states.
- `components/ui/`: reusable shadcn-based primitives.
- `components/sangapay/`: wallet, rate, transaction, navigation, receipt, form, and status components.
- `features/auth/`, `features/transfers/`, `features/rates/`, `features/history/`, `features/profile/`, `features/admin/`: feature-specific state and presentation.
- `lib/mock/`: deterministic mock repositories, seeded data, latency simulation, and failure scenarios.
- `lib/money/`: XAF/EUR/USDC formatting, decimal-safe conversion, fees, and validation.
- `lib/pwa/`: install-prompt handling, online status, and service-worker registration.

Server Components provide static shells where useful. Interactive screens and flows use focused Client Components. Shared state is limited to session/demo role, wallet snapshot, draft transfer, theme, notifications, and install status.

## Data and State

The data layer exposes typed repository interfaces so mock implementations can later be replaced by APIs without rewriting screens.

- Wallet: one stored XAF amount and a visibility preference. EUR and USDC equivalents are derived from the current rate snapshot and explicitly labeled as estimates.
- Quote: source amount, destination amount, rate, fee, expiry, delivery estimate.
- Transfer: rail, recipient, destination, network when applicable, status timeline, receipt fields.
- Transaction: debit or credit, display amount, XAF equivalent, timestamp, counterparty, status.
- User: identity, KYC level and status, security preferences.
- Admin metrics: user totals, volume, revenue, pending counts, KYC cases.

Money calculations use integer minor units or a decimal library; JavaScript floating-point arithmetic is not used directly for financial totals.

## PWA Behavior

The app includes an installable web manifest, icons, theme colors, standalone display mode, service-worker registration, and a user-triggered install prompt. The application shell and previously viewed read-only data are available offline. Mutating actions do not pretend to complete offline; they show a clear connection requirement and preserve the draft.

Safe-area insets protect the header and bottom navigation on notched devices. Viewport handling avoids keyboard-induced layout jumps in transfer forms.

## Accessibility and Trust

- WCAG AA color contrast for text and interactive states.
- Semantic headings, landmarks, labels, descriptions, and live regions.
- Visible keyboard focus and 44px minimum touch targets.
- Reduced-motion behavior and non-color status indicators.
- Balances can be hidden and are not exposed in decorative accessibility text.
- Security, fee, and delivery claims are written as demo content and never imply a real regulated service.

## Loading, Empty, and Error States

Each data-bearing screen includes an intentional skeleton state, a populated state, a realistic empty state where applicable, and a retryable error state. Transfer processing uses a bounded simulated status sequence rather than an endless spinner.

## Testing Strategy

- Unit tests cover money conversion, fees, formatting, IBAN and wallet-address validation, filters, and transfer state transitions.
- Component tests cover form validation, navigation state, filters, install prompt behavior, and offline restrictions.
- End-to-end coverage verifies onboarding/login, EUR transfer, crypto transfer, receipt access, history filtering, dark mode, and admin KYC review.
- Production build, lint, type checks, accessibility checks, and PWA asset validation are required before final handoff.
- Visual QA compares the 390px implementation against the approved Emerald Vault reference and records results in `design-qa.md`.

## Approval Milestones

1. Visual direction and specification.
2. Application foundation and PWA shell.
3. Entry experience and authentication.
4. Home dashboard.
5. EUR transfer flow.
6. USDC transfer flow.
7. Rates, history, notifications, and profile.
8. Mobile admin.
9. Offline behavior, accessibility, responsive polish, and final verification.

Every milestone ends with automated checks and a runnable preview. Work pauses for approval before the next milestone begins.
