import axios from "axios";

const api = axios.create({
  baseURL: "https://zingercat-backend.onrender.com/api"
});

// attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* POSTS */
export const getPosts = async () => {
  const res = await api.get("/posts");
  return res.data;
};

export const createPost = async (content) => {
  const res = await api.post("/posts", { content });
  return res.data;
};

export default api;
