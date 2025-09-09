import api from "./api";

const userService = () => {
  const login = async (credentials) => {
    const res = await api.post("/login", credentials);
    return res.data;
  };
  /*   const getUserInfo = () => {
    const res = await api.get("")
  } */

  return { login };
};

export default userService;
