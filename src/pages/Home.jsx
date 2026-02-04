import { useEffect, useState } from "react";
import { getPosts, createPost, likePost } from "../api";
import { useNavigate } from "react-router-dom";
import Comments from "../components/Comments";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openComments, setOpenComments] = useState(null);

  const navigate = useNavigate();

  const username = localStorage.getItem("username");
  const dept = localStorage.getItem("dept") || "CSE";
  const college = localStorage.getItem("college") || "PSG Tech";

  /* =========================
     LOAD POSTS
  ========================= */
  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    try {
      const data = await getPosts();
      setPosts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("LOAD POSTS ERROR:", err);
    }
  }

  /* =========================
     CREATE POST
  ========================= */
  async function handlePost() {
    if (!content.trim() && !image) return;

    const formData = new FormData();
    formData.append("content", content);
    if (image) formData.append("image", image);

    try {
      setLoading(true);
      await createPost(formData);
      setContent("");
      setImage(null);
      loadPosts();
    } catch {
      alert("Post failed");
    } finally {
      setLoading(false);
    }
  }

  /* =========================
     LIKE POST
  ========================= */
  async function handleLike(postId) {
    try {
      await likePost(postId);
      loadPosts();
    } catch (err) {
      console.error("LIKE ERROR:", err);
    }
  }

  /* =========================
     LOGOUT
  ========================= */
  function handleLogout() {
    localStorage.clear();
    navigate("/");
  }

  return (
    <div style={{ background: "#f5f5f5", minHeight: "100vh" }}>
      {/* ================= TOP NAV BAR ================= */}
      <div
        style={{
          position: "sticky",
          top: 0,
          background: "#ffffff",
          borderBottom: "1px solid #ddd",
          padding: "10px 20px",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          zIndex: 100
        }}
      >
        <span style={navItem} onClick={() => navigate(`/profile/${username}`)}>
          👤 Profile
        </span>

        <span style={navItem} onClick={() => navigate("/search")}>
          🔍 Search
        </span>

        <span style={navItem} onClick={() => navigate("/friends")}>
          👥 Community
        </span>

        <span style={navItem} onClick={() => navigate("/chat")}>
          💬 Messages
        </span>

        <span style={navItem} onClick={() => navigate("/notifications")}>
          🔔 Notifications
        </span>

        <span
          style={{ ...navItem, color: "red" }}
          onClick={handleLogout}
        >
          🚪 Logout
        </span>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
        {/* ================= CREATE POST ================= */}
        <div
          style={{
            background: "#fff",
            padding: 12,
            borderRadius: 8,
            marginBottom: 20,
            border: "1px solid #ddd"
          }}
        >
          <textarea
            placeholder="Speak your mind..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{
              width: "100%",
              height: 80,
              resize: "none",
              padding: 8
            }}
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            style={{ marginTop: 8 }}
          />

          <button
            onClick={handlePost}
            disabled={loading}
            style={{ marginTop: 8, padding: "6px 14px", cursor: "pointer" }}
          >
            {loading ? "Posting..." : "Post"}
          </button>
        </div>

        {/* ================= FEED ================= */}
        {posts.length === 0 && <p>No posts yet.</p>}

        {posts.map((post) => (
          <div
            key={post._id}
            style={{
              background: "#fff",
              padding: 12,
              borderRadius: 8,
              marginBottom: 16,
              border: "1px solid #ddd"
            }}
          >
            <div style={{ fontWeight: "bold" }}>@{post.author}</div>
            <div style={{ fontSize: 12, color: "#555" }}>
              {dept} · {college}
            </div>

            {post.content && <p style={{ marginTop: 8 }}>{post.content}</p>}

            {post.image && (
              <img
                src={post.image}
                alt="post"
                style={{ width: "100%", borderRadius: 8, marginTop: 8 }}
              />
            )}

            <div
              style={{
                display: "flex",
                gap: 20,
                marginTop: 10,
                fontSize: 14,
                cursor: "pointer"
              }}
            >
              <span onClick={() => handleLike(post._id)}>
                ❤️ {Array.isArray(post.likes) ? post.likes.length : 0}
              </span>

              <span
                onClick={() =>
                  setOpenComments(
                    openComments === post._id ? null : post._id
                  )
                }
              >
                💬 Comment
              </span>

              <span onClick={() => navigate(`/chat/${post.author}`)}>
                🔗 Share
              </span>
            </div>

            {openComments === post._id && (
              <div style={{ marginTop: 12 }}>
                <Comments postId={post._id} />
              </div>
            )}

            <div style={{ fontSize: 11, color: "#888", marginTop: 6 }}>
              {new Date(post.createdAt).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const navItem = {
  cursor: "pointer",
  fontWeight: "bold"
};
