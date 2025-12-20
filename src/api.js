import axios from "axios";

const api = axios.create({
  baseURL: "https://zingercat-backend.onrender.com/api",
});

export default api;

export async function getPosts() {
  const res = await api.get("/posts");
  return res.data;
}

export async function createPost(content) {
  const token = localStorage.getItem("token");

  const res = await api.post(
    "/posts",
    { content },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
}
