import { useEffect, useState } from "react";
import { getPosts, createPost } from "../api";
import PostCard from "../components/PostCard";

export default function Home() {
  const username = localStorage.getItem("username");

  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    setLoading(true);
    const data = await getPosts();
    setPosts(data);
    setLoading(false);
  }

  async function handleCreatePost() {
    if (!content.trim()) return;

    await createPost(content);
    setContent("");
    loadPosts();
  }

  function logout() {
    localStorage.clear();
    window.location.href = "/login";
  }

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      {/* Header */}
      <h2>🐱 Zinger Cat</h2>
      <p>Welcome, <b>{username}</b></p>

      <button onClick={() => window.location.href = `/profile/${username}`}>
        👤 My Profile
      </button>
      <button onClick={logout} style={{ marginLeft: 10 }}>
        🚪 Logout
      </button>

      {/* CREATE POST */}
      <div
        style={{
          border: "1px solid #ddd",
          padding: 15,
          borderRadius: 10,
          marginTop: 20,
          marginBottom: 20
        }}
      >
        <textarea
          placeholder="What's on your mind? 🐱"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{ width: "100%", height: 80 }}
        />
        <button onClick={handleCreatePost} style={{ marginTop: 10 }}>
          🚀 Post
        </button>
      </div>

      {/* POSTS */}
      {loading && <p>Loading posts...</p>}

      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
} 
