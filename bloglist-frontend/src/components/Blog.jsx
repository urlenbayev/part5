const Blog = ({ blog, handleLike, handleDelete, user }) => {
  return (
    <div>
      {blog.url}
      <br />
      likes {blog.likes}{" "}
      <button
        onClick={() => {
          handleLike(blog);
        }}
      >
        like
      </button>
      <br />
      {blog.author}
      <br />
      {user.username === blog.user.username ? (
        <button
          onClick={() => {
            handleDelete(blog.id);
          }}
        >
          delete
        </button>
      ) : null}
    </div>
  );
};

export default Blog;
