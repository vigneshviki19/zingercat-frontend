import { useEffect, useState } from "react";
import { getFriends } from "../api";
import { useNavigate } from "react-router-dom";

export default function UserFriends() {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => { load(); }, []);

  async function load() {
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
        .zuf-root { min-height: 100vh; background: #FDF8F2; font-family: 'DM Sans', sans-serif; }
        .zuf-blob { position: fixed; border-radius: 50%; filter: blur(90px); opacity: 0.28; pointer-events: none; z-index: 0; }
        .zuf-blob-1 { width: 500px; height: 500px; background: #FFD6A5; top: -100px; left: -150px; }
        .zuf-blob-2 { width: 350px; height: 350px; background: #FFAAA5; bottom: -80px; right: -80px; }
        .zuf-blob-3 { width: 220px; height: 220px; background: #A8DADC; top: 35%; left: 55%; opacity: 0.18; }
        .zuf-main { position: relative; z-index: 1; max-width: 620px; margin: 48px auto; padding: 0 16px 60px; animation: fadeUp 0.45s cubic-bezier(.22,1,.36,1) both; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .zuf-header-card { background: rgba(255,255,255,0.78); backdrop-filter: blur(14px); border: 1px solid rgba(255,200,140,0.4); border-radius: 20px; padding: 18px 20px; margin-bottom: 20px; box-shadow: 0 4px 24px rgba(200,120,60,0.08); display: flex; align-items: center; gap: 12px; }
        .zuf-header-icon { width: 44px; height: 44px; border-radius: 50%; background: linear-gradient(135deg, #FFD6A5, #FFA86C); display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0; }
        .zuf-header-title { font-family: 'Fraunces', Georgia, serif; font-size: 20px; font-weight: 600; color: #2C1A0E; }
        .zuf-header-sub { font-size: 12px; color: #C4A08A; font-style: italic; font-family: 'Fraunces', Georgia, serif; font-weight: 300; }
        .zuf-divider { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; }
        .zuf-divider-line { flex: 1; height: 1px; background: #FFD6A5; opacity: 0.6; }
        .zuf-divider-text { font-size: 11px; color: #C4A08A; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 500; }
        .zuf-list { display: flex; flex-direction: column; gap: 10px; }
        .zuf-card { display: flex; align-items: center; gap: 12px; background: rgba(255,255,255,0.78); backdrop-filter: blur(12px); border: 1px solid rgba(255,200,140,0.35); border-radius: 20px; padding: 14px 16px; cursor: pointer; box-shadow: 0 4px 24px rgba(200,120,60,0.06); transition: transform 0.15s, box-shadow 0.15s, border-color 0.15s; animation: fadeUp 0.3s cubic-bezier(.22,1,.36,1) both; }
        .zuf-card:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(200,120,60,0.12); border-color: rgba(244,133,74,0.45); }
        .zuf-avatar { width: 44px; height: 44px; border-radius: 50%; background: linear-gradient(135deg, #FFD6A5, #FFA86C); display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0; border: 2px solid rgba(244,133,74,0.2); }
        .zuf-info { flex: 1; }
        .zuf-username { font-size: 14px; font-weight: 500; color: #2C1A0E; }
        .zuf-arrow { font-size: 18px; color: #C4A08A; transition: transform 0.15s, color 0.15s; }
        .zuf-card:hover .zuf-arrow { transform: translateX(3px); color: #F4854A; }
        .zuf-empty { text-align: center; padding: 48px 20px; }
        .zuf-empty-icon { font-size: 40px; margin-bottom: 12px; }
        .zuf-empty-text { font-family: 'Fraunces', Georgia, serif; font-style: italic; font-size: 15px; color: #B97B4A; }
        .zuf-spin { width: 20px; height: 20px; border: 2.5px solid #FFD6A5; border-top-color: #F4854A; border-radius: 50%; animation: spin 0.7s linear infinite; margin: 40px auto; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <div className="zuf-root">
        <div className="zuf-blob zuf-blob-1" />
        <div className="zuf-blob zuf-blob-2" />
        <div className="zuf-blob zuf-blob-3" />

        <div className="zuf-main">
          <div className="zuf-header-card">
            <div className="zuf-header-icon">🤝</div>
            <div>
              <div className="zuf-header-title">Your Friends</div>
              <div className="zuf-header-sub">"Your campus cat crew"</div>
            </div>
          </div>

          {loading ? <div className="zuf-spin" /> : friends.length === 0 ? (
            <div className="zuf-empty">
              <div className="zuf-empty-icon">🐾</div>
              <p className="zuf-empty-text">"No friends yet — go find some cats!"</p>
            </div>
          ) : (
            <>
              <div className="zuf-divider">
                <div className="zuf-divider-line" />
                <span className="zuf-divider-text">{friends.length} friend{friends.length !== 1 ? "s" : ""}</span>
                <div className="zuf-divider-line" />
              </div>
              <div className="zuf-list">
                {friends.map((f) => (
                  <div key={f} className="zuf-card" onClick={() => navigate(`/profile/${f}`)}>
                    <div className="zuf-avatar">🐱</div>
                    <div className="zuf-info">
                      <div className="zuf-username">@{f}</div>
                    </div>
                    <span className="zuf-arrow">›</span>
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
