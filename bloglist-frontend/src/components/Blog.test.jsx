import { render, screen } from "@testing-library/react";
import Blog from "./Blog.jsx";
import { expect } from "vitest";

// eslint-disable-next-line no-undef
test("render author and title, but not url and likes", () => {
  const blog = {
    id: "1",
    title: "Test Title",
    author: "Test Author",
    url: "http://example.com",
    likes: 5,
    user: { username: "testuser", name: "bruh", token: "wqeww121" },
  };
  render(
    <Blog
      blog={blog}
      handleDelete={() => {}}
      handleLike={() => {}}
      user={blog.user}
    />
  );
  const title = screen.getByText("Test Title");
  const author = screen.getByText("Test Author");
  const url = screen.getByText("Link: http://example.com");
  const likes = screen.getByText("likes 5");

  expect(title).toBeDefined();
  expect(author).toBeDefined();
  expect(url).not.toBeVisible();
  expect(likes).not.toBeVisible();
});
