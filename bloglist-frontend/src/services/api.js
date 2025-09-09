import axios from "axios";

// This "api" is imported in every other service

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

export default api;
