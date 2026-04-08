import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import io from "socket.io-client";

const socket = io("https://zingercat-backend.onrender.com");

export default function Chat() {
  const { username } = useParams();
  const me = localStorage.getItem("username");
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });
    return () => socket.off("receiveMessage");
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function sendMessage() {
    if (!text.trim()) return;
    const msg = { from: me, to: username, message: text };
    socket.emit("sendMessage", msg);
    setMessages((prev) => [...prev, msg]);
    setText("");
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,600;1,9..144,300&family=DM+Sans:wght@400;500&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }

        .zc-root {
          min-height: 100vh;
          background: #FDF8F2;
          font-family: 'DM Sans', sans-serif;
          display: flex;
          flex-direction: column;
        }

        /* blobs */
        .zc-blob { position: fixed; border-radius: 50%; filter: blur(90px); opacity: 0.28; pointer-events: none; z-index: 0; }
        .zc-blob-1 { width: 500px; height: 500px; background: #FFD6A5; top: -100px; left: -150px; }
        .zc-blob-2 { width: 350px; height: 350px; background: #FFAAA5; bottom: -80px; right: -80px; }
        .zc-blob-3 { width: 220px; height: 220px; background: #A8DADC; top: 35%; left: 55%; opacity: 0.18; }

        /* nav */
        .zc-nav {
          position: sticky; top: 0; z-index: 100;
          background: rgba(253,248,242,0.85);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-bottom: 1px solid rgba(255,200,140,0.35);
          padding: 0 24px;
          display: flex; align-items: center; justify-content: space-between;
          height: 58px;
          flex-shrink: 0;
        }
        .zc-nav-brand {
          font-family: 'Fraunces', Georgia, serif;
          font-size: 20px; font-weight: 600; color: #2C1A0E;
          display: flex; align-items: center; gap: 8px;
        }
        .zc-nav-links { display: flex; align-items: center; gap: 4px; }
        .zc-nav-item {
          display: flex; align-items: center; gap: 5px;
          padding: 7px 12px; border-radius: 10px;
          font-size: 13px; font-weight: 500; color: #9B5B1A;
          cursor: pointer;
          transition: background 0.15s ease;
          white-space: nowrap;
        }
        .zc-nav-item:hover { background: #FFF0DE; }
        .zc-nav-item-active { background: #FFF0DE; color: #F4854A; font-weight: 600; }

        /* chat layout */
        .zc-layout {
          position: relative; z-index: 1;
          flex: 1;
          max-width: 620px;
          width: 100%;
          margin: 28px auto;
          padding: 0 16px 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          animation: fadeUp 0.45s cubic-bezier(.22,1,.36,1) both;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* chat header card */
        .zc-header-card {
          background: rgba(255,255,255,0.78);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(255,200,140,0.4);
          border-radius: 20px;
          padding: 14px 18px;
          display: flex; align-items: center; gap: 12px;
          box-shadow: 0 4px 24px rgba(200,120,60,0.08);
        }
        .zc-peer-avatar {
          width: 44px; height: 44px; border-radius: 50%;
          background: linear-gradient(135deg, #FFD6A5, #FFA86C);
          display: flex; align-items: center; justify-content: center;
          font-size: 20px; flex-shrink: 0;
          border: 2px solid rgba(244,133,74,0.2);
        }
        .zc-peer-name {
          font-size: 14px; font-weight: 500; color: #2C1A0E;
        }
        .zc-peer-sub {
          font-size: 12px; color: #C4A08A;
          font-family: 'Fraunces', Georgia, serif;
          font-style: italic; font-weight: 300;
        }

        /* messages area */
        .zc-messages {
          flex: 1;
          background: rgba(255,255,255,0.78);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(255,200,140,0.4);
          border-radius: 20px;
          padding: 16px;
          overflow-y: auto;
          min-height: 360px;
          max-height: 52vh;
          display: flex;
          flex-direction: column;
          gap: 10px;
          box-shadow: 0 4px 24px rgba(200,120,60,0.06);
        }

        /* empty state */
        .zc-empty {
          flex: 1;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 8px; color: #C4A08A;
          padding: 32px 0;
        }
        .zc-empty-icon { font-size: 36px; }
        .zc-empty-text {
          font-family: 'Fraunces', Georgia, serif;
          font-style: italic; font-size: 14px; color: #B97B4A;
        }

        /* bubble */
        .zc-bubble-row {
          display: flex;
          animation: fadeUp 0.25s cubic-bezier(.22,1,.36,1) both;
        }
        .zc-bubble-row.mine { justify-content: flex-end; }
        .zc-bubble-row.theirs { justify-content: flex-start; }

        .zc-bubble {
          max-width: 72%;
          padding: 10px 14px;
          border-radius: 18px;
          font-size: 14px; line-height: 1.5;
          word-break: break-word;
        }
        .zc-bubble.mine {
          background: linear-gradient(135deg, #F4854A, #E86A2A);
          color: #fff;
          border-bottom-right-radius: 6px;
          box-shadow: 0 3px 12px rgba(244,133,74,0.28);
        }
        .zc-bubble.theirs {
          background: #FFF0DE;
          color: #2C1A0E;
          border: 1px solid #FFD6A5;
          border-bottom-left-radius: 6px;
        }
        .zc-bubble-sender {
          font-size: 11px; font-weight: 500;
          margin-bottom: 3px;
          opacity: 0.75;
        }

        /* input area */
        .zc-input-card {
          background: rgba(255,255,255,0.78);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(255,200,140,0.4);
          border-radius: 20px;
          padding: 12px 14px;
          display: flex; align-items: center; gap: 10px;
          box-shadow: 0 4px 24px rgba(200,120,60,0.08);
        }
        .zc-input {
          flex: 1;
          background: #FFFAF4;
          border: 1.5px solid #FFD6A5;
          border-radius: 12px;
          padding: 10px 14px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px; color: #2C1A0E;
          outline: none;
          transition: border-color 0.18s, box-shadow 0.18s, background 0.18s;
        }
        .zc-input::placeholder { color: #C4A08A; }
        .zc-input:focus {
          border-color: #F4854A;
          background: #fff;
          box-shadow: 0 0 0 4px rgba(244,133,74,0.10);
        }
        .zc-send-btn {
          padding: 10px 20px;
          background: linear-gradient(135deg, #F4854A, #E86A2A);
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px; font-weight: 500;
          border: none; border-radius: 12px;
          cursor: pointer;
          box-shadow: 0 3px 12px rgba(244,133,74,0.3);
          transition: transform 0.15s, box-shadow 0.15s;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .zc-send-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 18px rgba(244,133,74,0.4); }
        .zc-send-btn:active { transform: translateY(0); }
      `}</style>

      <div className="zc-root">
        <div className="zc-blob zc-blob-1" />
        <div className="zc-blob zc-blob-2" />
        <div className="zc-blob zc-blob-3" />

        {/* nav */}
        <nav className="zc-nav">
          <div className="zc-nav-brand">🐱 Zinger Cat</div>
          <div className="zc-nav-links">
            <span className="zc-nav-item" onClick={() => navigate(`/profile/${me}`)}>👤 Profile</span>
            <span className="zc-nav-item" onClick={() => navigate("/search")}>🔍 Search</span>
            <span className="zc-nav-item" onClick={() => navigate("/friends")}>👥 Community</span>
            <span className="zc-nav-item zc-nav-item-active">💬 Messages</span>
            <span className="zc-nav-item" onClick={() => navigate("/notifications")}>🔔 Alerts</span>
            <span className="zc-nav-item" onClick={() => navigate("/home")}>🏠 Home</span>
          </div>
        </nav>

        <div className="zc-layout">

          {/* chat header */}
          <div className="zc-header-card">
            <div className="zc-peer-avatar">🐱</div>
            <div>
              <div className="zc-peer-name">@{username}</div>
              <div className="zc-peer-sub">"meowing in real time"</div>
            </div>
          </div>

          {/* messages */}
          <div className="zc-messages">
            {messages.length === 0 && (
              <div className="zc-empty">
                <div className="zc-empty-icon">🐾</div>
                <p className="zc-empty-text">"Send the first meow!"</p>
              </div>
            )}
            {messages.map((m, i) => {
              const isMine = m.from === me;
              return (
                <div key={i} className={`zc-bubble-row ${isMine ? "mine" : "theirs"}`}>
                  <div className={`zc-bubble ${isMine ? "mine" : "theirs"}`}>
                    {!isMine && <div className="zc-bubble-sender">@{m.from}</div>}
                    {m.message}
                  </div>
                </div>
              );
            })}
            <div ref={bottomRef} />
          </div>

          {/* input */}
          <div className="zc-input-card">
            <input
              className="zc-input"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message... 🐾"
            />
            <button className="zc-send-btn" onClick={sendMessage}>🐾 Send</button>
          </div>

        </div>
      </div>
    </>
  );
}
