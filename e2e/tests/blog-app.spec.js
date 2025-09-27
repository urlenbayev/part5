const { test, expect, beforeEach, describe } = require("@playwright/test");

describe("Blog app", async () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3001/api/testing/reset");
    await request.post("http://localhost:3001/api/users", {
      data: {
        name: "Demo User",
        username: "demo_user",
        password: "demo_1",
      },
    });
    await page.goto("/");
  });

  test("Login form is shown", async ({ page }) => {
    await expect(page.getByText("Log in")).toBeVisible();
    await expect(page.getByLabel("username")).toBeVisible();
    await expect(page.getByLabel("password")).toBeVisible();
    await expect(page.getByRole("button", { name: "login" })).toBeVisible();
  });

  describe("Login", () => {
    test.only("successful login", async ({ page }) => {
      await page.getByLabel("username").fill("demo_user");
      await page.getByLabel("password").fill("demo_1");

      await page.getByRole("button", { name: "login" }).click();
      await expect(page.getByText("Demo User is logged in")).toBeVisible();
    });

    test.only("failed login", async ({ page }) => {
      await page.getByLabel("username").fill("cri");
      await page.getByLabel("password").fill("eqf");

      await page.getByRole("button", { name: "login" }).click();
      await expect(page.getByText("blogs")).toBeHidden();
    });
  });
});
