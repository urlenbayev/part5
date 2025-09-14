const Blog = ({ blog }) => {
  return (
    <div>
      {blog.url}
      <br />
      likes {blog.likes} <button>like</button>
      <br />
      {blog.author}
    </div>
  );
};

export default Blog;
