import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { BottomNav } from "@/components/sangapay/bottom-nav";

const { usePathname } = vi.hoisted(() => ({
  usePathname: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  usePathname,
}));

beforeEach(() => {
  usePathname.mockReset();
  usePathname.mockReturnValue("/app");
});

describe("BottomNav", () => {
  it("renders the three primary tabs as real links and marks home active on the dashboard route", () => {
    render(<BottomNav />);

    expect(
      screen.getByRole("navigation", { name: "Primary navigation" }),
    ).toBeInTheDocument();

    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/app",
    );
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "aria-current",
      "page",
    );

    expect(screen.queryByRole("link", { name: "Rates" })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "History" })).toHaveAttribute(
      "href",
      "/app/history",
    );
    expect(screen.getByRole("link", { name: "Profile" })).toHaveAttribute(
      "href",
      "/app/profile",
    );
  });

  it("marks the matching tab active on nested app routes", () => {
    usePathname.mockReturnValue("/app/history/123");

    render(<BottomNav />);

    expect(screen.getByRole("link", { name: "History" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByRole("link", { name: "Home" })).not.toHaveAttribute(
      "aria-current",
    );
  });
});
