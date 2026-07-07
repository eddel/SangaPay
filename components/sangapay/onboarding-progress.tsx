"use client";

type OnboardingProgressProps = {
  currentIndex: number;
  total: number;
};

export function OnboardingProgress({
  currentIndex,
  total,
}: OnboardingProgressProps) {
  return (
    <div className="flex items-center gap-2">
      <span role="status" aria-live="polite" className="sr-only">
        {`Slide ${currentIndex + 1} of ${total}`}
      </span>
      {Array.from({ length: total }).map((_, index) => {
        const isActive = index === currentIndex;

        return (
          <span
            key={index}
            aria-hidden="true"
            className={[
              "block h-2 rounded-full transition-all",
              isActive
                ? "w-8 bg-[var(--color-emerald)]"
                : "w-2 bg-slate-300/90",
            ].join(" ")}
          />
        );
      })}
    </div>
  );
}
