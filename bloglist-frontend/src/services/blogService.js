import api from "./api";

let token = null;

const blogService = () => {
  const setToken = (newToken) => {
    token = `Bearer ${newToken}`;
  };

  const getAll = async () => {
    const res = await api.get("/blogs");
    return res.data;
  };

  const create = async (newObject) => {
    const res = await api.post("/blogs", newObject, {
      headers: { Authorization: token },
    });

    return res.data;
  };

  const putBlog = async (newBlog) => {
    const res = await api.put(`/blogs/${newBlog.id}`, newBlog);
    return res.data;
  };

  const deleteBlog = async (blog_id) => {
    const res = await api.delete(`/blogs/${blog_id}`);
    return res.data;
  };

  return { getAll, setToken, create, putBlog, deleteBlog };
};

export default blogService;
