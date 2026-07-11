import { expect, test } from "@playwright/test";

test("send crypto quick action opens the mobile USDC transfer flow", async ({ page }) => {
  await page.goto("/app");

  await expect(page.getByRole("link", { name: "Send Crypto" })).toHaveAttribute(
    "href",
    "/app/send-crypto",
  );

  await page.goto("/app/send-crypto");
  await expect(page).toHaveURL("/app/send-crypto");
  await expect(page.getByRole("heading", { name: "Send USDC" })).toBeVisible();
  await expect(page.getByRole("spinbutton", { name: "Amount in XAF" })).toHaveValue(
    "150000",
  );
  await expect(page.getByText("243.68 USDC")).toBeVisible();

  await page.getByRole("button", { name: "Continue to wallet" }).click();
  await page.getByRole("textbox", { name: "Wallet address" }).fill("0x1234");
  await page.getByRole("button", { name: "Review transfer" }).click();

  await expect(page.getByText("Enter a valid Base wallet address.")).toBeVisible();
});
