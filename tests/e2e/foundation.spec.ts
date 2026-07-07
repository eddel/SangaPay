import { expect, test } from "@playwright/test";

test("loads the foundation shell on a 390px mobile viewport", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByText("Available balance")).toBeVisible();
  await expect(page.getByText("Main XAF wallet")).toBeVisible();
  await expect(page.getByText("EUR estimate")).toBeVisible();
  await expect(page.getByRole("button", { name: "Install app" })).toBeVisible();
});
