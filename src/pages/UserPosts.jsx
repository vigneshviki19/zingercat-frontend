import { useEffect, useState } from "react";
import { getPosts } from "../api";
import { useParams, useNavigate } from "react-router-dom";

export default function UserPosts() {
  const { username } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const me = localStorage.getItem("username");

  useEffect(() => { load(); }, []);

  async function load() {
    try {
      setLoading(true);
      const all = await getPosts();
      setPosts((all || []).filter((p) => p.author === username));
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,600;1,9..144,300&family=DM+Sans:wght@400;500&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        .zup-root { min-height: 100vh; background: #FDF8F2; font-family: 'DM Sans', sans-serif; }
        .zup-blob { position: fixed; border-radius: 50%; filter: blur(90px); opacity: 0.28; pointer-events: none; z-index: 0; }
        .zup-blob-1 { width: 500px; height: 500px; background: #FFD6A5; top: -100px; left: -150px; }
        .zup-blob-2 { width: 350px; height: 350px; background: #FFAAA5; bottom: -80px; right: -80px; }
        .zup-blob-3 { width: 220px; height: 220px; background: #A8DADC; top: 35%; left: 55%; opacity: 0.18; }
        .zup-nav { position: sticky; top: 0; z-index: 100; background: rgba(253,248,242,0.85); backdrop-filter: blur(14px); border-bottom: 1px solid rgba(255,200,140,0.35); padding: 0 24px; display: flex; align-items: center; justify-content: space-between; height: 58px; }
        .zup-nav-brand { font-family: 'Fraunces', Georgia, serif; font-size: 20px; font-weight: 600; color: #2C1A0E; display: flex; align-items: center; gap: 8px; }
        .zup-nav-links { display: flex; align-items: center; gap: 4px; }
        .zup-nav-item { display: flex; align-items: center; gap: 5px; padding: 7px 12px; border-radius: 10px; font-size: 13px; font-weight: 500; color: #9B5B1A; cursor: pointer; transition: background 0.15s; white-space: nowrap; }
        .zup-nav-item:hover { background: #FFF0DE; }
        .zup-main { position: relative; z-index: 1; max-width: 620px; margin: 28px auto; padding: 0 16px 60px; animation: fadeUp 0.45s cubic-bezier(.22,1,.36,1) both; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .zup-header-card { background: rgba(255,255,255,0.78); backdrop-filter: blur(14px); border: 1px solid rgba(255,200,140,0.4); border-radius: 20px; padding: 18px 20px; margin-bottom: 20px; box-shadow: 0 4px 24px rgba(200,120,60,0.08); display: flex; align-items: center; gap: 12px; }
        .zup-header-icon { width: 44px; height: 44px; border-radius: 50%; background: linear-gradient(135deg, #FFD6A5, #FFA86C); display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0; }
        .zup-header-title { font-family: 'Fraunces', Georgia, serif; font-size: 20px; font-weight: 600; color: #2C1A0E; }
        .zup-header-sub { font-size: 12px; color: #C4A08A; font-style: italic; font-family: 'Fraunces', Georgia, serif; font-weight: 300; }
        .zup-divider { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; }
        .zup-divider-line { flex: 1; height: 1px; background: #FFD6A5; opacity: 0.6; }
        .zup-divider-text { font-size: 11px; color: #C4A08A; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 500; }
        .zup-post-card { background: rgba(255,255,255,0.78); backdrop-filter: blur(12px); border: 1px solid rgba(255,200,140,0.35); border-radius: 20px; padding: 16px 18px; margin-bottom: 12px; box-shadow: 0 4px 24px rgba(200,120,60,0.06); animation: fadeUp 0.3s cubic-bezier(.22,1,.36,1) both; }
        .zup-post-content { font-size: 14px; color: #2C1A0E; line-height: 1.6; }
        .zup-post-img { width: 100%; border-radius: 12px; margin-top: 12px; object-fit: cover; max-height: 340px; }
        .zup-empty { text-align: center; padding: 48px 20px; }
        .zup-empty-icon { font-size: 40px; margin-bottom: 12px; }
        .zup-empty-text { font-family: 'Fraunces', Georgia, serif; font-style: italic; font-size: 15px; color: #B97B4A; }
        .zup-spin { width: 20px; height: 20px; border: 2.5px solid #FFD6A5; border-top-color: #F4854A; border-radius: 50%; animation: spin 0.7s linear infinite; margin: 40px auto; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <div className="zup-root">
        <div className="zup-blob zup-blob-1" />
        <div className="zup-blob zup-blob-2" />
        <div className="zup-blob zup-blob-3" />

        <nav className="zup-nav">
          <div className="zup-nav-brand">🐱 Zinger Cat</div>
          <div className="zup-nav-links">
            <span className="zup-nav-item" onClick={() => navigate(`/profile/${me}`)}>👤 Profile</span>
            <span className="zup-nav-item" onClick={() => navigate("/search")}>🔍 Search</span>
            <span className="zup-nav-item" onClick={() => navigate("/friends")}>👥 Community</span>
            <span className="zup-nav-item" onClick={() => navigate("/chat")}>💬 Messages</span>
            <span className="zup-nav-item" onClick={() => navigate("/notifications")}>🔔 Alerts</span>
            <span className="zup-nav-item" onClick={() => navigate("/home")}>🏠 Home</span>
          </div>
        </nav>

        <div className="zup-main">
          <div className="zup-header-card">
            <div className="zup-header-icon">📝</div>
            <div>
              <div className="zup-header-title">@{username}'s Posts</div>
              <div className="zup-header-sub">"All meows from this cat"</div>
            </div>
          </div>

          {loading ? <div className="zup-spin" /> : posts.length === 0 ? (
            <div className="zup-empty">
              <div className="zup-empty-icon">🐾</div>
              <p className="zup-empty-text">"No posts yet from this cat"</p>
            </div>
          ) : (
            <>
              <div className="zup-divider">
                <div className="zup-divider-line" />
                <span className="zup-divider-text">{posts.length} post{posts.length !== 1 ? "s" : ""}</span>
                <div className="zup-divider-line" />
              </div>
              {posts.map((p) => (
                <div key={p._id} className="zup-post-card">
                  <div className="zup-post-content">{p.content}</div>
                  {p.image && <img src={p.image} className="zup-post-img" alt="post" />}
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}
