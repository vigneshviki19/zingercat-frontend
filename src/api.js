import axios from "axios";

const API_BASE = "https://zingercat-backend.onrender.com/api";

const api = axios.create({
  baseURL: API_BASE
});

// 🔑 Automatically attach token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* ---------- POSTS ---------- */
export const getPosts = async () => {
  const res = await api.get("/posts");
  return res.data;
};

export const createPost = async (content) => {
  const res = await api.post("/posts", { content });
  return res.data;
};

/* ---------- PROFILE ---------- */
export const getProfile = async (username) => {
  const res = await api.get(`/profile/${username}`);
  return res.data;
};

/* ---------- SEARCH USERS ---------- */
export const searchUsers = async (query) => {
  const res = await api.get(`/profile?q=${query}`);
  return res.data;
};

/* ---------- FRIENDS ---------- */
export const sendFriendRequest = async (username) => {
  const res = await api.post(`/friends/request/${username}`);
  return res.data;
};

export const getFriends = async () => {
  const res = await api.get("/friends");
  return res.data;
};

export default api;
