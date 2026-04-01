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
          background: linear-gradient(160deg, #FFF8F0 0%, #FFF2E0 100%);
          border: 1.5px solid #FFD6A5;
          border-radius: 18px;
          height: 180px;
          margin-bottom: 32px;
          position: relative;
          overflow: hidden;
        }

        /* ground */
        .zc-ground {
          position: absolute;
          bottom: 28px; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #FFD6A5 20%, #FFD6A5 80%, transparent);
          opacity: 0.7;
        }

        /* stars / sparkles */
        .zc-star {
          position: absolute;
          width: 5px; height: 5px;
          background: #FFB347;
          border-radius: 50%;
          opacity: 0;
          animation: twinkle 2.4s ease-in-out infinite;
        }
        .zc-star:nth-child(1) { top: 18px; left: 18%;  animation-delay: 0s; }
        .zc-star:nth-child(2) { top: 30px; left: 70%;  animation-delay: 0.8s; }
        .zc-star:nth-child(3) { top: 14px; left: 45%;  animation-delay: 1.6s; width: 4px; height: 4px; }
        @keyframes twinkle {
          0%,100% { opacity: 0; transform: scale(0.5); }
          50%      { opacity: 0.9; transform: scale(1.2); }
        }

        /* whole cat container walks across then resets */
        .zc-cat-scene {
          position: absolute;
          bottom: 30px;
          left: -90px;
          animation: catWalk 5s linear infinite;
        }
        @keyframes catWalk {
          0%   { left: -90px; }
          55%  { left: calc(100% + 10px); }   /* walk off right edge */
          56%  { left: -90px; }               /* snap back instantly */
          100% { left: -90px; }
        }

        /* cat SVG wrapper */
        .zc-cat {
          position: relative;
          width: 80px;
          height: 80px;
        }

        /* body bob while walking */
        .cat-body-group {
          animation: bodyBob 0.4s ease-in-out infinite;
          transform-origin: center bottom;
        }
        @keyframes bodyBob {
          0%,100% { transform: translateY(0px); }
          50%     { transform: translateY(-3px); }
        }

        /* tail wag */
        .cat-tail {
          transform-origin: 8px 4px;
          animation: tailWag 0.5s ease-in-out infinite alternate;
        }
        @keyframes tailWag {
          0%   { transform: rotate(-20deg); }
          100% { transform: rotate(20deg); }
        }

        /* legs walking */
        .cat-leg-fl { transform-origin: 6px 0; animation: legFL 0.4s ease-in-out infinite; }
        .cat-leg-rl { transform-origin: 6px 0; animation: legRL 0.4s ease-in-out infinite; }
        .cat-leg-fr { transform-origin: 6px 0; animation: legFR 0.4s ease-in-out infinite; }
        .cat-leg-rr { transform-origin: 6px 0; animation: legRR 0.4s ease-in-out infinite; }

        @keyframes legFL { 0%,100%{transform:rotate(-18deg)} 50%{transform:rotate(18deg)} }
        @keyframes legRL { 0%,100%{transform:rotate(18deg)}  50%{transform:rotate(-18deg)} }
        @keyframes legFR { 0%,100%{transform:rotate(18deg)}  50%{transform:rotate(-18deg)} }
        @keyframes legRR { 0%,100%{transform:rotate(-18deg)} 50%{transform:rotate(18deg)} }

        /* paw prints trail behind */
        .zc-pawprint {
          position: absolute;
          bottom: 18px;
          font-size: 13px;
          opacity: 0;
          animation: pawFade 5s linear infinite;
        }
        .zc-pawprint:nth-child(1) { left: 15%; animation-delay: 0.6s; }
        .zc-pawprint:nth-child(2) { left: 28%; animation-delay: 1.2s; }
        .zc-pawprint:nth-child(3) { left: 41%; animation-delay: 1.8s; }
        .zc-pawprint:nth-child(4) { left: 54%; animation-delay: 2.4s; }
        @keyframes pawFade {
          0%,10%  { opacity: 0; transform: scale(0.6); }
          20%,50% { opacity: 0.5; transform: scale(1); }
          70%,100%{ opacity: 0; }
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
            {/* sparkle stars */}
            <div className="zc-star" />
            <div className="zc-star" />
            <div className="zc-star" />

            {/* ground line */}
            <div className="zc-ground" />

            {/* paw print trails */}
            <span className="zc-pawprint">🐾</span>
            <span className="zc-pawprint">🐾</span>
            <span className="zc-pawprint">🐾</span>
            <span className="zc-pawprint">🐾</span>

            {/* walking cat */}
            <div className="zc-cat-scene">
              <svg width="80" height="70" viewBox="0 0 80 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* tail */}
                <g className="cat-tail" style={{position:'absolute'}}>
                  <path d="M18 42 Q6 34 8 24 Q10 16 16 20" stroke="#F4854A" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
                </g>

                <g className="cat-body-group">
                  {/* hind legs */}
                  <g className="cat-leg-rr" style={{transformOrigin:'32px 52px'}}>
                    <rect x="29" y="50" width="7" height="14" rx="3.5" fill="#F4854A"/>
                    <rect x="27" y="61" width="11" height="5" rx="2.5" fill="#E86A2A"/>
                  </g>
                  <g className="cat-leg-rl" style={{transformOrigin:'22px 52px'}}>
                    <rect x="19" y="50" width="7" height="14" rx="3.5" fill="#F4854A"/>
                    <rect x="17" y="61" width="11" height="5" rx="2.5" fill="#E86A2A"/>
                  </g>

                  {/* body */}
                  <ellipse cx="34" cy="42" rx="18" ry="13" fill="#F4854A"/>
                  {/* belly */}
                  <ellipse cx="36" cy="44" rx="10" ry="8" fill="#FFD6A5" opacity="0.7"/>

                  {/* front legs */}
                  <g className="cat-leg-fl" style={{transformOrigin:'44px 50px'}}>
                    <rect x="41" y="50" width="7" height="14" rx="3.5" fill="#F4854A"/>
                    <rect x="39" y="61" width="11" height="5" rx="2.5" fill="#E86A2A"/>
                  </g>
                  <g className="cat-leg-fr" style={{transformOrigin:'52px 50px'}}>
                    <rect x="49" y="50" width="7" height="14" rx="3.5" fill="#F4854A"/>
                    <rect x="47" y="61" width="11" height="5" rx="2.5" fill="#E86A2A"/>
                  </g>

                  {/* neck */}
                  <rect x="38" y="26" width="12" height="10" rx="5" fill="#F4854A"/>

                  {/* head */}
                  <ellipse cx="47" cy="20" rx="14" ry="12" fill="#F4854A"/>

                  {/* ears */}
                  <polygon points="36,10 33,0 43,8" fill="#F4854A"/>
                  <polygon points="37,9 35,3 42,8" fill="#FFB347"/>
                  <polygon points="56,10 59,0 49,8" fill="#F4854A"/>
                  <polygon points="55,9 57,3 50,8" fill="#FFB347"/>

                  {/* face */}
                  {/* eyes */}
                  <ellipse cx="42" cy="18" rx="3" ry="3.5" fill="#2C1A0E"/>
                  <ellipse cx="52" cy="18" rx="3" ry="3.5" fill="#2C1A0E"/>
                  {/* eye shine */}
                  <circle cx="43" cy="17" r="1" fill="white"/>
                  <circle cx="53" cy="17" r="1" fill="white"/>

                  {/* nose */}
                  <ellipse cx="47" cy="23" rx="2" ry="1.5" fill="#E86A2A"/>
                  {/* mouth */}
                  <path d="M45 24.5 Q47 27 49 24.5" stroke="#C04A1A" strokeWidth="1" fill="none" strokeLinecap="round"/>

                  {/* whiskers */}
                  <line x1="34" y1="22" x2="43" y2="23" stroke="#C49470" strokeWidth="1" opacity="0.8"/>
                  <line x1="34" y1="24" x2="43" y2="24" stroke="#C49470" strokeWidth="1" opacity="0.8"/>
                  <line x1="60" y1="22" x2="51" y2="23" stroke="#C49470" strokeWidth="1" opacity="0.8"/>
                  <line x1="60" y1="24" x2="51" y2="24" stroke="#C49470" strokeWidth="1" opacity="0.8"/>
                </g>
              </svg>
            </div>
          </div>

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
