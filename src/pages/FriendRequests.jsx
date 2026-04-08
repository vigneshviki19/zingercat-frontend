import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function FriendRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const me = localStorage.getItem("username");

  useEffect(() => {
    api.get("/friends/requests").then(res => {
      setRequests(res.data || []);
      setLoading(false);
    });
  }, []);

  const accept = async (u) => {
    await api.post(`/friends/accept/${u}`);
    setRequests(req => req.filter(r => r !== u));
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,600;1,9..144,300&family=DM+Sans:wght@400;500&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        .zfr-root { min-height: 100vh; background: #FDF8F2; font-family: 'DM Sans', sans-serif; }
        .zfr-blob { position: fixed; border-radius: 50%; filter: blur(90px); opacity: 0.28; pointer-events: none; z-index: 0; }
        .zfr-blob-1 { width: 500px; height: 500px; background: #FFD6A5; top: -100px; left: -150px; }
        .zfr-blob-2 { width: 350px; height: 350px; background: #FFAAA5; bottom: -80px; right: -80px; }
        .zfr-blob-3 { width: 220px; height: 220px; background: #A8DADC; top: 35%; left: 55%; opacity: 0.18; }
        .zfr-nav { position: sticky; top: 0; z-index: 100; background: rgba(253,248,242,0.85); backdrop-filter: blur(14px); border-bottom: 1px solid rgba(255,200,140,0.35); padding: 0 24px; display: flex; align-items: center; justify-content: space-between; height: 58px; }
        .zfr-nav-brand { font-family: 'Fraunces', Georgia, serif; font-size: 20px; font-weight: 600; color: #2C1A0E; display: flex; align-items: center; gap: 8px; }
        .zfr-nav-links { display: flex; align-items: center; gap: 4px; }
        .zfr-nav-item { display: flex; align-items: center; gap: 5px; padding: 7px 12px; border-radius: 10px; font-size: 13px; font-weight: 500; color: #9B5B1A; cursor: pointer; transition: background 0.15s; white-space: nowrap; }
        .zfr-nav-item:hover { background: #FFF0DE; }
        .zfr-main { position: relative; z-index: 1; max-width: 620px; margin: 28px auto; padding: 0 16px 60px; animation: fadeUp 0.45s cubic-bezier(.22,1,.36,1) both; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .zfr-header-card { background: rgba(255,255,255,0.78); backdrop-filter: blur(14px); border: 1px solid rgba(255,200,140,0.4); border-radius: 20px; padding: 18px 20px; margin-bottom: 20px; box-shadow: 0 4px 24px rgba(200,120,60,0.08); display: flex; align-items: center; gap: 12px; }
        .zfr-header-icon { width: 44px; height: 44px; border-radius: 50%; background: linear-gradient(135deg, #FFD6A5, #FFA86C); display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0; }
        .zfr-header-title { font-family: 'Fraunces', Georgia, serif; font-size: 20px; font-weight: 600; color: #2C1A0E; }
        .zfr-header-sub { font-size: 12px; color: #C4A08A; font-style: italic; font-family: 'Fraunces', Georgia, serif; font-weight: 300; }
        .zfr-divider { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; }
        .zfr-divider-line { flex: 1; height: 1px; background: #FFD6A5; opacity: 0.6; }
        .zfr-divider-text { font-size: 11px; color: #C4A08A; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 500; }
        .zfr-list { display: flex; flex-direction: column; gap: 10px; }
        .zfr-card { display: flex; align-items: center; gap: 12px; background: rgba(255,255,255,0.78); backdrop-filter: blur(12px); border: 1px solid rgba(255,200,140,0.35); border-radius: 20px; padding: 14px 16px; box-shadow: 0 4px 24px rgba(200,120,60,0.06); animation: fadeUp 0.3s cubic-bezier(.22,1,.36,1) both; }
        .zfr-avatar { width: 44px; height: 44px; border-radius: 50%; background: linear-gradient(135deg, #FFD6A5, #FFA86C); display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0; border: 2px solid rgba(244,133,74,0.2); }
        .zfr-info { flex: 1; }
        .zfr-username { font-size: 14px; font-weight: 500; color: #2C1A0E; }
        .zfr-meta { font-size: 12px; color: #C4A08A; margin-top: 2px; font-style: italic; font-family: 'Fraunces', Georgia, serif; font-weight: 300; }
        .zfr-accept-btn { padding: 8px 16px; background: linear-gradient(135deg, #F4854A, #E86A2A); color: #fff; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500; border: none; border-radius: 10px; cursor: pointer; box-shadow: 0 3px 12px rgba(244,133,74,0.3); transition: transform 0.15s, box-shadow 0.15s; flex-shrink: 0; }
        .zfr-accept-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 18px rgba(244,133,74,0.4); }
        .zfr-empty { text-align: center; padding: 48px 20px; }
        .zfr-empty-icon { font-size: 40px; margin-bottom: 12px; }
        .zfr-empty-text { font-family: 'Fraunces', Georgia, serif; font-style: italic; font-size: 15px; color: #B97B4A; }
        .zfr-spin { width: 20px; height: 20px; border: 2.5px solid #FFD6A5; border-top-color: #F4854A; border-radius: 50%; animation: spin 0.7s linear infinite; margin: 40px auto; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <div className="zfr-root">
        <div className="zfr-blob zfr-blob-1" />
        <div className="zfr-blob zfr-blob-2" />
        <div className="zfr-blob zfr-blob-3" />

        <nav className="zfr-nav">
          <div className="zfr-nav-brand">🐱 Zinger Cat</div>
          <div className="zfr-nav-links">
            <span className="zfr-nav-item" onClick={() => navigate(`/profile/${me}`)}>👤 Profile</span>
            <span className="zfr-nav-item" onClick={() => navigate("/search")}>🔍 Search</span>
            <span className="zfr-nav-item" onClick={() => navigate("/friends")}>👥 Community</span>
            <span className="zfr-nav-item" onClick={() => navigate("/chat")}>💬 Messages</span>
            <span className="zfr-nav-item" onClick={() => navigate("/notifications")}>🔔 Alerts</span>
            <span className="zfr-nav-item" onClick={() => navigate("/home")}>🏠 Home</span>
          </div>
        </nav>

        <div className="zfr-main">
          <div className="zfr-header-card">
            <div className="zfr-header-icon">📩</div>
            <div>
              <div className="zfr-header-title">Friend Requests</div>
              <div className="zfr-header-sub">"Cats who want to join your crew"</div>
            </div>
          </div>

          {loading ? <div className="zfr-spin" /> : requests.length === 0 ? (
            <div className="zfr-empty">
              <div className="zfr-empty-icon">🐾</div>
              <p className="zfr-empty-text">"No pending requests right now"</p>
            </div>
          ) : (
            <>
              <div className="zfr-divider">
                <div className="zfr-divider-line" />
                <span className="zfr-divider-text">{requests.length} pending</span>
                <div className="zfr-divider-line" />
              </div>
              <div className="zfr-list">
                {requests.map(u => (
                  <div key={u} className="zfr-card">
                    <div className="zfr-avatar">🐱</div>
                    <div className="zfr-info">
                      <div className="zfr-username">@{u}</div>
                      <div className="zfr-meta">"wants to be your campus cat"</div>
                    </div>
                    <button className="zfr-accept-btn" onClick={() => accept(u)}>✅ Accept</button>
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
