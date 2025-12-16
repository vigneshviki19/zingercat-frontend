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
    setPosts(data || []);
  }

  async function handlePost() {
    if (!content.trim()) return;

    await createPost(content);
    setContent("");
    loadPosts();
  }

  return (
    <div style={{ maxWidth: 600, margin: "20px auto" }}>
      <textarea
        placeholder="Speak your mind..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{ width: "100%", height: 80, marginBottom: 10 }}
      />

      <button onClick={handlePost}>Post 🐱</button>

      <hr />

      {posts.length === 0 && <p>No posts yet.</p>}

      {posts.map((post) => (
        <div key={post._id} style={{ marginBottom: 12 }}>
          <strong>{post.author}</strong>
          <p>{post.content}</p>
          <small>{new Date(post.createdAt).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
}
