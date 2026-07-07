import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { InstallPrompt } from "@/components/sangapay/install-prompt";

describe("InstallPrompt", () => {
  it("shows the install call to action when a deferred prompt is available", () => {
    render(<InstallPrompt canInstall />);

    fireEvent.click(screen.getByRole("button", { name: "Install app" }));

    expect(screen.getByText("Install prompt ready")).toBeInTheDocument();
  });
});
