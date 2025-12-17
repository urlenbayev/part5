import Togglable from "./Togglable";
import "./Blog.css";

const Blog = ({ blog, handleLike, handleDelete, user }) => {
  return (
    <div className="blog">
      <h3> {blog.title}</h3>
      <p>{blog.author}</p>
      <Togglable buttonLabel="View">
        <p>likes {blog.likes}</p>
        <button
          onClick={() => {
            handleLike(blog);
          }}
        >
          like
        </button>
        <p>Link: {blog.url}</p>
        {user && user.username === blog.user.username ? (
          <button
            onClick={() => {
              handleDelete(blog.id);
            }}
          >
            delete
          </button>
        ) : null}
      </Togglable>
    </div>
  );
};

export default Blog;
