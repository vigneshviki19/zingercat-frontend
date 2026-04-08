import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchUsers } from "../api";

export default function Search() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!query.trim()) {
      setUsers([]);
      return;
    }
    const delay = setTimeout(async () => {
      try {
        setLoading(true);
        const data = await searchUsers(query);
        setUsers(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 300); // Instagram-style debounce
    return () => clearTimeout(delay);
  }, [query]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,600;1,9..144,300&family=DM+Sans:wght@400;500&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }

        .zs-root {
          min-height: 100vh;
          background: #FDF8F2;
          font-family: 'DM Sans', sans-serif;
          position: relative;
          overflow-x: hidden;
        }

        .zs-blob {
          position: fixed;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.32;
          pointer-events: none;
          z-index: 0;
        }
        .zs-blob-1 { width: 420px; height: 420px; background: #FFD6A5; top: -80px; left: -120px; }
        .zs-blob-2 { width: 300px; height: 300px; background: #FFAAA5; bottom: -60px; right: -80px; }
        .zs-blob-3 { width: 200px; height: 200px; background: #A8DADC; top: 40%; left: 60%; opacity: 0.18; }

        /* nav */
        .zs-nav {
          position: sticky; top: 0; z-index: 100;
          background: rgba(253,248,242,0.88);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-bottom: 1px solid rgba(255,200,140,0.35);
          padding: 0 24px;
          display: flex; align-items: center; justify-content: space-between;
          height: 58px;
        }
        .zs-nav-brand {
          font-family: 'Fraunces', Georgia, serif;
          font-size: 20px; font-weight: 600; color: #2C1A0E;
          display: flex; align-items: center; gap: 8px;
        }
        .zs-nav-back {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 7px 14px; border-radius: 10px;
          font-size: 13px; font-weight: 500; color: #9B5B1A;
          border: 1.5px solid #FFD6A5;
          background: rgba(255,255,255,0.7);
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .zs-nav-back:hover { background: #FFF0DE; border-color: #F4854A; transform: translateY(-1px); }

        /* main */
        .zs-main {
          position: relative; z-index: 1;
          max-width: 520px;
          margin: 32px auto;
          padding: 0 16px 60px;
          animation: fadeUp 0.6s cubic-bezier(.22,1,.36,1) both;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* search box */
        .zs-search-card {
          background: rgba(255,255,255,0.78);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(255,200,140,0.4);
          border-radius: 22px;
          padding: 24px 22px;
          margin-bottom: 20px;
          box-shadow: 0 4px 24px rgba(200,120,60,0.08);
        }
        .zs-search-header {
          display: flex; align-items: center; gap: 10px;
          margin-bottom: 16px;
        }
        .zs-search-icon-wrap {
          width: 44px; height: 44px;
          background: linear-gradient(135deg, #FFD6A5, #FFA86C);
          border-radius: 13px;
          display: flex; align-items: center; justify-content: center;
          font-size: 22px;
          box-shadow: 0 3px 12px rgba(244,133,74,0.25);
          animation: wobble 3s ease-in-out infinite;
        }
        @keyframes wobble {
          0%,100% { transform: rotate(-4deg); }
          50%      { transform: rotate(4deg); }
        }
        .zs-search-title {
          font-family: 'Fraunces', Georgia, serif;
          font-size: 22px; font-weight: 600; color: #2C1A0E;
          letter-spacing: -0.3px;
        }
        .zs-search-subtitle {
          font-size: 13px; color: #B97B4A;
          font-style: italic;
          font-family: 'Fraunces', Georgia, serif;
          font-weight: 300;
        }

        /* input */
        .zs-input-row {
          position: relative;
          display: flex; align-items: center;
        }
        .zs-input-icon {
          position: absolute; left: 14px;
          font-size: 16px; pointer-events: none;
          line-height: 1;
        }
        .zs-input {
          width: 100%;
          padding: 13px 14px 13px 42px;
          background: #FFFAF4;
          border: 1.5px solid #FFD6A5;
          border-radius: 14px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px; color: #2C1A0E;
          outline: none;
          transition: border-color 0.18s, box-shadow 0.18s, background 0.18s;
        }
        .zs-input::placeholder { color: #C4A08A; }
        .zs-input:focus {
          border-color: #F4854A;
          background: #fff;
          box-shadow: 0 0 0 4px rgba(244,133,74,0.10);
        }

        /* spinner inside input */
        .zs-input-spinner {
          position: absolute; right: 14px;
          width: 16px; height: 16px;
          border: 2px solid #FFD6A5;
          border-top-color: #F4854A;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* results */
        .zs-results {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        /* user card */
        .zs-user-card {
          display: flex; align-items: center; gap: 12px;
          background: rgba(255,255,255,0.78);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255,200,140,0.35);
          border-radius: 16px;
          padding: 14px 16px;
          cursor: pointer;
          transition: transform 0.15s, box-shadow 0.15s, border-color 0.15s;
          box-shadow: 0 2px 12px rgba(200,120,60,0.05);
          animation: fadeUp 0.3s cubic-bezier(.22,1,.36,1) both;
        }
        .zs-user-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(200,120,60,0.12);
          border-color: #F4854A;
        }
        .zs-user-avatar {
          width: 46px; height: 46px;
          border-radius: 50%;
          background: linear-gradient(135deg, #FFD6A5, #FFA86C);
          display: flex; align-items: center; justify-content: center;
          font-size: 22px;
          flex-shrink: 0;
          border: 2px solid rgba(244,133,74,0.2);
        }
        .zs-user-info { flex: 1; min-width: 0; }
        .zs-user-username {
          font-size: 14px; font-weight: 500; color: #2C1A0E;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .zs-user-bio {
          font-size: 12px; color: #C4A08A;
          margin-top: 2px;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          font-style: italic;
          font-family: 'Fraunces', Georgia, serif;
          font-weight: 300;
        }
        .zs-user-dept {
          display: inline-flex; align-items: center; gap: 4px;
          background: #FFF0DE; border: 1px solid #FFD6A5;
          border-radius: 100px; padding: 2px 8px;
          font-size: 11px; color: #9B5B1A; font-weight: 500;
          margin-top: 4px;
        }
        .zs-user-arrow {
          font-size: 16px; color: #C4A08A;
          flex-shrink: 0;
          transition: transform 0.15s, color 0.15s;
        }
        .zs-user-card:hover .zs-user-arrow { transform: translateX(3px); color: #F4854A; }

        /* empty / hint states */
        .zs-hint {
          text-align: center;
          padding: 40px 20px;
          color: #C4A08A;
        }
        .zs-hint-icon { font-size: 38px; margin-bottom: 10px; }
        .zs-hint-text {
          font-family: 'Fraunces', Georgia, serif;
          font-style: italic; font-size: 14px; font-weight: 300;
          color: #B97B4A;
        }

        /* divider */
        .zs-divider {
          display: flex; align-items: center; gap: 10px;
          margin-bottom: 16px;
        }
        .zs-divider-line { flex: 1; height: 1px; background: #FFD6A5; opacity: 0.6; }
        .zs-divider-text { font-size: 11px; color: #C4A08A; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 500; }
      `}</style>

      <div className="zs-root">
        <div className="zs-blob zs-blob-1" />
        <div className="zs-blob zs-blob-2" />
        <div className="zs-blob zs-blob-3" />

        {/* nav */}
        <nav className="zs-nav">
          <div className="zs-nav-brand">🐱 Zinger Cat</div>
          <button className="zs-nav-back" onClick={() => navigate("/home")}>🏠 Home</button>
        </nav>

        <div className="zs-main">

          {/* search box */}
          <div className="zs-search-card">
            <div className="zs-search-header">
              <div className="zs-search-icon-wrap">🔍</div>
              <div>
                <div className="zs-search-title">Search Cats</div>
                <div className="zs-search-subtitle">"Find your fellow college cats"</div>
              </div>
            </div>

            <div className="zs-input-row">
              <span className="zs-input-icon">🐾</span>
              <input
                className="zs-input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by username..."
              />
              {loading && <div className="zs-input-spinner" />}
            </div>
          </div>

          {/* results */}
          {!query.trim() && (
            <div className="zs-hint">
              <div className="zs-hint-icon">🐱</div>
              <p className="zs-hint-text">"Type a username to find cats on campus"</p>
            </div>
          )}

          {query.trim() && !loading && users.length === 0 && (
            <div className="zs-hint">
              <div className="zs-hint-icon">😿</div>
              <p className="zs-hint-text">"No cats found for "{query}""</p>
            </div>
          )}

          {users.length > 0 && (
            <>
              <div className="zs-divider">
                <div className="zs-divider-line" />
                <span className="zs-divider-text">{users.length} cat{users.length !== 1 ? "s" : ""} found</span>
                <div className="zs-divider-line" />
              </div>

              <div className="zs-results">
                {users.map((u) => (
                  <div
                    key={u.username}
                    className="zs-user-card"
                    onClick={() => navigate(`/profile/${u.username}`)}
                  >
                    <div className="zs-user-avatar">
                      {u.profilePic
                        ? <img src={u.profilePic} alt={u.username} style={{ width:"100%", height:"100%", borderRadius:"50%", objectFit:"cover" }} />
                        : "🐱"
                      }
                    </div>
                    <div className="zs-user-info">
                      <div className="zs-user-username">@{u.username}</div>
                      {u.about && <div className="zs-user-bio">"{u.about}"</div>}
                      {u.dept && <div className="zs-user-dept">🏫 {u.dept}</div>}
                    </div>
                    <span className="zs-user-arrow">›</span>
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
