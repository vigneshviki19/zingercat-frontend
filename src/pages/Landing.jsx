export default function Landing() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,600;1,9..144,300&family=DM+Sans:wght@400;500&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }

        .zc-root {
          min-height: 100vh;
          background: #FDF8F2;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-family: 'DM Sans', sans-serif;
          overflow: hidden;
          position: relative;
        }

        .zc-bg-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.35;
          pointer-events: none;
        }
        .zc-bg-blob-1 {
          width: 420px; height: 420px;
          background: #FFD6A5;
          top: -80px; left: -120px;
        }
        .zc-bg-blob-2 {
          width: 300px; height: 300px;
          background: #FFAAA5;
          bottom: -60px; right: -80px;
        }
        .zc-bg-blob-3 {
          width: 200px; height: 200px;
          background: #A8DADC;
          top: 40%; left: 60%;
          opacity: 0.2;
        }

        .zc-card {
          position: relative;
          z-index: 1;
          background: rgba(255,255,255,0.72);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255,200,140,0.4);
          border-radius: 28px;
          padding: 52px 48px 44px;
          max-width: 480px;
          width: 90%;
          box-shadow: 0 8px 48px rgba(200,120,60,0.10), 0 1px 0 rgba(255,255,255,0.9) inset;
          text-align: center;
          animation: fadeUp 0.7s cubic-bezier(.22,1,.36,1) both;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .zc-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #FFF0DE;
          border: 1px solid #FFD6A5;
          border-radius: 100px;
          padding: 5px 14px 5px 10px;
          font-size: 12px;
          font-weight: 500;
          color: #9B5B1A;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          margin-bottom: 20px;
        }
        .zc-badge-dot {
          width: 6px; height: 6px;
          background: #F4854A;
          border-radius: 50%;
          animation: pulse 1.8s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.4); opacity: 0.6; }
        }

        .zc-logo-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-bottom: 10px;
        }
        .zc-emoji-wrap {
          width: 56px; height: 56px;
          background: linear-gradient(135deg, #FFD6A5, #FFA86C);
          border-radius: 16px;
          display: flex; align-items: center; justify-content: center;
          font-size: 30px;
          box-shadow: 0 4px 16px rgba(244,133,74,0.3);
          animation: wobble 3s ease-in-out infinite;
        }
        @keyframes wobble {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
        .zc-title {
          font-family: 'Fraunces', Georgia, serif;
          font-size: 42px;
          font-weight: 600;
          color: #2C1A0E;
          letter-spacing: -1px;
          line-height: 1;
        }

        .zc-tagline-block {
          margin: 18px 0 28px;
        }
        .zc-tagline-main {
          font-family: 'Fraunces', Georgia, serif;
          font-style: italic;
          font-size: 16px;
          font-weight: 300;
          color: #6B4226;
          line-height: 1.5;
        }
        .zc-tagline-sub {
          margin-top: 6px;
          font-size: 13px;
          font-weight: 500;
          color: #B97B4A;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .zc-anim-box {
          background: linear-gradient(145deg, #FFF8F2, #FFF0DE);
          border: 1.5px dashed #FFD6A5;
          border-radius: 18px;
          height: 170px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-bottom: 32px;
          position: relative;
          overflow: hidden;
        }
        .zc-cat-walk {
          display: flex;
          gap: 8px;
        }
        .zc-paw {
          width: 10px; height: 10px;
          background: #F4854A;
          border-radius: 50%;
          animation: pawStep 1s ease-in-out infinite;
        }
        .zc-paw:nth-child(1) { animation-delay: 0s; }
        .zc-paw:nth-child(2) { animation-delay: 0.2s; }
        .zc-paw:nth-child(3) { animation-delay: 0.4s; }
        .zc-paw:nth-child(4) { animation-delay: 0.6s; }
        @keyframes pawStep {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.3); opacity: 1; }
        }
        .zc-anim-cat-emoji {
          font-size: 48px;
          animation: bounce 1.2s ease-in-out infinite;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .zc-anim-label {
          font-size: 12px;
          color: #C49470;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          font-weight: 500;
        }

        .zc-btn-group {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .zc-btn-primary {
          display: block;
          width: 100%;
          padding: 14px 24px;
          background: linear-gradient(135deg, #F4854A, #E86A2A);
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 500;
          border: none;
          border-radius: 14px;
          cursor: pointer;
          letter-spacing: 0.02em;
          box-shadow: 0 4px 18px rgba(244,133,74,0.35), 0 1px 0 rgba(255,255,255,0.25) inset;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .zc-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(244,133,74,0.45);
        }
        .zc-btn-primary:active {
          transform: translateY(0);
          box-shadow: 0 2px 10px rgba(244,133,74,0.25);
        }

        .zc-btn-secondary {
          display: block;
          width: 100%;
          padding: 13px 24px;
          background: transparent;
          color: #9B5B1A;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 500;
          border: 1.5px solid #FFD6A5;
          border-radius: 14px;
          cursor: pointer;
          letter-spacing: 0.02em;
          transition: background 0.15s ease, border-color 0.15s ease, transform 0.15s ease;
        }
        .zc-btn-secondary:hover {
          background: #FFF0DE;
          border-color: #F4854A;
          transform: translateY(-2px);
        }
        .zc-btn-secondary:active { transform: translateY(0); }

        .zc-footer-note {
          margin-top: 22px;
          font-size: 12px;
          color: #C4A08A;
        }
        .zc-footer-note span {
          color: #F4854A;
        }
      `}</style>

      <div className="zc-root">
        <div className="zc-bg-blob zc-bg-blob-1" />
        <div className="zc-bg-blob zc-bg-blob-2" />
        <div className="zc-bg-blob zc-bg-blob-3" />

        <div className="zc-card">
          <div className="zc-badge">
            <span className="zc-badge-dot" />
            College Community
          </div>

          <div className="zc-logo-wrap">
            <div className="zc-emoji-wrap">🐱</div>
            <h1 className="zc-title">Zinger Cat</h1>
          </div>

          <div className="zc-tagline-block">
            <p className="zc-tagline-main">"A place where college cats help each other."</p>
            <p className="zc-tagline-sub">Ask · Share · Grow · Together</p>
          </div>

          <div className="zc-anim-box">
            <div className="zc-anim-cat-emoji">🐾</div>
            <div className="zc-cat-walk">
              <div className="zc-paw" />
              <div className="zc-paw" />
              <div className="zc-paw" />
              <div className="zc-paw" />

          <div className="zc-btn-group">
            <button
              className="zc-btn-primary"
              onClick={() => (window.location.href = "/register")}
            >
              🐱 New Cat? Sign Up
            </button>
            <button
              className="zc-btn-secondary"
              onClick={() => (window.location.href = "/login")}
            >
              😺 Already a Cat? Log In
            </button>
          </div>

          <p className="zc-footer-note">
            Join <span>2,400+</span> college cats already on the platform
          </p>
        </div>
      </div>
    </>
  );
}
