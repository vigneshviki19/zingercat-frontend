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

/* ---------- POSTS ---------- */

// GET POSTS
export const getPosts = async () => {
  const res = await api.get("/posts");
  return res.data;
};

// CREATE POST (TEXT + IMAGE)
export const createPost = async (formData) => {
  const res = await api.post("/posts", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

/* ---------- PROFILE ---------- */

export const getProfile = async (username) => {
  const res = await api.get(`/profile/${username}`);
  return res.data;
};

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

export const getFriendRequests = async () => {
  const res = await api.get("/friends/requests");
  return res.data;
};

export const acceptFriend = async (username) => {
  const res = await api.post(`/friends/accept/${username}`);
  return res.data;
};
/* POSTS */
export const getPosts = async () => {
  const res = await api.get("/posts");
  return res.data;
};

export const createPost = async (formData) => {
  const res = await api.post("/posts", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  return res.data;
};

export const likePost = async (id) => {
  const res = await api.post(`/posts/${id}/like`);
  return res.data;
};

export const commentPost = async (id, text) => {
  const res = await api.post(`/posts/${id}/comment`, { text });
  return res.data;
};

export const sharePost = async (id) => {
  const res = await api.post(`/posts/${id}/share`);
  return res.data;
};


export default api;
