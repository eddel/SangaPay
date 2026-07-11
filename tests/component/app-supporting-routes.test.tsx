import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import HistoryPage from "@/app/(app)/app/history/page";
import NotificationsPage from "@/app/(app)/app/notifications/page";
import ProfilePage from "@/app/(app)/app/profile/page";
import RatesPage from "@/app/(app)/app/rates/page";
import TransactionDetailPage from "@/app/(app)/app/history/[id]/page";
import { shareReceipt } from "@/lib/native-actions";

vi.mock("@/lib/native-actions", () => ({
  copyTextToClipboard: vi.fn().mockResolvedValue(true),
  shareReceipt: vi.fn().mockResolvedValue("shared"),
}));

beforeEach(() => {
  vi.mocked(shareReceipt).mockClear();
});

describe("supporting app routes", () => {
  it("renders the rates screen with the rates tab active, chart visible, and swap action working", async () => {
    const user = userEvent.setup();
    render(<RatesPage />);

    expect(screen.getByRole("heading", { level: 1, name: "Rates" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Exchange rate line chart" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Rates" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByText("Estimated fee")).toBeInTheDocument();
    expect(screen.getByText("0.80 EUR")).toBeInTheDocument();
    expect(screen.getByText("Total quote")).toBeInTheDocument();
    expect(screen.getByText("100.80 EUR")).toBeInTheDocument();
    expect(screen.getByText("XAF")).toBeInTheDocument();
    expect(screen.getByText("USDC")).toBeInTheDocument();

    const amountInput = screen.getByRole("textbox", { name: "Reference amount" });
    await user.clear(amountInput);
    await user.type(amountInput, "200");
    expect(screen.getByDisplayValue("200")).toBeInTheDocument();
    expect(screen.getAllByText("131,192 XAF").length).toBeGreaterThan(0);
    expect(screen.getByText("201.60 EUR")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Swap converting currencies" }));
    expect(screen.getByText("Convert from XAF")).toBeInTheDocument();
    expect(screen.getByText("1 EUR = 655.96 XAF")).toBeInTheDocument();
    expect(screen.getByText("1,050 XAF")).toBeInTheDocument();
    expect(screen.getByText("132,242 XAF")).toBeInTheDocument();
  });

  it("renders history filters and transaction links on the history route", async () => {
    const user = userEvent.setup();
    render(<HistoryPage />);

    expect(screen.getByRole("heading", { level: 1, name: "History" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "History" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByRole("link", { name: /Marie Dubois/i })).toHaveAttribute(
      "href",
      "/app/history/txn_10428",
    );

    await user.click(screen.getByRole("button", { name: "pending" }));
    expect(screen.getByText("Binance Wallet")).toBeInTheDocument();
    expect(screen.queryByText("Marie Dubois")).not.toBeInTheDocument();
  });

  it("renders transaction detail with a receipt action", async () => {
    const user = userEvent.setup();
    render(await TransactionDetailPage({ params: Promise.resolve({ id: "txn_10428" }) }));

    expect(screen.getByRole("heading", { level: 1, name: "Transaction" })).toBeInTheDocument();
    expect(screen.getByText("Transaction ID")).toBeInTheDocument();
    expect(screen.getByText("txn_10428")).toBeInTheDocument();
    expect(screen.getByText("Marie Dubois")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Download receipt" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Download receipt" }));
    expect(shareReceipt).toHaveBeenCalled();
  });

  it("renders notifications actions and supports mark read flows without falsely activating a bottom tab", async () => {
    const user = userEvent.setup();
    render(<NotificationsPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Notifications" }),
    ).toBeInTheDocument();
    expect(screen.getByText("SEPA payout delivered")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Mark all as read" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Clear notifications" })).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: "Mark as read" }).length).toBeGreaterThan(0);
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/app");
    expect(screen.getByRole("link", { name: "Rates" })).not.toHaveAttribute("aria-current");

    await user.click(screen.getAllByRole("button", { name: "Mark as read" })[0]);
    expect(screen.getByText("Read")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Mark all as read" }));
    expect(screen.queryByRole("button", { name: "Mark as read" })).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Clear notifications" }));
    expect(screen.getByText("No notifications")).toBeInTheDocument();
  });

  it("renders profile, pending KYC call to action, and security settings on the profile route", async () => {
    const user = userEvent.setup();
    render(<ProfilePage />);

    expect(screen.getByRole("heading", { level: 1, name: "Profile" })).toBeInTheDocument();
    expect(screen.getByText("Jaja Mvondo")).toBeInTheDocument();
    expect(screen.getByText("Tier 1")).toBeInTheDocument();
    expect(screen.getByText("KYC pending")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Complete KYC verification" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Face ID/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Dark mode/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Profile" })).toHaveAttribute(
      "aria-current",
      "page",
    );

    await user.click(screen.getByRole("button", { name: "Complete KYC verification" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Still under development for now.")).toBeInTheDocument();
  });
});
