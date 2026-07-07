import { expect, test } from "@playwright/test";

test("home dashboard exposes the main wallet, active home tab, and quick actions", async ({
  page,
}) => {
  await page.goto("/app");

  await expect(page.getByRole("heading", { name: "Good morning, Alain" })).toBeVisible();
  await expect(page.getByRole("region", { name: "Main XAF wallet" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "My pockets" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Live rate" })).toBeVisible();
  await expect(page.getByText("Updated 12 sec ago")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Recent transactions" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Home" })).toHaveAttribute(
    "aria-current",
    "page",
  );
  await expect(page.getByRole("link", { name: "Send EUR" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Send Crypto" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Add Money" })).toBeVisible();
});
