import { expect, test } from "@playwright/test";

test("loads the foundation shell on a 390px mobile viewport", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Send XAF Across Borders." })).toBeVisible();
  await expect(
    page.getByText("Premium remittance for African users moving Cameroon XAF"),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Get Started" })).toHaveAttribute(
    "href",
    "/onboarding",
  );
  await expect(page.getByRole("link", { name: "I already have an account" })).toHaveAttribute(
    "href",
    "/login",
  );
});
