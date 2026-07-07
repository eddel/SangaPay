import { expect, test } from "@playwright/test";

test("entry auth flow handles invalid otp before reaching biometric setup", async ({
  page,
}) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "Send Across Borders Instantly." }),
  ).toBeVisible();

  await expect(page.getByRole("link", { name: "I already have an account" })).toHaveAttribute(
    "href",
    "/login",
  );
  await page.goto("/login");

  await expect(
    page.getByRole("heading", { name: "Log in with your phone." }),
  ).toBeVisible();

  await page.getByRole("textbox", { name: "Phone number" }).fill("+237 670 000 000");
  await page.getByRole("button", { name: "Continue to OTP" }).click();

  await expect(page.getByRole("heading", { name: "Enter your code." })).toBeVisible();

  await page.getByRole("textbox", { name: "Verification code" }).fill("000000");
  await page.getByRole("button", { name: "Verify account" }).click();

  await expect(page.getByText("That code is invalid or expired")).toBeVisible();

  await page.getByRole("textbox", { name: "Verification code" }).fill("204811");
  await page.getByRole("button", { name: "Verify account" }).click();

  await expect(page.getByRole("heading", { name: "Set up Face ID." })).toBeVisible();
  await expect(page.getByRole("button", { name: "Enable Face ID" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Maybe later" })).toBeVisible();
});
