import { useState, useEffect } from "react";
import axios from "axios";

const API = "https://zingercat-backend.onrender.com";

export default function PostCard({ post }) {
  const me = localStorage.getItem("username");

  // FIX 2: Read liked state from localStorage on mount
  const getLikedFromStorage = () => {
    try {
      const liked = JSON.parse(localStorage.getItem("likedPosts") || "[]");
      return liked.includes(post._id);
    } catch {
      return false;
    }
  };

  const [liked, setLiked] = useState(getLikedFromStorage);
  const [likeCount, setLikeCount] = useState(post.likes?.length ?? 0);
  const [loading, setLoading] = useState(false);

  // FIX 2: Sync liked state from localStorage when post changes
  useEffect(() => {
    setLiked(getLikedFromStorage());
    setLikeCount(post.likes?.length ?? 0);
  }, [post._id]);

  async function handleLike() {
    if (loading) return; // prevent rapid double clicks

    const wasLiked = liked;
    const prevCount = likeCount;

    // FIX 1: Optimistic UI — update instantly before server responds
    const newLiked = !wasLiked;
    setLiked(newLiked);
    setLikeCount((c) => (newLiked ? c + 1 : c - 1));

    // FIX 2: Persist to localStorage immediately
    try {
      const likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "[]");
      const updated = newLiked
        ? [...new Set([...likedPosts, post._id])]
        : likedPosts.filter((id) => id !== post._id);
      localStorage.setItem("likedPosts", JSON.stringify(updated));
    } catch {}

    // FIX 3: Only call server to save — do NOT update state from response
    try {
      setLoading(true);
      await axios.put(
        `${API}/posts/${post._id}/like`,
        { username: me },
        { withCredentials: true }
      );
      // ✅ Do NOT call setLiked or setLikeCount here — that caused the -2 bug
    } catch (err) {
      // Rollback on failure
      console.error("Like failed, rolling back", err);
      setLiked(wasLiked);
      setLikeCount(prevCount);

      // Also rollback localStorage
      try {
        const likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "[]");
        const rolled = wasLiked
          ? [...new Set([...likedPosts, post._id])]
          : likedPosts.filter((id) => id !== post._id);
        localStorage.setItem("likedPosts", JSON.stringify(rolled));
      } catch {}
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        background: "#fff",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 10 }}>
        <strong>@{post.author}</strong>
        <div style={{ fontSize: 12, color: "#777" }}>
          {new Date(post.createdAt).toLocaleString()}
        </div>
      </div>

      {/* Content */}
      <p style={{ marginBottom: 10 }}>{post.content}</p>

      {/* Actions */}
      <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
        <button
          onClick={handleLike}
          disabled={loading}
          style={{
            background: "none",
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
            fontSize: 15,
            color: liked ? "#e0245e" : "#555",
            display: "flex",
            alignItems: "center",
            gap: 5,
            padding: 0,
            transition: "transform 0.1s",
            transform: loading ? "scale(0.95)" : "scale(1)",
          }}
        >
          {liked ? "❤️" : "🤍"} {likeCount}
        </button>
        <span style={{ cursor: "pointer" }}>💬 Comment</span>
        <span style={{ cursor: "pointer" }}>🔁 Share</span>
      </div>
    </div>
  );
}
