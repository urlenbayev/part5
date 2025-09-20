import BlogForm from "./BlogForm";
import { render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import userEvent from "@testing-library/user-event";

test.only("correct details of the blog", async () => {
  const mockHandler = vi.fn();
  render(<BlogForm createBlog={mockHandler} />);
  const title = screen.getByPlaceholderText("Type title here");
  const author = screen.getByPlaceholderText("Type author here");
  const url = screen.getByPlaceholderText("Type url here");
  const createButton = screen.getByText("create");

  await userEvent.type(title, "Some TITLE");
  await userEvent.type(author, "Some Author");
  await userEvent.type(url, "Some url");

  await userEvent.click(createButton);

  expect(mockHandler.mock.calls).toHaveLength(1);
  expect(mockHandler.mock.calls[0][0].title).toBe("Some TITLE");
  expect(mockHandler.mock.calls[0][0].author).toBe("Some Author");
  expect(mockHandler.mock.calls[0][0].url).toBe("Some url");
});
