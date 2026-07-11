import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import SendCryptoPage from "@/app/(app)/app/send-crypto/page";
import { DemoUsdcTransferFlow } from "@/components/sangapay/demo-usdc-transfer-flow";
import { copyTextToClipboard, shareReceipt } from "@/lib/native-actions";

vi.mock("@/lib/native-actions", () => ({
  copyTextToClipboard: vi.fn().mockResolvedValue(true),
  shareReceipt: vi.fn().mockResolvedValue("shared"),
}));

beforeEach(() => {
  vi.mocked(copyTextToClipboard).mockClear();
  vi.mocked(shareReceipt).mockClear();
});

describe("DemoUsdcTransferFlow", () => {
  it("starts on an amount and network selection screen with conversion and fee details", () => {
    render(<DemoUsdcTransferFlow />);

    expect(screen.getByRole("heading", { level: 1, name: "Send USDC" })).toBeInTheDocument();
    expect(screen.getByRole("spinbutton", { name: "Amount in XAF" })).toHaveValue(150000);
    expect(screen.getByText("USDC recipient gets")).toBeInTheDocument();
    expect(screen.getByText("243.68 USDC")).toBeInTheDocument();
    expect(screen.getByText("1 USDC = 615.55 XAF")).toBeInTheDocument();
    expect(screen.getByText("Network fee")).toBeInTheDocument();
    expect(screen.getByText("900 XAF")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Continue to wallet" })).toBeEnabled();
  });

  it("validates the wallet address and completes review, confirmation, and receipt", async () => {
    const user = userEvent.setup();
    render(<DemoUsdcTransferFlow />);

    await user.click(screen.getByRole("button", { name: "Continue to wallet" }));
    expect(screen.getByRole("heading", { level: 1, name: "Wallet details" })).toBeInTheDocument();

    await user.type(screen.getByRole("textbox", { name: "Wallet address" }), "0x1234");
    await user.type(screen.getByRole("textbox", { name: "Destination label" }), "Binance wallet");
    await user.click(screen.getByRole("button", { name: "Review transfer" }));

    expect(screen.getByText("Enter a valid Base wallet address.")).toBeInTheDocument();

    await user.clear(screen.getByRole("textbox", { name: "Wallet address" }));
    await user.type(
      screen.getByRole("textbox", { name: "Wallet address" }),
      "0x1234567890abcdef1234567890abcdef12345678",
    );
    await user.click(screen.getByRole("button", { name: "Review transfer" }));

    const review = screen.getByRole("region", { name: "Transfer review" });
    expect(within(review).getByText("Base")).toBeInTheDocument();
    expect(within(review).getByText("0x1234...5678")).toBeInTheDocument();
    expect(within(review).getByText("243.68 USDC")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Confirm and send" }));
    expect(screen.getByRole("status")).toHaveTextContent("Sending transfer");

    expect(
      await screen.findByRole("heading", { level: 1, name: "Transfer sent" }),
    ).toBeInTheDocument();
    expect(screen.getByText("USDC is on the way to the recipient wallet")).toBeInTheDocument();
    expect(screen.getByText("Transaction ID")).toBeInTheDocument();
    expect(screen.getByText("SGP-USDC-5831")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Share receipt" })).toBeEnabled();

    await user.click(screen.getByRole("button", { name: "Copy ID" }));
    expect(copyTextToClipboard).toHaveBeenCalledWith("SGP-USDC-5831");

    await user.click(screen.getByRole("button", { name: "Share receipt" }));
    expect(shareReceipt).toHaveBeenCalled();
  });
});

describe("send crypto route", () => {
  it("mounts the USDC transfer flow", () => {
    render(<SendCryptoPage />);

    expect(screen.getByRole("heading", { level: 1, name: "Send USDC" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Back to home" })).toHaveAttribute("href", "/app");
  });
});
