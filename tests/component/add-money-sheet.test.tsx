import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import AddMoneyPage from "@/app/(app)/app/add-money/page";
import { DemoAddMoneySheet } from "@/components/sangapay/demo-add-money-sheet";

describe("DemoAddMoneySheet", () => {
  it("renders a Cameroon mobile money top up popup from the add money route", () => {
    render(<DemoAddMoneySheet />);

    expect(screen.getByRole("dialog", { name: "Add money" })).toBeInTheDocument();
    expect(screen.getAllByText("MTN MoMo").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Orange Money").length).toBeGreaterThan(0);
    expect(screen.getByRole("textbox", { name: "Amount in XAF" })).toHaveValue("100000");
    expect(screen.getByRole("textbox", { name: "Mobile money number" })).toBeInTheDocument();
    expect(screen.getByText("Total charge")).toBeInTheDocument();
    expect(screen.getByText("400 XAF (0.4%)")).toBeInTheDocument();
    expect(screen.getByText("100,400 XAF")).toBeInTheDocument();
  });

  it("lets the user choose a provider and submit a top up request", async () => {
    const user = userEvent.setup();
    render(<DemoAddMoneySheet />);

    await user.click(screen.getByRole("button", { name: "Orange Money Use Orange Money for a fast wallet funding request." }));
    await user.clear(screen.getByRole("textbox", { name: "Amount in XAF" }));
    await user.type(screen.getByRole("textbox", { name: "Amount in XAF" }), "250000");
    await user.click(screen.getByRole("button", { name: "Request top up" }));

    expect(screen.getByRole("heading", { level: 2, name: "Request sent" })).toBeInTheDocument();
    expect(screen.getByText("Orange Money")).toBeInTheDocument();
    expect(screen.getByText("251,000 XAF")).toBeInTheDocument();
  });
});

describe("add money route", () => {
  it("mounts the add money popup route", () => {
    render(<AddMoneyPage />);

    expect(screen.getByRole("dialog", { name: "Add money" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Close add money" })).toHaveAttribute("href", "/app");
  });
});
