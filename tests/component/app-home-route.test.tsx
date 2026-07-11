import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import AppHomePage from "@/app/(app)/app/page";
import AppHomeLoading from "@/app/(app)/app/loading";

describe("app home route", () => {
  it("renders the corrected dashboard shell on the /app route", async () => {
    render(await AppHomePage());

    expect(
      screen.getByRole("heading", { level: 1, name: "Good morning, Jaja" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "Live rate" })).toBeInTheDocument();
    expect(screen.getByText("Updated 12 sec ago")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByRole("link", { name: "Rates" })).toHaveAttribute(
      "href",
      "/app/rates",
    );
  });

  it("provides an accessible route-level loading state for dashboard navigation", () => {
    render(<AppHomeLoading />);

    expect(screen.getByRole("status")).toHaveTextContent("Loading dashboard");
    expect(screen.getByText("Preparing treasury overview")).toBeInTheDocument();
  });
});
