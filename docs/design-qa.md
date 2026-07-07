# Design QA

## 2026-07-06 Foundation Milestone

- Reference checked: `docs/design-references/sangapay-emerald-vault-dashboard.png`
- Mobile viewport checked at 390x844
- Confirmed one stored XAF wallet is shown
- Confirmed EUR and USDC are labeled as estimates, not wallets
- Confirmed install prompt entry point is visible
- Confirmed offline page is reachable when the service worker serves fallback content

## 2026-07-07 Entry And Auth Milestone

- Confirmed splash screen shows animated SangaPay mark and approved tagline
- Confirmed onboarding contains the three approved slides
- Confirmed sign up and login flows preserve the premium mobile auth card layout
- Confirmed OTP screen shows invalid-code feedback and valid-code routing
- Confirmed biometric screen exposes enable and skip actions that route into `/app`

## 2026-07-07 Home Dashboard Milestone

- Confirmed `/app` renders the main XAF wallet card, active Home tab, and the three approved quick actions
- Confirmed bottom navigation stays correct on nested authenticated routes such as `/app/history/123`
- Confirmed the top bar keeps the approved heading, summary, personalized badge copy, and real notifications destination
- Confirmed `/app/rates`, `/app/history`, `/app/profile`, and `/app/notifications` all resolve to real placeholder destinations for navigation QA

## 2026-07-07 UI Correction Pass

- Confirmed onboarding only reveals auth CTAs on the final slide
- Confirmed OTP no longer exposes the demo code in the UI
- Confirmed `/app` now follows the approved dashboard reference much more closely
- Confirmed the dashboard is materially less crowded and more app-like than the prior milestone build
