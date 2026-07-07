import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TopBar } from "@/components/sangapay/top-bar";

describe("TopBar", () => {
  it("renders the SangaPay wordmark, greeting, and notifications entry for the mobile dashboard", () => {
    render(<TopBar firstName="Alain" />);

    expect(screen.getByText("SangaPay")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 1, name: "Good morning, Alain" }),
    ).toBeInTheDocument();
    expect(screen.queryByText(/treasury/i)).not.toBeInTheDocument();
  });

  it("exposes notifications as a real link to the inbox route", () => {
    render(<TopBar firstName="Alain" />);

    expect(screen.getByRole("link", { name: "Notifications" })).toHaveAttribute(
      "href",
      "/app/notifications",
    );
  });
});
