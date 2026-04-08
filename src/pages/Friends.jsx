import { useEffect, useState } from "react";
import { getFriends } from "../api";
import { useNavigate } from "react-router-dom";

export default function Friends() {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const me = localStorage.getItem("username");

  useEffect(() => { loadFriends(); }, []);

  async function loadFriends() {
    try {
      setLoading(true);
      const data = await getFriends();
      setFriends(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,600;1,9..144,300&family=DM+Sans:wght@400;500&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        .zf-root { min-height: 100vh; background: #FDF8F2; font-family: 'DM Sans', sans-serif; }
        .zf-blob { position: fixed; border-radius: 50%; filter: blur(90px); opacity: 0.28; pointer-events: none; z-index: 0; }
        .zf-blob-1 { width: 500px; height: 500px; background: #FFD6A5; top: -100px; left: -150px; }
        .zf-blob-2 { width: 350px; height: 350px; background: #FFAAA5; bottom: -80px; right: -80px; }
        .zf-blob-3 { width: 220px; height: 220px; background: #A8DADC; top: 35%; left: 55%; opacity: 0.18; }
        .zf-nav { position: sticky; top: 0; z-index: 100; background: rgba(253,248,242,0.85); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); border-bottom: 1px solid rgba(255,200,140,0.35); padding: 0 24px; display: flex; align-items: center; justify-content: space-between; height: 58px; }
        .zf-nav-brand { font-family: 'Fraunces', Georgia, serif; font-size: 20px; font-weight: 600; color: #2C1A0E; display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
        .zf-nav-links { display: flex; align-items: center; gap: 4px; }
        .zf-nav-item { display: flex; align-items: center; gap: 5px; padding: 7px 12px; border-radius: 10px; font-size: 13px; font-weight: 500; color: #9B5B1A; cursor: pointer; transition: background 0.15s; white-space: nowrap; }
        .zf-nav-item:hover { background: #FFF0DE; }
        .zf-nav-item-active { background: #FFF0DE; color: #F4854A; font-weight: 600; }
        .zf-main { position: relative; z-index: 1; max-width: 620px; margin: 28px auto; padding: 0 16px 60px; animation: fadeUp 0.45s cubic-bezier(.22,1,.36,1) both; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .zf-header-card { background: rgba(255,255,255,0.78); backdrop-filter: blur(14px); border: 1px solid rgba(255,200,140,0.4); border-radius: 20px; padding: 18px 20px; margin-bottom: 20px; box-shadow: 0 4px 24px rgba(200,120,60,0.08); display: flex; align-items: center; gap: 12px; }
        .zf-header-icon { width: 44px; height: 44px; border-radius: 50%; background: linear-gradient(135deg, #FFD6A5, #FFA86C); display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0; }
        .zf-header-title { font-family: 'Fraunces', Georgia, serif; font-size: 20px; font-weight: 600; color: #2C1A0E; }
        .zf-header-sub { font-size: 12px; color: #C4A08A; font-style: italic; font-family: 'Fraunces', Georgia, serif; font-weight: 300; }
        .zf-divider { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; }
        .zf-divider-line { flex: 1; height: 1px; background: #FFD6A5; opacity: 0.6; }
        .zf-divider-text { font-size: 11px; color: #C4A08A; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 500; }
        .zf-list { display: flex; flex-direction: column; gap: 10px; }
        .zf-card { display: flex; align-items: center; gap: 12px; background: rgba(255,255,255,0.78); backdrop-filter: blur(12px); border: 1px solid rgba(255,200,140,0.35); border-radius: 20px; padding: 14px 16px; cursor: pointer; box-shadow: 0 4px 24px rgba(200,120,60,0.06); transition: transform 0.15s, box-shadow 0.15s, border-color 0.15s; animation: fadeUp 0.3s cubic-bezier(.22,1,.36,1) both; }
        .zf-card:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(200,120,60,0.12); border-color: rgba(244,133,74,0.45); }
        .zf-avatar { width: 44px; height: 44px; border-radius: 50%; background: linear-gradient(135deg, #FFD6A5, #FFA86C); display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0; border: 2px solid rgba(244,133,74,0.2); }
        .zf-info { flex: 1; }
        .zf-username { font-size: 14px; font-weight: 500; color: #2C1A0E; }
        .zf-meta { font-size: 12px; color: #C4A08A; margin-top: 2px; font-style: italic; font-family: 'Fraunces', Georgia, serif; font-weight: 300; }
        .zf-arrow { font-size: 18px; color: #C4A08A; transition: transform 0.15s, color 0.15s; }
        .zf-card:hover .zf-arrow { transform: translateX(3px); color: #F4854A; }
        .zf-empty { text-align: center; padding: 48px 20px; }
        .zf-empty-icon { font-size: 40px; margin-bottom: 12px; }
        .zf-empty-text { font-family: 'Fraunces', Georgia, serif; font-style: italic; font-size: 15px; color: #B97B4A; }
        .zf-spin { width: 20px; height: 20px; border: 2.5px solid #FFD6A5; border-top-color: #F4854A; border-radius: 50%; animation: spin 0.7s linear infinite; margin: 40px auto; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <div className="zf-root">
        <div className="zf-blob zf-blob-1" />
        <div className="zf-blob zf-blob-2" />
        <div className="zf-blob zf-blob-3" />

        <nav className="zf-nav">
          <div className="zf-nav-brand">🐱 Zinger Cat</div>
          <div className="zf-nav-links">
            <span className="zf-nav-item" onClick={() => navigate(`/profile/${me}`)}>👤 Profile</span>
            <span className="zf-nav-item" onClick={() => navigate("/search")}>🔍 Search</span>
            <span className="zf-nav-item zf-nav-item-active">👥 Community</span>
            <span className="zf-nav-item" onClick={() => navigate("/chat")}>💬 Messages</span>
            <span className="zf-nav-item" onClick={() => navigate("/notifications")}>🔔 Alerts</span>
            <span className="zf-nav-item" onClick={() => navigate("/home")}>🏠 Home</span>
          </div>
        </nav>

        <div className="zf-main">
          <div className="zf-header-card">
            <div className="zf-header-icon">👥</div>
            <div>
              <div className="zf-header-title">Community</div>
              <div className="zf-header-sub">"Your campus cat crew"</div>
            </div>
          </div>

          {loading ? (
            <div className="zf-spin" />
          ) : friends.length === 0 ? (
            <div className="zf-empty">
              <div className="zf-empty-icon">🐾</div>
              <p className="zf-empty-text">"No friends yet — go find some cats!"</p>
            </div>
          ) : (
            <>
              <div className="zf-divider">
                <div className="zf-divider-line" />
                <span className="zf-divider-text">{friends.length} friend{friends.length !== 1 ? "s" : ""}</span>
                <div className="zf-divider-line" />
              </div>
              <div className="zf-list">
                {friends.map((friend) => (
                  <div key={friend} className="zf-card" onClick={() => navigate(`/profile/${friend}`)}>
                    <div className="zf-avatar">🐱</div>
                    <div className="zf-info">
                      <div className="zf-username">@{friend}</div>
                      <div className="zf-meta">"fellow campus cat"</div>
                    </div>
                    <span className="zf-arrow">›</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
