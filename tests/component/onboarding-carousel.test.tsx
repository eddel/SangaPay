import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { OnboardingCarousel } from "@/components/sangapay/onboarding-carousel";

describe("OnboardingCarousel", () => {
  it("advances through the three onboarding slides", () => {
    render(<OnboardingCarousel />);

    expect(screen.getByText("Fast EUR transfers.")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Move XAF into SEPA Instant payouts with clear fees and live conversion.",
      ),
    ).toBeInTheDocument();
    expect(screen.queryByText("FX view")).not.toBeInTheDocument();
    expect(screen.queryByText("Fees")).not.toBeInTheDocument();
    expect(screen.queryByText("Live quote")).not.toBeInTheDocument();
    expect(screen.queryByText("Always visible")).not.toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("Slide 1 of 3");
    expect(
      screen.queryByRole("link", { name: "Create account" }),
    ).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Log in" })).not.toBeInTheDocument();

    const continueButton = screen.getByRole("button", { name: "Continue" });
    expect(continueButton).toHaveClass("bg-[var(--color-emerald)]");
    expect(continueButton.querySelector("svg")).toBeInTheDocument();

    const onboardingCard = screen.getByLabelText("Onboarding slide");
    expect(onboardingCard).toHaveClass("bg-[var(--color-emerald)]");

    fireEvent.click(continueButton);

    expect(screen.getByText("Crypto transfers.")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Convert XAF to USDC and send to supported exchanges or external wallets.",
      ),
    ).toBeInTheDocument();
    expect(screen.queryByText("FX view")).not.toBeInTheDocument();
    expect(screen.queryByText("Fees")).not.toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("Slide 2 of 3");
    expect(
      screen.queryByRole("link", { name: "Create account" }),
    ).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Log in" })).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Continue" }));

    expect(screen.getByText("Competitive exchange rates.")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Track real-time estimates before you commit any transfer.",
      ),
    ).toBeInTheDocument();
    expect(screen.queryByText("FX view")).not.toBeInTheDocument();
    expect(screen.queryByText("Fees")).not.toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("Slide 3 of 3");
    expect(
      screen.queryByRole("button", { name: "Continue" }),
    ).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Create account" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Log in" })).toBeInTheDocument();
  });
});
