import axios from "axios";

/* =========================
   AXIOS INSTANCE
========================= */
const api = axios.create({
  baseURL: "https://zingercat-backend.onrender.com/api"
});

/* =========================
   AUTO ATTACH JWT TOKEN
========================= */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* =========================
   AUTH
========================= */
export const registerUser = async (data) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

export const loginUser = async (data) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

/* =========================
   POSTS
========================= */

// Get all posts (home feed)
export const getPosts = async () => {
  const res = await api.get("/posts");
  return res.data;
};

// Create post (text + image)
export const createPost = async (formData) => {
  const res = await api.post("/posts", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
  return res.data;
};

// Like post
export const likePost = async (postId) => {
  const res = await api.post(`/posts/${postId}/like`);
  return res.data;
};

/* =========================
   PROFILE
========================= */

// Get profile by username
export const getProfile = async (username) => {
  const res = await api.get(`/profile/${username}`);
  return res.data;
};

// Update own profile
export const updateProfile = async (data) => {
  const res = await api.put("/profile", data);
  return res.data;
};

// Search users
export const searchUsers = async (query) => {
  const res = await api.get(`/profile?q=${query}`);
  return res.data;
};

/* =========================
   FRIENDS
========================= */

// Send friend request
export const sendFriendRequest = async (username) => {
  const res = await api.post(`/friends/request/${username}`);
  return res.data;
};

// Get friends list
export const getFriends = async () => {
  const res = await api.get("/friends");
  return res.data;
};

// Get friend requests
export const getFriendRequests = async () => {
  const res = await api.get("/friends/requests");
  return res.data;
};

// Accept friend request
export const acceptFriend = async (username) => {
  const res = await api.post(`/friends/accept/${username}`);
  return res.data;
};

/* =========================
   EXPORT AXIOS INSTANCE
========================= */
export default api;
