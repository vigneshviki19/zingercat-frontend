import { useEffect, useState } from "react";
import { getPosts, createPost } from "../api";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    const data = await getPosts();
    setPosts(data);
  }

  async function handlePost() {
    if (!content.trim()) return;

    await createPost(content);
    setContent("");
    loadPosts();
  }

  return (
    <div style={{ maxWidth: 600, margin: "auto" }}>
      <h2>Hello, Cat 🐾</h2>

      <textarea
  onChange={(e) => alert(e.target.value)}
  style={{ width: "100%", height: 80 }}
/>


      <button onClick={handlePost}>Post 🐱</button>

      <hr />

      {posts.length === 0 && <p>No posts yet.</p>}

      {posts.map((post) => (
        <div key={post._id} style={{ padding: 10, borderBottom: "1px solid #ddd" }}>
          <strong>{post.author}</strong>
          <p>{post.content}</p>
          <small>{new Date(post.createdAt).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
}
