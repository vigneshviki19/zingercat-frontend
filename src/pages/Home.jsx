import { useEffect, useState } from "react";
import { getPosts, createPost } from "../api";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const username = localStorage.getItem("username");
  const dept = localStorage.getItem("dept") || "CSE";
  const college = "PSG Tech";

  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    const data = await getPosts();
    setPosts(data);
  }

  async function handlePost() {
    if (!content && !image) return;

    const formData = new FormData();
    formData.append("content", content);
    if (image) formData.append("image", image);

    await createPost(formData);
    setContent("");
    setImage(null);
    loadPosts();
  }

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h2>🐱 Zinger Cat Feed</h2>

      {/* CREATE POST */}
      <textarea
        placeholder="Speak your mind..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{ width: "100%", height: 80 }}
      />

      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        style={{ marginTop: 8 }}
      />

      <button onClick={handlePost} style={{ marginTop: 8 }}>
        Post
      </button>

      <hr />

      {/* FEED */}
      {posts.map((post) => (
        <div
          key={post._id}
          style={{
            borderBottom: "1px solid #ddd",
            paddingBottom: 15,
            marginBottom: 15
          }}
        >
          {/* USER INFO */}
          <div style={{ fontWeight: "bold" }}>
            @{post.author}
          </div>
          <div style={{ fontSize: 12, color: "#555" }}>
            {dept} · {college}
          </div>

          {/* CONTENT */}
          <p style={{ marginTop: 8 }}>{post.content}</p>

          {/* IMAGE */}
          {post.image && (
            <img
              src={`https://zingercat-backend.onrender.com/uploads/${post.image}`}
              alt=""
              style={{ width: "100%", borderRadius: 6 }}
            />
          )}

          {/* ACTIONS */}
          <div
            style={{
              display: "flex",
              gap: 20,
              marginTop: 10,
              fontSize: 14,
              cursor: "pointer"
            }}
          >
            <span>❤️ Like</span>
            <span>💬 Comment</span>
            <span onClick={() => navigate(`/chat/${post.author}`)}>
              🔗 Share
            </span>
          </div>

          <div style={{ fontSize: 11, color: "#888", marginTop: 6 }}>
            {new Date(post.createdAt).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
}
