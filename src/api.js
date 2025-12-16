const API_BASE = "https://zingercat-backend.onrender.com/api";

export async function getPosts() {
  const res = await fetch(`${API_BASE}/posts`);
  return res.json();
}

export async function createPost(content) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_BASE}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ content })
  });

  return res.json();
}
