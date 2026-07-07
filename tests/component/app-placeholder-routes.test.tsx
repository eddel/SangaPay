import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HistoryPage from "@/app/(app)/app/history/page";
import NotificationsPage from "@/app/(app)/app/notifications/page";
import ProfilePage from "@/app/(app)/app/profile/page";
import RatesPage from "@/app/(app)/app/rates/page";

describe("app placeholder routes", () => {
  it("keeps the rates route as a real destination with the rates tab active", () => {
    render(<RatesPage />);

    expect(screen.getByRole("heading", { level: 1, name: "Rates" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Rates" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByRole("link", { name: "History" })).toHaveAttribute(
      "href",
      "/app/history",
    );
  });

  it("keeps the history route as a real destination with the history tab active", () => {
    render(<HistoryPage />);

    expect(screen.getByRole("heading", { level: 1, name: "History" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "History" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByRole("link", { name: "Profile" })).toHaveAttribute(
      "href",
      "/app/profile",
    );
  });

  it("keeps the profile route as a real destination with the profile tab active", () => {
    render(<ProfilePage />);

    expect(screen.getByRole("heading", { level: 1, name: "Profile" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Profile" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/app",
    );
  });

  it("keeps the notifications route reachable from the top bar without a false active tab", () => {
    render(<NotificationsPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Notifications" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/app");
    expect(screen.getByRole("link", { name: "Rates" })).not.toHaveAttribute(
      "aria-current",
    );
    expect(screen.getByRole("link", { name: "History" })).not.toHaveAttribute(
      "aria-current",
    );
    expect(screen.getByRole("link", { name: "Profile" })).not.toHaveAttribute(
      "aria-current",
    );
  });
});
