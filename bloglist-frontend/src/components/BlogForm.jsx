import { useState } from "react";

export default function BlogForm({ createBlog }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({ title, author, url });

    setAuthor("");
    setTitle("");
    setUrl("");
  };

  return (
    <div>
      <form onSubmit={addBlog}>
        <div>
          <label>
            title:
            <input
              id="title"
              type="text"
              value={title}
              onChange={({ target }) => {
                setTitle(target.value);
              }}
            />
          </label>
        </div>
        <div>
          <label>
            author:
            <input
              id="author"
              type="text"
              value={author}
              onChange={({ target }) => {
                setAuthor(target.value);
              }}
            />
          </label>
        </div>
        <div>
          <label>
            url:
            <input
              id="url"
              type="text"
              value={url}
              onChange={({ target }) => {
                setUrl(target.value);
              }}
            />
          </label>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
}
