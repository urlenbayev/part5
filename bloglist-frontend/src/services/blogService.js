import api from "./api";

let token = null;

const blogService = () => {
  const setToken = (newToken) => {
    token = `Bearer ${newToken}`;
  };

  const getAll = async () => {
    const res = await api.get(
      "/blogs" /* {
      headers: { Authorization: token },
    } */
    );
    return res.data;
  };

  return { getAll, setToken };
};

export default blogService;
