import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SplashScreen } from "@/components/sangapay/splash-screen";

describe("SplashScreen", () => {
  it("shows the sangapay logo and tagline", () => {
    render(<SplashScreen />);

    expect(screen.getByText("SangaPay")).toBeInTheDocument();
    expect(
      screen.getByText("Send XAF Across Borders."),
    ).toBeInTheDocument();
  });
});
