import { useState } from "react";
import api from "../api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/auth/login", {
        email,
        password
      });
      // 🔥 SAVE AUTH
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);
      // ❌ DO NOT TOUCH profileDone here
      // 🔥 FORCE FULL APP RELOAD
      window.location.href = "/home";
    } catch (err) {
      setError("Invalid email or password");
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,600;1,9..144,300&family=DM+Sans:wght@400;500&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }

        .zl-root {
          min-height: 100vh;
          background: #FDF8F2;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'DM Sans', sans-serif;
          position: relative;
          overflow: hidden;
        }

        .zl-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.35;
          pointer-events: none;
        }
        .zl-blob-1 { width: 420px; height: 420px; background: #FFD6A5; top: -80px; left: -120px; }
        .zl-blob-2 { width: 300px; height: 300px; background: #FFAAA5; bottom: -60px; right: -80px; }
        .zl-blob-3 { width: 200px; height: 200px; background: #A8DADC; top: 40%; left: 60%; opacity: 0.2; }

        .zl-card {
          position: relative;
          z-index: 1;
          background: rgba(255,255,255,0.75);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255,200,140,0.4);
          border-radius: 28px;
          padding: 48px 44px 40px;
          width: 90%;
          max-width: 420px;
          box-shadow: 0 8px 48px rgba(200,120,60,0.10), 0 1px 0 rgba(255,255,255,0.9) inset;
          animation: fadeUp 0.65s cubic-bezier(.22,1,.36,1) both;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .zl-header { text-align: center; margin-bottom: 32px; }

        .zl-icon-wrap {
          width: 64px; height: 64px;
          background: linear-gradient(135deg, #FFD6A5, #FFA86C);
          border-radius: 20px;
          display: inline-flex; align-items: center; justify-content: center;
          font-size: 34px;
          box-shadow: 0 4px 18px rgba(244,133,74,0.3);
          margin-bottom: 16px;
          animation: wobble 3s ease-in-out infinite;
        }
        @keyframes wobble {
          0%,100% { transform: rotate(-3deg); }
          50%      { transform: rotate(3deg); }
        }

        .zl-title {
          font-family: 'Fraunces', Georgia, serif;
          font-size: 30px;
          font-weight: 600;
          color: #2C1A0E;
          letter-spacing: -0.5px;
          line-height: 1.1;
        }
        .zl-subtitle {
          margin-top: 6px;
          font-size: 13px;
          color: #B97B4A;
          font-style: italic;
          font-family: 'Fraunces', Georgia, serif;
          font-weight: 300;
        }

        .zl-divider {
          display: flex; align-items: center; gap: 10px;
          margin-bottom: 24px;
        }
        .zl-divider-line { flex: 1; height: 1px; background: #FFD6A5; }
        .zl-divider-text { font-size: 11px; color: #C4A08A; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 500; }

        .zl-field {
          position: relative;
          margin-bottom: 14px;
        }
        .zl-field-icon {
          position: absolute;
          left: 14px; top: 50%; transform: translateY(-50%);
          font-size: 16px;
          pointer-events: none;
          line-height: 1;
        }
        .zl-input {
          width: 100%;
          padding: 13px 14px 13px 42px;
          background: #FFFAF4;
          border: 1.5px solid #FFD6A5;
          border-radius: 12px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: #2C1A0E;
          outline: none;
          transition: border-color 0.18s, box-shadow 0.18s, background 0.18s;
        }
        .zl-input::placeholder { color: #C4A08A; }
        .zl-input:focus {
          border-color: #F4854A;
          background: #fff;
          box-shadow: 0 0 0 4px rgba(244,133,74,0.12);
        }

        .zl-error {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #FFF0EE;
          border: 1px solid #FFBCB0;
          border-radius: 10px;
          padding: 10px 14px;
          margin-bottom: 16px;
          font-size: 13px;
          color: #C0392B;
          animation: shake 0.35s ease;
        }
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          25%      { transform: translateX(-5px); }
          75%      { transform: translateX(5px); }
        }

        .zl-btn {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #F4854A, #E86A2A);
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 500;
          border: none;
          border-radius: 14px;
          cursor: pointer;
          letter-spacing: 0.02em;
          box-shadow: 0 4px 18px rgba(244,133,74,0.35);
          transition: transform 0.15s ease, box-shadow 0.15s ease;
          margin-top: 4px;
          display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .zl-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(244,133,74,0.45);
        }
        .zl-btn:active { transform: translateY(0); }

        .zl-footer {
          text-align: center;
          margin-top: 22px;
          font-size: 13px;
          color: #C4A08A;
        }
        .zl-footer a {
          color: #F4854A;
          font-weight: 500;
          text-decoration: none;
          cursor: pointer;
        }
        .zl-footer a:hover { text-decoration: underline; }

        .zl-welcome-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #FFF0DE;
          border: 1px solid #FFD6A5;
          border-radius: 100px;
          padding: 4px 12px 4px 8px;
          font-size: 11px;
          font-weight: 500;
          color: #9B5B1A;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          margin-bottom: 14px;
        }
        .zl-badge-dot {
          width: 6px; height: 6px;
          background: #F4854A;
          border-radius: 50%;
          animation: pulse 1.8s ease-in-out infinite;
        }
        @keyframes pulse {
          0%,100% { transform: scale(1); opacity: 1; }
          50%      { transform: scale(1.4); opacity: 0.6; }
        }
      `}</style>

      <div className="zl-root">
        <div className="zl-blob zl-blob-1" />
        <div className="zl-blob zl-blob-2" />
        <div className="zl-blob zl-blob-3" />

        <div className="zl-card">

          <div className="zl-header">
            <div className="zl-welcome-badge">
              <span className="zl-badge-dot" />
              Welcome back
            </div>
            <div className="zl-icon-wrap">😺</div>
            <h2 className="zl-title">Welcome back, Meow!</h2>
            <p className="zl-subtitle">"Login to continue your journey."</p>
          </div>

          <div className="zl-divider">
            <div className="zl-divider-line" />
            <span className="zl-divider-text">Your account</span>
            <div className="zl-divider-line" />
          </div>

          <form onSubmit={handleLogin}>
            <div className="zl-field">
              <span className="zl-field-icon">📧</span>
              <input
                className="zl-input"
                type="email"
                placeholder="College Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="zl-field">
              <span className="zl-field-icon">🔒</span>
              <input
                className="zl-input"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <div className="zl-error">
                <span>⚠️</span>
                {error}
              </div>
            )}

            <button type="submit" className="zl-btn">
              😺 Login
            </button>
          </form>

          <p className="zl-footer">
            New cat?{" "}
            <a onClick={() => (window.location.href = "/register")}>Sign Up here</a>
          </p>
        </div>
      </div>
    </>
  );
}
