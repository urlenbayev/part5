const Blog = ({ blog, handleLike }) => {
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
    </div>
  );
};

export default Blog;
