import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DemoDashboardShell } from "@/components/sangapay/demo-dashboard-shell";

describe("DemoDashboardShell", () => {
  it("renders the corrected wallet hero, quick actions, and live rate strip", () => {
    render(<DemoDashboardShell />);

    const walletCard = screen.getByRole("region", { name: "Main XAF wallet" });
    expect(within(walletCard).getByText("Total balance")).toBeInTheDocument();
    expect(within(walletCard).getByText(/2,450,000/)).toBeInTheDocument();

    expect(screen.queryByRole("region", { name: "My pockets" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Manage" })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Send EUR" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Send Crypto" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Add Money" })).toBeInTheDocument();

    const liveRates = screen.getByRole("region", { name: "Live rates" });
    expect(within(liveRates).getByText("Live rate")).toBeInTheDocument();
    expect(within(liveRates).getByText("1 EUR = 655.96 XAF")).toBeInTheDocument();
  });
});
