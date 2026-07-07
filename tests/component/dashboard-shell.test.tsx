import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DemoDashboardShell } from "@/components/sangapay/demo-dashboard-shell";

describe("DemoDashboardShell", () => {
  it("renders the simplified dashboard correction pass from the reference", () => {
    render(<DemoDashboardShell />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Good morning, Alain" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "My pockets" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "Live rate" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "Recent transactions" }),
    ).toBeInTheDocument();
    expect(screen.queryByText(/treasury/i)).not.toBeInTheDocument();

    const walletCard = screen.getByRole("region", { name: "Main XAF wallet" });
    expect(within(walletCard).getByText("Total balance")).toBeInTheDocument();
    expect(within(walletCard).getByText(/2,450,000/)).toBeInTheDocument();
    expect(within(walletCard).getByText(/~\s*€3,733\.80/)).toBeInTheDocument();
    expect(within(walletCard).getByText(/3,980\.20 USDC/)).toBeInTheDocument();

    const pockets = screen.getByRole("region", { name: "My pockets" });
    expect(within(pockets).getByText("XAF")).toBeInTheDocument();
    expect(within(pockets).getByText("EUR")).toBeInTheDocument();
    expect(within(pockets).getByText("USDC")).toBeInTheDocument();
    expect(within(pockets).getByText("Main wallet")).toBeInTheDocument();
    expect(within(pockets).getAllByText("Equivalent view")).toHaveLength(2);
    expect(
      within(pockets).getByText("Equivalent views only - no separate funded wallets"),
    ).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Manage" })).not.toBeInTheDocument();

    const liveRates = screen.getByRole("region", { name: "Live rates" });
    expect(within(liveRates).getByText("Live rate")).toBeInTheDocument();
    expect(within(liveRates).getByText("1 EUR = 655.96 XAF")).toBeInTheDocument();
    expect(within(liveRates).getByText("1 USDC = 615.55 XAF")).toBeInTheDocument();
    expect(within(liveRates).getByText("Updated 12 sec ago")).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "View all rates" })).not.toBeInTheDocument();

    expect(screen.getByRole("link", { name: "Send EUR" })).toHaveAttribute(
      "href",
      "/app/send-eur",
    );
    expect(screen.getByRole("link", { name: "Send Crypto" })).toHaveAttribute(
      "href",
      "/app/send-crypto",
    );
    expect(screen.getByRole("link", { name: "Add Money" })).toHaveAttribute(
      "href",
      "/app/add-money",
    );
    expect(screen.queryByText("USDC on-chain")).not.toBeInTheDocument();
    expect(screen.queryByText("Top up wallet")).not.toBeInTheDocument();

    const activity = screen.getByRole("region", { name: "Recent transactions" });
    expect(screen.queryByRole("link", { name: "View all" })).not.toBeInTheDocument();
    expect(
      within(activity).getByText((_, node) =>
        node?.textContent === "SEPA Instant - Sent",
      ),
    ).toBeInTheDocument();
    expect(within(activity).getByText("Sent")).toBeInTheDocument();
    expect(within(activity).getByText("-EUR 350.00")).toBeInTheDocument();
    expect(within(activity).getAllByText("Completed")).toHaveLength(2);
  });
});
