"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { OnboardingProgress } from "@/components/sangapay/onboarding-progress";

const slides = [
  {
    title: "Fast EUR transfers.",
    description:
      "Move XAF into SEPA Instant payouts with clear fees and live conversion.",
    eyebrow: "Euro corridor",
  },
  {
    title: "Crypto transfers.",
    description:
      "Convert XAF to USDC and send to supported exchanges or external wallets.",
    eyebrow: "Crypto rails",
  },
  {
    title: "Competitive exchange rates.",
    description: "Track real-time estimates before you commit any transfer.",
    eyebrow: "Live pricing",
  },
] as const;

export function OnboardingCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slide = slides[currentIndex];
  const isLastSlide = currentIndex === slides.length - 1;
  const accentLabel = useMemo(
    () => `${String(currentIndex + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`,
    [currentIndex],
  );

  return (
    <div className="flex min-h-dvh flex-col justify-between py-8">
      <div>
        <div className="flex items-center justify-between">
          <span className="rounded-full border border-[var(--color-ring)] bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
            SangaPay
          </span>
          <OnboardingProgress currentIndex={currentIndex} total={slides.length} />
        </div>

        <div className="mt-10 overflow-hidden rounded-[32px] border border-emerald-200 bg-emerald-50 p-6">
          <div
            aria-label="Onboarding slide"
            className="rounded-[28px] bg-[var(--color-emerald-deep)] p-6 text-white"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/72">
                  {slide.eyebrow}
                </p>
                <h1 className="mt-4 max-w-[12rem] text-3xl font-semibold tracking-[-0.05em]">
                  {slide.title}
                </h1>
              </div>
             
            </div>

            <p className="mt-8 max-w-[17rem] text-sm leading-6 text-white/72">
              {slide.description}
            </p>

          </div>
        </div>
      </div>

      <div className="space-y-3 pb-2">
        {!isLastSlide ? (
          <button
            type="button"
            className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-[var(--color-emerald)] text-sm font-semibold text-white"
            onClick={() => setCurrentIndex((index) => Math.min(index + 1, slides.length - 1))}
          >
            Continue
            <ArrowRight className="size-4" />
          </button>
        ) : null}

        {isLastSlide ? (
          <>
            <Link
              href="/signup"
              className="flex h-14 items-center justify-center rounded-full bg-[var(--color-emerald)] text-sm font-semibold text-white"
            >
              Create account
            </Link>
            <Link
              href="/login"
              className="flex h-14 items-center justify-center rounded-full border border-[var(--color-ring)] bg-white text-sm font-semibold text-slate-950"
            >
              Log in
            </Link>
          </>
        ) : null}
      </div>
    </div>
  );
}
