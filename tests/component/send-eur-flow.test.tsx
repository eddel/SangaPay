import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import SendEurPage from "@/app/(app)/app/send-eur/page";
import { DemoEurTransferFlow } from "@/components/sangapay/demo-eur-transfer-flow";
import { copyTextToClipboard, shareReceipt } from "@/lib/native-actions";

vi.mock("@/lib/native-actions", () => ({
  copyTextToClipboard: vi.fn().mockResolvedValue(true),
  shareReceipt: vi.fn().mockResolvedValue("shared"),
}));

beforeEach(() => {
  vi.mocked(copyTextToClipboard).mockClear();
  vi.mocked(shareReceipt).mockClear();
});

describe("DemoEurTransferFlow", () => {
  it("starts on an amount conversion screen with wallet, rate, fee, and delivery details", () => {
    render(<DemoEurTransferFlow />);

    expect(screen.getByRole("heading", { level: 1, name: "Send EUR" })).toBeInTheDocument();
    expect(screen.getByRole("spinbutton", { name: "Amount in XAF" })).toHaveValue(150000);
    expect(screen.getByText("EUR recipient gets")).toBeInTheDocument();
    expect(screen.getByText("EUR 228.67")).toBeInTheDocument();
    expect(screen.getByText("1 EUR = 655.96 XAF")).toBeInTheDocument();
    expect(screen.getByText("Fee")).toBeInTheDocument();
    expect(screen.getByText("1,200 XAF")).toBeInTheDocument();
    expect(screen.getAllByText("SEPA Instant")).toHaveLength(2);
    expect(screen.getByRole("button", { name: "Continue to recipient" })).toBeEnabled();
  });

  it("validates SEPA details and completes the review, confirmation, and receipt flow", async () => {
    const user = userEvent.setup();
    render(<DemoEurTransferFlow />);

    await user.click(screen.getByRole("button", { name: "Continue to recipient" }));
    expect(screen.getByRole("heading", { level: 1, name: "Recipient details" })).toBeInTheDocument();

    await user.type(screen.getByRole("textbox", { name: "Recipient full name" }), "Marie Dubois");
    await user.type(screen.getByRole("textbox", { name: "IBAN" }), "FR14");
    await user.type(screen.getByRole("textbox", { name: "Transfer note" }), "Family support");
    await user.click(screen.getByRole("button", { name: "Review transfer" }));

    expect(screen.getByText("Enter a valid IBAN with at least 15 characters.")).toBeInTheDocument();

    await user.clear(screen.getByRole("textbox", { name: "IBAN" }));
    await user.type(
      screen.getByRole("textbox", { name: "IBAN" }),
      "FR1420041010050500013M02606",
    );
    await user.click(screen.getByRole("button", { name: "Review transfer" }));

    const review = screen.getByRole("region", { name: "Transfer review" });
    expect(within(review).getByText("Marie Dubois")).toBeInTheDocument();
    expect(within(review).getByText("FR14 2004 1010 0505 0001 3M02 606")).toBeInTheDocument();
    expect(within(review).getByText("EUR 228.67")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Confirm and send" }));
    expect(screen.getByRole("status")).toHaveTextContent("Sending transfer");

    expect(
      await screen.findByRole("heading", { level: 1, name: "Transfer sent" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Arrives in seconds via SEPA Instant")).toBeInTheDocument();
    expect(screen.getByText("Transaction ID")).toBeInTheDocument();
    expect(screen.getByText("SGP-EUR-4872")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Share receipt" })).toBeEnabled();

    await user.click(screen.getByRole("button", { name: "Copy ID" }));
    expect(copyTextToClipboard).toHaveBeenCalledWith("SGP-EUR-4872");

    await user.click(screen.getByRole("button", { name: "Share receipt" }));
    expect(shareReceipt).toHaveBeenCalled();
  });
});

describe("send EUR route", () => {
  it("mounts the EUR transfer flow", () => {
    render(<SendEurPage />);

    expect(screen.getByRole("heading", { level: 1, name: "Send EUR" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Back to home" })).toHaveAttribute("href", "/app");
  });
});
