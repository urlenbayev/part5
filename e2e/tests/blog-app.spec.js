const { test, expect, beforeEach, describe } = require("@playwright/test");

describe("Blog app", async () => {
  beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test.only("Login form is shown", async ({ page }) => {
    await expect(page.getByText("Log in")).toBeVisible();
    await expect(page.getByLabel("username")).toBeVisible();
    await expect(page.getByLabel("password")).toBeVisible();
    await expect(page.getByRole("button", { name: "login" })).toBeVisible();
  });
});
