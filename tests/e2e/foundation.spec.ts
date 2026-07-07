import { expect, test } from "@playwright/test";

test("loads the foundation shell on a 390px mobile viewport", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "Send Across Borders Instantly." }),
  ).toBeVisible();
  await expect(page.getByText("Premium remittance for African users")).toBeVisible();
  await expect(page.getByRole("link", { name: "Continue" })).toHaveAttribute(
    "href",
    "/onboarding",
  );
  await expect(page.getByRole("link", { name: "I already have an account" })).toHaveAttribute(
    "href",
    "/login",
  );
});
