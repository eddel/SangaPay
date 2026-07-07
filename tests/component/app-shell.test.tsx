import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DemoDashboardShell } from "@/components/sangapay/demo-dashboard-shell";

describe("DemoDashboardShell", () => {
  it("renders the corrected wallet hero, pockets row, and live rate strip", () => {
    render(<DemoDashboardShell />);

    const walletCard = screen.getByRole("region", { name: "Main XAF wallet" });
    expect(within(walletCard).getByText("Total balance")).toBeInTheDocument();
    expect(within(walletCard).getByText(/2,450,000/)).toBeInTheDocument();

    const pockets = screen.getByRole("region", { name: "My pockets" });
    expect(within(pockets).getByText("Main wallet")).toBeInTheDocument();
    expect(within(pockets).getAllByText("Equivalent view")).toHaveLength(2);

    const liveRates = screen.getByRole("region", { name: "Live rates" });
    expect(within(liveRates).getByText("Live rate")).toBeInTheDocument();
    expect(within(liveRates).getByText("Updated 12 sec ago")).toBeInTheDocument();
  });
});
