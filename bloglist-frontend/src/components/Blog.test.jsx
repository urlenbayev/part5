import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog.jsx";
import { expect, test, vi } from "vitest";

const blog = {
  id: "1",
  title: "Test Title",
  author: "Test Author",
  url: "http://example.com",
  likes: 5,
  user: { username: "testuser", name: "bruh", token: "wqeww121" },
};

// eslint-disable-next-line no-undef
test("render author and title, but not url and likes", () => {
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

test("url and likes are visible when toggle button pressed", async () => {
  render(
    <Blog
      blog={blog}
      handleDelete={() => {}}
      handleLike={() => {}}
      user={blog.user}
    />
  );
  const viewButton = screen.getByText("View");
  await userEvent.click(viewButton);
  const url = screen.getByText("Link: http://example.com");
  const likes = screen.getByText("likes 5");

  screen.debug(url);
  screen.debug(likes);

  expect(url).toBeVisible();
  expect(likes).toBeVisible();
});

test.only("event handler for like called twice when like pressed twice", async () => {
  const mockHandler = vi.fn();
  render(
    <Blog
      blog={blog}
      handleDelete={() => {}}
      handleLike={mockHandler}
      user={blog.user}
    />
  );

  const viewButton = screen.getByText("View");
  await userEvent.click(viewButton);
  const likeButton = screen.getByText("like");
  await userEvent.click(likeButton);
  await userEvent.click(likeButton);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
