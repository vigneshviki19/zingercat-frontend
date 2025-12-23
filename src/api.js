import axios from "axios";

const api = axios.create({
  baseURL: "https://zingercat-backend.onrender.com/api"
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

/* SEARCH USERS */
export async function searchUsers(query) {
  const res = await api.get(`/profile/search?q=${query}`);
  return res.data;
}

/* GET PROFILE */
export async function getProfile(username) {
  const res = await api.get(`/profile/${username}`);
  return res.data;
}
