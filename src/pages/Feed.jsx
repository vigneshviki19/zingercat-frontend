import { useEffect, useState } from "react";
import { getPosts, createPost } from "../api";
import { useNavigate } from "react-router-dom";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  useEffect(() => { loadPosts(); }, []);

  async function loadPosts() {
    const data = await getPosts();
    setPosts(data || []);
  }

  async function handlePost() {
    if (!content.trim()) return;
    try {
      setLoading(true);
      await createPost(content);
      setContent("");
      loadPosts();
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,600;1,9..144,300&family=DM+Sans:wght@400;500&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        .zfd-root { min-height: 100vh; background: #FDF8F2; font-family: 'DM Sans', sans-serif; }
        .zfd-blob { position: fixed; border-radius: 50%; filter: blur(90px); opacity: 0.28; pointer-events: none; z-index: 0; }
        .zfd-blob-1 { width: 500px; height: 500px; background: #FFD6A5; top: -100px; left: -150px; }
        .zfd-blob-2 { width: 350px; height: 350px; background: #FFAAA5; bottom: -80px; right: -80px; }
        .zfd-blob-3 { width: 220px; height: 220px; background: #A8DADC; top: 35%; left: 55%; opacity: 0.18; }
        .zfd-nav { position: sticky; top: 0; z-index: 100; background: rgba(253,248,242,0.85); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); border-bottom: 1px solid rgba(255,200,140,0.35); padding: 0 24px; display: flex; align-items: center; justify-content: space-between; height: 58px; }
        .zfd-nav-brand { font-family: 'Fraunces', Georgia, serif; font-size: 20px; font-weight: 600; color: #2C1A0E; display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
        .zfd-nav-links { display: flex; align-items: center; gap: 4px; }
        .zfd-nav-item { display: flex; align-items: center; gap: 5px; padding: 7px 12px; border-radius: 10px; font-size: 13px; font-weight: 500; color: #9B5B1A; cursor: pointer; transition: background 0.15s; white-space: nowrap; }
        .zfd-nav-item:hover { background: #FFF0DE; }
        .zfd-main { position: relative; z-index: 1; max-width: 620px; margin: 28px auto; padding: 0 16px 60px; animation: fadeUp 0.45s cubic-bezier(.22,1,.36,1) both; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .zfd-create { background: rgba(255,255,255,0.78); backdrop-filter: blur(14px); border: 1px solid rgba(255,200,140,0.4); border-radius: 20px; padding: 18px 20px; margin-bottom: 24px; box-shadow: 0 4px 24px rgba(200,120,60,0.08); }
        .zfd-create-header { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
        .zfd-create-avatar { width: 38px; height: 38px; border-radius: 50%; background: linear-gradient(135deg, #FFD6A5, #FFA86C); display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }
        .zfd-create-name { font-size: 13px; font-weight: 500; color: #9B5B1A; }
        .zfd-textarea { width: 100%; background: #FFFAF4; border: 1.5px solid #FFD6A5; border-radius: 12px; padding: 12px 14px; font-family: 'DM Sans', sans-serif; font-size: 14px; color: #2C1A0E; resize: none; height: 88px; outline: none; transition: border-color 0.18s, box-shadow 0.18s; line-height: 1.5; }
        .zfd-textarea::placeholder { color: #C4A08A; }
        .zfd-textarea:focus { border-color: #F4854A; background: #fff; box-shadow: 0 0 0 4px rgba(244,133,74,0.10); }
        .zfd-footer { display: flex; justify-content: flex-end; margin-top: 10px; }
        .zfd-post-btn { padding: 8px 22px; background: linear-gradient(135deg, #F4854A, #E86A2A); color: #fff; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500; border: none; border-radius: 10px; cursor: pointer; box-shadow: 0 3px 12px rgba(244,133,74,0.3); transition: transform 0.15s, box-shadow 0.15s; }
        .zfd-post-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 18px rgba(244,133,74,0.4); }
        .zfd-post-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .zfd-divider { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; }
        .zfd-divider-line { flex: 1; height: 1px; background: #FFD6A5; opacity: 0.6; }
        .zfd-divider-text { font-size: 11px; color: #C4A08A; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 500; }
        .zfd-post-card { background: rgba(255,255,255,0.78); backdrop-filter: blur(12px); border: 1px solid rgba(255,200,140,0.35); border-radius: 20px; padding: 16px 18px; margin-bottom: 12px; box-shadow: 0 4px 24px rgba(200,120,60,0.06); animation: fadeUp 0.3s cubic-bezier(.22,1,.36,1) both; }
        .zfd-post-author { font-size: 13px; font-weight: 500; color: #9B5B1A; margin-bottom: 6px; }
        .zfd-post-content { font-size: 14px; color: #2C1A0E; line-height: 1.6; }
        .zfd-post-time { font-size: 11px; color: #C4A08A; margin-top: 8px; font-style: italic; font-family: 'Fraunces', Georgia, serif; font-weight: 300; }
        .zfd-empty { text-align: center; padding: 48px 20px; }
        .zfd-empty-icon { font-size: 40px; margin-bottom: 12px; }
        .zfd-empty-text { font-family: 'Fraunces', Georgia, serif; font-style: italic; font-size: 15px; color: #B97B4A; }
      `}</style>

      <div className="zfd-root">
        <div className="zfd-blob zfd-blob-1" />
        <div className="zfd-blob zfd-blob-2" />
        <div className="zfd-blob zfd-blob-3" />

        <nav className="zfd-nav">
          <div className="zfd-nav-brand">🐱 Zinger Cat</div>
          <div className="zfd-nav-links">
            <span className="zfd-nav-item" onClick={() => navigate(`/profile/${username}`)}>👤 Profile</span>
            <span className="zfd-nav-item" onClick={() => navigate("/search")}>🔍 Search</span>
            <span className="zfd-nav-item" onClick={() => navigate("/friends")}>👥 Community</span>
            <span className="zfd-nav-item" onClick={() => navigate("/chat")}>💬 Messages</span>
            <span className="zfd-nav-item" onClick={() => navigate("/notifications")}>🔔 Alerts</span>
            <span className="zfd-nav-item" onClick={() => navigate("/home")}>🏠 Home</span>
          </div>
        </nav>

        <div className="zfd-main">
          <div className="zfd-create">
            <div className="zfd-create-header">
              <div className="zfd-create-avatar">🐱</div>
              <div className="zfd-create-name">@{username}</div>
            </div>
            <textarea className="zfd-textarea" placeholder="Speak your mind, meow... 🐾" value={content} onChange={(e) => setContent(e.target.value)} />
            <div className="zfd-footer">
              <button className="zfd-post-btn" onClick={handlePost} disabled={loading}>{loading ? "Posting..." : "🐾 Post"}</button>
            </div>
          </div>

          <div className="zfd-divider">
            <div className="zfd-divider-line" />
            <span className="zfd-divider-text">Latest posts</span>
            <div className="zfd-divider-line" />
          </div>

          {posts.length === 0 && (
            <div className="zfd-empty">
              <div className="zfd-empty-icon">🐾</div>
              <p className="zfd-empty-text">"No posts yet. Be the first cat to speak!"</p>
            </div>
          )}

          {posts.map((post) => (
            <div key={post._id} className="zfd-post-card">
              <div className="zfd-post-author">@{post.author}</div>
              <div className="zfd-post-content">{post.content}</div>
              <div className="zfd-post-time">{new Date(post.createdAt).toLocaleString()}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
