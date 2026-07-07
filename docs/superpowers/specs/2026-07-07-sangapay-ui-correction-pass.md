# SangaPay UI Correction Pass Specification

## Goal

Realign the current SangaPay frontend with the previously approved mobile reference and remove the “website-like” density that drifted into milestones 3 and 4. The dashboard at `/app` is the strongest visual anchor and should closely follow the uploaded reference image, while onboarding and auth should become simpler, calmer, and more app-like.

## Canonical Dashboard Reference

The uploaded image at `C:\Users\USER\Downloads\Generated image 1.png` is now the canonical visual reference for the home dashboard.

The implementation should follow these visible traits as closely as possible:

- Dark navy top area with logo, greeting, and bell.
- Large emerald wallet card as the dominant hero surface.
- Balance shown prominently in XAF.
- EUR and USDC shown as inline equivalents on the hero card.
- A “pockets” row of light cards below the hero.
- A clean three-action strip for Send EUR, Send Crypto, and Add Money.
- A very simple live-rate strip.
- A restrained recent-transactions list.
- Minimal tab bar with Home, Rates, History, Profile.

The dashboard should feel native, spacious, and quiet. Decorative content that competes with money information should be removed.

## Single-Wallet Rule

The existing product rule remains unchanged:

- XAF is the only stored wallet balance.
- EUR and USDC are live equivalents of the XAF wallet, not independent funded wallets.
- Any “pockets” treatment is visual organization only, not separate balances.

This needs to be clear in labels, helper text, and transfer framing. The screen may visually resemble the reference, but it must not imply separate custody for EUR or USDC.

## Dashboard Corrections

### Keep

- Large emerald hero card
- “Good morning” greeting pattern
- Horizontal equivalents / pockets presentation
- Three quick actions
- Live-rate strip
- Recent transactions
- Fixed bottom tab bar

### Remove or simplify

- Extra treasury-style copy that feels enterprise or operational
- Dense section descriptions and helper paragraphs
- Decorative status pills that do not help the main task
- Overly boxed or layered compositions that make the screen feel like a website
- Placeholder-feeling affordances that distract from the main wallet view

### Text direction

Prefer short, confident labels:

- “Good morning, Nadine”
- “Total balance”
- “My pockets”
- “Manage”
- “Live rate”
- “Recent transactions”

Avoid long descriptive marketing copy inside the dashboard.

## Onboarding Corrections

The onboarding flow should become more minimal and focused.

- Slides remain the same three topics.
- Do not show Sign up and Log in buttons on the first or second slide.
- Show the auth actions only on the last onboarding slide.
- Keep the action styling simple and elegant rather than oversized or promotional.
- Reduce extra decorative blocks and avoid feature-card density inside the onboarding screen.

The flow should feel like a calm native intro, not a landing page.

## Auth Corrections

Sign-up, login, OTP, and biometric screens should be simplified.

- Reduce secondary copy length.
- Remove decorative surfaces that compete with the form itself.
- Keep one strong primary action and one quieter secondary path where needed.
- Use more whitespace and fewer stacked visual treatments.

### OTP rule

- Do not display the demo OTP code in the UI.
- The demo OTP remains in code only.
- The current demo OTP is `204811` in `features/auth/mock-auth.ts`.

The OTP screen should look trustworthy and minimal.

## Visual Language Corrections

Use the dashboard reference as the visual benchmark for the rest of the app.

- More breathing room
- Fewer explanatory paragraphs
- Fewer decorative chips
- Simpler card hierarchy
- Clearer emphasis on money and actions
- More white space between sections
- Less “marketing site” energy
- More “installed mobile banking app” energy

## Scope

This correction pass applies to the screens already built in milestones 3 and 4:

- Splash
- Onboarding
- Sign up
- Login
- OTP
- Biometric
- Dashboard `/app`
- Minimal authenticated placeholder routes only where visual consistency is needed

This correction pass does not add new flows or new product scope.

## Acceptance Criteria

- `/app` visually matches the uploaded reference much more closely than the current implementation.
- The dashboard is less crowded and more minimalist.
- Onboarding only reveals auth CTAs on the last slide.
- OTP no longer shows the demo code in the UI.
- Entry and auth screens feel simpler and more native.
- Single-wallet XAF semantics remain correct despite the “pockets” visual style.
