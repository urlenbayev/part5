const loginWith = async (page, username, password) => {
  await page.getByLabel("username").fill(username);
  await page.getByLabel("password").fill(password);
  await page.getByRole("button", { name: "login" }).click();
};

const createBlog = async (page, title, author, url) => {
  await page.getByRole("button", { name: "create new blog" }).click();
  await page.getByLabel("title").fill(title);
  await page.getByLabel("author").fill(author);
  await page.getByLabel("url").fill(url);
  await page.getByRole("button", { name: "create" }).click();
};

const likeBlog = async (blog, likeNumber) => {
  await blog.getByRole("button", { name: "View" }).click();
  for (let i = 0; i < likeNumber; i++) {
    await blog.getByRole("button", { name: "like" }).click();
    // Wait for the like count to update before clicking again
    await blog.getByText(`likes ${i + 1}`).waitFor();
  }
};

export { loginWith, createBlog, likeBlog };
