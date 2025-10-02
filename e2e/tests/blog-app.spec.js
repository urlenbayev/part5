const { test, expect, beforeEach, describe } = require("@playwright/test");
const { loginWith, createBlog, likeBlog } = require("./helper");
describe("Blog app", () => {
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
    test("successful login", async ({ page }) => {
      await loginWith(page, "demo_user", "demo_1");
      await expect(page.getByText("Demo User is logged in")).toBeVisible();
    });

    test("failed login", async ({ page }) => {
      await loginWith(page, "sadsadr", "asdsa");
      await expect(page.getByText("blogs")).toBeHidden();
    });
  });

  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, "demo_user", "demo_1");
    });

    test("a new blog can be created", async ({ page }) => {
      await createBlog(page, "Demo title 222", "Demo author", "demo url");
      await expect(page.getByText("Demo title")).toBeVisible();
    });

    describe("and a blog exists", () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, "Demo title", "Demo author", "demo url");
        await page.getByRole("button", { name: "view" }).click();
      });
      test("likes can be incremented", async ({ page }) => {
        await page.getByRole("button", { name: "like" }).click();
        await expect(page.getByText("likes 1")).toBeVisible();
      });
      test("blog can be deleted", async ({ page }) => {
        page.on("dialog", (dialog) => dialog.accept());
        await page.getByRole("button", { name: "delete" }).click();
        await expect(page.getByText("Demo title 222")).toBeHidden();
      });
    });

    test("Blogs are sorted by likes", async ({ page }) => {
      await createBlog(
        page,
        "First Blog with 10 likes",
        "Demo author",
        "demo url"
      );
      await createBlog(
        page,
        "Second Blog with 13 likes",
        "Demo author",
        "demo url"
      );

      const blogs = page.locator(".blog");

      const firstBlog = blogs.filter({ hasText: "First Blog with 10 likes" });

      const secondBlog = blogs.filter({ hasText: "Second Blog with 13 likes" });

      await likeBlog(firstBlog, 10);
      await likeBlog(secondBlog, 13);

      await expect(blogs.first()).toContainText("Second Blog with 13 likes");
      await expect(blogs.last()).toContainText("First Blog with 10 likes");
    });

    describe("with multiple users", () => {
      beforeEach(async ({ request }) => {
        await request.post("http://localhost:3001/api/users", {
          data: {
            name: "Demo User2",
            username: "demo_user2",
            password: "demo_2",
          },
        });
      });
      test("only the owner can see delete button for their blogs", async ({
        page,
      }) => {
        await createBlog(page, "Demo title1", "Demo authorfirst", "demo url1");
        await page.getByRole("button", { name: "View" }).click();
        await expect(
          page.getByRole("button", { name: "delete" })
        ).toBeVisible();
        await page.getByRole("button", { name: "log out" }).click();
        await loginWith(page, "demo_user2", "demo_2");
        await page.getByRole("button", { name: "View" }).click();
        await expect(page.getByRole("button", { name: "delete" })).toBeHidden();
      });
    });
  });
});
