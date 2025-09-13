import { useState } from "react";

export default function BlogForm({
  createBlog,
  blogs,
  handleBlogsChange,
  handleErrorChange,
}) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = async (event) => {
    event.preventDefault();
    try {
      const newBlog = {
        title,
        author,
        url,
      };

      const result = await createBlog(newBlog);
      handleBlogsChange(blogs.concat(result));
      window.alert("Success! A new blog added.");
    } catch (error) {
      handleErrorChange(error.response.data.error);
    } finally {
      setAuthor("");
      setTitle("");
      setUrl("");
    }
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
