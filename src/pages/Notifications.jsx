import { useEffect, useState } from "react";
import { getFriendRequests, acceptFriend } from "../api";
import { useNavigate } from "react-router-dom";

export default function Notifications() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const me = localStorage.getItem("username");

  useEffect(() => { load(); }, []);

  async function load() {
    try {
      setLoading(true);
      const data = await getFriendRequests();
      setRequests(data || []);
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
        .zn-root { min-height: 100vh; background: #FDF8F2; font-family: 'DM Sans', sans-serif; }
        .zn-blob { position: fixed; border-radius: 50%; filter: blur(90px); opacity: 0.28; pointer-events: none; z-index: 0; }
        .zn-blob-1 { width: 500px; height: 500px; background: #FFD6A5; top: -100px; left: -150px; }
        .zn-blob-2 { width: 350px; height: 350px; background: #FFAAA5; bottom: -80px; right: -80px; }
        .zn-blob-3 { width: 220px; height: 220px; background: #A8DADC; top: 35%; left: 55%; opacity: 0.18; }
        .zn-nav { position: sticky; top: 0; z-index: 100; background: rgba(253,248,242,0.85); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); border-bottom: 1px solid rgba(255,200,140,0.35); padding: 0 24px; display: flex; align-items: center; justify-content: space-between; height: 58px; }
        .zn-nav-brand { font-family: 'Fraunces', Georgia, serif; font-size: 20px; font-weight: 600; color: #2C1A0E; display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
        .zn-nav-links { display: flex; align-items: center; gap: 4px; }
        .zn-nav-item { display: flex; align-items: center; gap: 5px; padding: 7px 12px; border-radius: 10px; font-size: 13px; font-weight: 500; color: #9B5B1A; cursor: pointer; transition: background 0.15s; white-space: nowrap; }
        .zn-nav-item:hover { background: #FFF0DE; }
        .zn-nav-item-active { background: #FFF0DE; color: #F4854A; font-weight: 600; }
        .zn-main { position: relative; z-index: 1; max-width: 620px; margin: 28px auto; padding: 0 16px 60px; animation: fadeUp 0.45s cubic-bezier(.22,1,.36,1) both; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .zn-header-card { background: rgba(255,255,255,0.78); backdrop-filter: blur(14px); border: 1px solid rgba(255,200,140,0.4); border-radius: 20px; padding: 18px 20px; margin-bottom: 20px; box-shadow: 0 4px 24px rgba(200,120,60,0.08); display: flex; align-items: center; gap: 12px; }
        .zn-header-icon { width: 44px; height: 44px; border-radius: 50%; background: linear-gradient(135deg, #FFD6A5, #FFA86C); display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0; }
        .zn-header-title { font-family: 'Fraunces', Georgia, serif; font-size: 20px; font-weight: 600; color: #2C1A0E; }
        .zn-header-sub { font-size: 12px; color: #C4A08A; font-style: italic; font-family: 'Fraunces', Georgia, serif; font-weight: 300; }
        .zn-divider { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; }
        .zn-divider-line { flex: 1; height: 1px; background: #FFD6A5; opacity: 0.6; }
        .zn-divider-text { font-size: 11px; color: #C4A08A; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 500; }
        .zn-list { display: flex; flex-direction: column; gap: 10px; }
        .zn-card { display: flex; align-items: center; gap: 12px; background: rgba(255,255,255,0.78); backdrop-filter: blur(12px); border: 1px solid rgba(255,200,140,0.35); border-radius: 20px; padding: 14px 16px; box-shadow: 0 4px 24px rgba(200,120,60,0.06); animation: fadeUp 0.3s cubic-bezier(.22,1,.36,1) both; }
        .zn-avatar { width: 44px; height: 44px; border-radius: 50%; background: linear-gradient(135deg, #FFD6A5, #FFA86C); display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0; border: 2px solid rgba(244,133,74,0.2); }
        .zn-info { flex: 1; min-width: 0; }
        .zn-username { font-size: 14px; font-weight: 500; color: #2C1A0E; }
        .zn-meta { font-size: 12px; color: #C4A08A; margin-top: 2px; font-style: italic; font-family: 'Fraunces', Georgia, serif; font-weight: 300; }
        .zn-accept-btn { padding: 8px 16px; background: linear-gradient(135deg, #F4854A, #E86A2A); color: #fff; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500; border: none; border-radius: 10px; cursor: pointer; box-shadow: 0 3px 12px rgba(244,133,74,0.3); transition: transform 0.15s, box-shadow 0.15s; white-space: nowrap; flex-shrink: 0; }
        .zn-accept-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 18px rgba(244,133,74,0.4); }
        .zn-empty { text-align: center; padding: 48px 20px; }
        .zn-empty-icon { font-size: 40px; margin-bottom: 12px; }
        .zn-empty-text { font-family: 'Fraunces', Georgia, serif; font-style: italic; font-size: 15px; color: #B97B4A; }
        .zn-spin { width: 20px; height: 20px; border: 2.5px solid #FFD6A5; border-top-color: #F4854A; border-radius: 50%; animation: spin 0.7s linear infinite; margin: 40px auto; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <div className="zn-root">
        <div className="zn-blob zn-blob-1" />
        <div className="zn-blob zn-blob-2" />
        <div className="zn-blob zn-blob-3" />

        <nav className="zn-nav">
          <div className="zn-nav-brand">🐱 Zinger Cat</div>
          <div className="zn-nav-links">
            <span className="zn-nav-item" onClick={() => navigate(`/profile/${me}`)}>👤 Profile</span>
            <span className="zn-nav-item" onClick={() => navigate("/search")}>🔍 Search</span>
            <span className="zn-nav-item" onClick={() => navigate("/friends")}>👥 Community</span>
            <span className="zn-nav-item" onClick={() => navigate("/chat")}>💬 Messages</span>
            <span className="zn-nav-item zn-nav-item-active">🔔 Alerts</span>
            <span className="zn-nav-item" onClick={() => navigate("/home")}>🏠 Home</span>
          </div>
        </nav>

        <div className="zn-main">
          <div className="zn-header-card">
            <div className="zn-header-icon">🔔</div>
            <div>
              <div className="zn-header-title">Notifications</div>
              <div className="zn-header-sub">"Cats who want to connect with you"</div>
            </div>
          </div>

          {loading ? (
            <div className="zn-spin" />
          ) : requests.length === 0 ? (
            <div className="zn-empty">
              <div className="zn-empty-icon">🐾</div>
              <p className="zn-empty-text">"No pending friend requests"</p>
            </div>
          ) : (
            <>
              <div className="zn-divider">
                <div className="zn-divider-line" />
                <span className="zn-divider-text">{requests.length} request{requests.length !== 1 ? "s" : ""}</span>
                <div className="zn-divider-line" />
              </div>
              <div className="zn-list">
                {requests.map((u) => (
                  <div key={u._id} className="zn-card">
                    <div className="zn-avatar">🐱</div>
                    <div className="zn-info">
                      <div className="zn-username">@{u.username}</div>
                      <div className="zn-meta">"wants to be your campus cat friend"</div>
                    </div>
                    <button className="zn-accept-btn" onClick={async () => { await acceptFriend(u._id); load(); }}>
                      ✅ Accept
                    </button>
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
