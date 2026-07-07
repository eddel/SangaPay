import { expect, test } from "@playwright/test";

test("send eur quick action opens the mobile SEPA transfer flow", async ({ page }) => {
  await page.goto("/app");

  await expect(page.getByRole("link", { name: "Send EUR" })).toHaveAttribute(
    "href",
    "/app/send-eur",
  );

  await page.goto("/app/send-eur");
  await expect(page).toHaveURL("/app/send-eur");
  await expect(page.getByRole("heading", { name: "Send EUR" })).toBeVisible();
  await expect(page.getByRole("spinbutton", { name: "Amount in XAF" })).toHaveValue(
    "150000",
  );
  await expect(page.getByText("EUR 228.67")).toBeVisible();

  await page.getByRole("button", { name: "Continue to recipient" }).click();
  await page.getByRole("textbox", { name: "Recipient full name" }).fill("Marie Dubois");
  await page.getByRole("textbox", { name: "IBAN" }).fill("FR14");
  await page.getByRole("button", { name: "Review transfer" }).click();

  await expect(
    page.getByText("Enter a valid IBAN with at least 15 characters."),
  ).toBeVisible();
});
