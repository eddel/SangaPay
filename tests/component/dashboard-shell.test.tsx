import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { DemoDashboardShell } from "@/components/sangapay/demo-dashboard-shell";

describe("DemoDashboardShell", () => {
  it("renders the home dashboard in the uploaded reference layout using existing demo data", async () => {
    const user = userEvent.setup();

    render(<DemoDashboardShell />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Good morning, Jaja" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "Live rate" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "Recent transactions" }),
    ).toBeInTheDocument();

    const walletCard = screen.getByRole("region", { name: "Main XAF wallet" });
    expect(within(walletCard).getByText("Total balance")).toBeInTheDocument();
    expect(within(walletCard).getByText(/2,450,000/)).toBeInTheDocument();
    expect(within(walletCard).getByText(/3,733\.80/)).toBeInTheDocument();
    expect(within(walletCard).getByText(/3,980\.20 USDC/)).toBeInTheDocument();

    await user.click(within(walletCard).getByRole("button", { name: "Hide balance" }));
    expect(within(walletCard).getByText("*********")).toBeInTheDocument();
    expect(within(walletCard).getByText("~ ****")).toBeInTheDocument();
    expect(within(walletCard).getByText("**** USDC")).toBeInTheDocument();
    await user.click(within(walletCard).getByRole("button", { name: "Show balance" }));
    expect(within(walletCard).getByText(/2,450,000/)).toBeInTheDocument();

    expect(screen.queryByRole("region", { name: "My pockets" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Manage" })).not.toBeInTheDocument();

    expect(screen.getByRole("link", { name: "Send EUR" })).toHaveAttribute(
      "href",
      "/app/send-eur",
    );
    expect(screen.getByRole("link", { name: "Send Crypto" })).toHaveAttribute(
      "href",
      "/app/send-crypto",
    );
    expect(screen.getAllByText("SEPA Instant").length).toBeGreaterThan(0);
    expect(screen.getByText("USDC on-chain")).toBeInTheDocument();
    expect(screen.getByText("Top up wallet")).toBeInTheDocument();

    const liveRates = screen.getByRole("region", { name: "Live rates" });
    expect(within(liveRates).getByText("Live rate")).toBeInTheDocument();
    expect(within(liveRates).getByText("1 EUR = 655.96 XAF")).toBeInTheDocument();
    expect(within(liveRates).getByText("1 USDC = 615.55 XAF")).toBeInTheDocument();
    expect(within(liveRates).getByText("Updated 12 sec ago")).toBeInTheDocument();
    expect(within(liveRates).getByRole("link")).toHaveAttribute("href", "/app/rates");

    const activity = screen.getByRole("region", { name: "Recent transactions" });
    expect(screen.getByRole("link", { name: "View all" })).toHaveAttribute(
      "href",
      "/app/history",
    );
    expect(within(activity).getByText("Marie Dubois")).toBeInTheDocument();
    expect(within(activity).getAllByText("SEPA Instant").length).toBeGreaterThan(0);
    expect(within(activity).getAllByText("Completed").length).toBeGreaterThan(0);
    expect(within(activity).getByText("-EUR 350.00")).toBeInTheDocument();
    expect(within(activity).getByRole("link", { name: /Marie Dubois/i })).toHaveAttribute(
      "href",
      "/app/history/txn_10428",
    );
  });
});
