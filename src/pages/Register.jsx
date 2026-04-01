import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.endsWith("@psgtech.ac.in")) {
      setError("Use college email (example@psgtech.ac.in)");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "https://zingercat-backend.onrender.com/api/auth/register",
        { email, password }
      );

      // 🔥 SAVE AUTH
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);
      localStorage.setItem("profileDone", "false");

      // 🔥 FORCE FULL RELOAD (THIS FIXES EVERYTHING)
      window.location.href = "/edit-profile";

    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,600;1,9..144,300&family=DM+Sans:wght@400;500&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }

        .zr-root {
          min-height: 100vh;
          background: #FDF8F2;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'DM Sans', sans-serif;
          position: relative;
          overflow: hidden;
        }

        .zr-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.35;
          pointer-events: none;
        }
        .zr-blob-1 { width: 420px; height: 420px; background: #FFD6A5; top: -80px; left: -120px; }
        .zr-blob-2 { width: 300px; height: 300px; background: #FFAAA5; bottom: -60px; right: -80px; }
        .zr-blob-3 { width: 200px; height: 200px; background: #A8DADC; top: 40%; left: 60%; opacity: 0.2; }

        .zr-card {
          position: relative;
          z-index: 1;
          background: rgba(255,255,255,0.75);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255,200,140,0.4);
          border-radius: 28px;
          padding: 48px 44px 40px;
          width: 90%;
          max-width: 440px;
          box-shadow: 0 8px 48px rgba(200,120,60,0.10), 0 1px 0 rgba(255,255,255,0.9) inset;
          animation: fadeUp 0.65s cubic-bezier(.22,1,.36,1) both;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* header */
        .zr-header { text-align: center; margin-bottom: 32px; }

        .zr-icon-wrap {
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

        .zr-title {
          font-family: 'Fraunces', Georgia, serif;
          font-size: 30px;
          font-weight: 600;
          color: #2C1A0E;
          letter-spacing: -0.5px;
          line-height: 1.1;
        }
        .zr-subtitle {
          margin-top: 6px;
          font-size: 13px;
          color: #B97B4A;
          font-style: italic;
          font-family: 'Fraunces', Georgia, serif;
          font-weight: 300;
        }

        /* divider */
        .zr-divider {
          display: flex; align-items: center; gap: 10px;
          margin-bottom: 24px;
        }
        .zr-divider-line { flex: 1; height: 1px; background: #FFD6A5; }
        .zr-divider-text { font-size: 11px; color: #C4A08A; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 500; }

        /* field group */
        .zr-field {
          position: relative;
          margin-bottom: 14px;
        }
        .zr-field-icon {
          position: absolute;
          left: 14px; top: 50%; transform: translateY(-50%);
          font-size: 16px;
          pointer-events: none;
          line-height: 1;
        }
        .zr-input {
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
        .zr-input::placeholder { color: #C4A08A; }
        .zr-input:focus {
          border-color: #F4854A;
          background: #fff;
          box-shadow: 0 0 0 4px rgba(244,133,74,0.12);
        }

        /* error */
        .zr-error {
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

        /* submit button */
        .zr-btn {
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
          transition: transform 0.15s ease, box-shadow 0.15s ease, opacity 0.15s;
          margin-top: 4px;
          display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .zr-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(244,133,74,0.45);
        }
        .zr-btn:active:not(:disabled) { transform: translateY(0); }
        .zr-btn:disabled { opacity: 0.65; cursor: not-allowed; }

        /* spinner */
        .zr-spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(255,255,255,0.4);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          flex-shrink: 0;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* footer */
        .zr-footer {
          text-align: center;
          margin-top: 22px;
          font-size: 13px;
          color: #C4A08A;
        }
        .zr-footer a {
          color: #F4854A;
          font-weight: 500;
          text-decoration: none;
          cursor: pointer;
        }
        .zr-footer a:hover { text-decoration: underline; }

        /* steps indicator */
        .zr-steps {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          margin-bottom: 28px;
        }
        .zr-step {
          width: 28px; height: 4px;
          border-radius: 2px;
          background: #FFD6A5;
        }
        .zr-step.active {
          background: #F4854A;
          width: 40px;
        }
      `}</style>

      <div className="zr-root">
        <div className="zr-blob zr-blob-1" />
        <div className="zr-blob zr-blob-2" />
        <div className="zr-blob zr-blob-3" />

        <div className="zr-card">

          {/* header */}
          <div className="zr-header">
            <div className="zr-icon-wrap">🐱</div>
            <h2 className="zr-title">Join Zinger Cat</h2>
            <p className="zr-subtitle">"A place where college cats help each other."</p>
          </div>

          {/* step dots */}
          <div className="zr-steps">
            <div className="zr-step active" />
            <div className="zr-step" />
            <div className="zr-step" />
          </div>

          <div className="zr-divider">
            <div className="zr-divider-line" />
            <span className="zr-divider-text">Create your account</span>
            <div className="zr-divider-line" />
          </div>

          <form onSubmit={handleRegister}>
            <div className="zr-field">
              <span className="zr-field-icon">📧</span>
              <input
                className="zr-input"
                placeholder="College Email (example@psgtech.ac.in)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="zr-field">
              <span className="zr-field-icon">🔒</span>
              <input
                className="zr-input"
                type="password"
                placeholder="Create password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="zr-field">
              <span className="zr-field-icon">✅</span>
              <input
                className="zr-input"
                type="password"
                placeholder="Confirm password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />
            </div>

            {error && (
              <div className="zr-error">
                <span>⚠️</span>
                {error}
              </div>
            )}

            <button type="submit" className="zr-btn" disabled={loading}>
              {loading ? (
                <>
                  <span className="zr-spinner" />
                  Registering...
                </>
              ) : (
                <>🐾 Register</>
              )}
            </button>
          </form>

          <p className="zr-footer">
            Already a cat?{" "}
            <a onClick={() => (window.location.href = "/login")}>Log In here</a>
          </p>
        </div>
      </div>
    </>
  );
}
