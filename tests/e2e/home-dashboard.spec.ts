import { expect, test } from "@playwright/test";

test("home dashboard exposes the main wallet, active home tab, and quick actions", async ({
  page,
}) => {
  await page.goto("/app");

  await expect(page.getByRole("heading", { name: "Good morning, Jaja" })).toBeVisible();
  await expect(page.getByRole("region", { name: "Main XAF wallet" })).toBeVisible();
  await page.getByRole("button", { name: "Hide balance" }).click();
  await expect(page.getByText("*********")).toBeVisible();
  await page.getByRole("button", { name: "Show balance" }).click();
  await expect(page.getByText("2,450,000")).toBeVisible();
  await expect(page.getByRole("region", { name: "My pockets" })).toHaveCount(0);
  await expect(page.getByRole("link", { name: "Manage" })).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "Live rate" })).toBeVisible();
  await expect(page.getByText("1 EUR = 655.96 XAF")).toBeVisible();
  await expect(page.getByText("1 USDC = 615.55 XAF")).toBeVisible();
  await expect(page.getByText("Updated 12 sec ago")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Recent transactions" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Home" })).toHaveAttribute(
    "aria-current",
    "page",
  );
  await expect(page.getByRole("link", { name: "Rates" })).toHaveAttribute(
    "href",
    "/app/rates",
  );
  await expect(page.getByRole("link", { name: "Send EUR" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Send Crypto" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Add Money" })).toBeVisible();
});
