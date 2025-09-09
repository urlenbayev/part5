import api from "./api";

const blogService = () => {
  const getAll = async () => {
    const res = await api.get("/blogs");
    return res.data;
  };

  return { getAll };
};

export default blogService;
