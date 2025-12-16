import axios from "axios";

const api = axios.create({
  baseURL: "https://zingercat-backend.onrender.com/api",
});

export function getPosts() {
  return api.get("/posts").then(res => res.data);
}

export function createPost(content) {
  const token = localStorage.getItem("token");
  return api.post(
    "/posts",
    { content },
    { headers: { Authorization: `Bearer ${token}` } }
  ).then(res => res.data);
}

export default api;
