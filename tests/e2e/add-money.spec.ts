import { expect, test } from "@playwright/test";

test("add money quick action opens a Cameroon mobile money popup flow", async ({ page }) => {
  await page.goto("/app");

  await expect(page.getByRole("link", { name: "Add Money" })).toHaveAttribute(
    "href",
    "/app/add-money",
  );
  await page.goto("/app/add-money");
  await expect(page).toHaveURL("/app/add-money");
  await expect(page.getByRole("dialog", { name: "Add money" })).toBeVisible();
  await expect(page.getByRole("textbox", { name: "Amount in XAF" })).toBeVisible();
  await expect(page.getByText("Orange Money").first()).toBeVisible();
  await expect(page.getByText("100,400 XAF")).toBeVisible();
});
