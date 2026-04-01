import { useEffect, useState } from "react";
import { getComments, addComment } from "../api";

export default function Comments({ postId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const [replyAuthor, setReplyAuthor] = useState("");

  useEffect(() => {
    loadComments();
  }, []);

  async function loadComments() {
    const data = await getComments(postId);
    setComments(data);
  }

  async function handleSubmit() {
    if (!text.trim()) return;
    await addComment({
      postId,
      text,
      parentId: replyTo
    });
    setText("");
    setReplyTo(null);
    setReplyAuthor("");
    loadComments();
  }

  function cancelReply() {
    setReplyTo(null);
    setReplyAuthor("");
  }

  // Recursive render (Reddit-style) — logic untouched
  function renderComments(parentId = null, level = 0) {
    return comments
      .filter(c => c.parentId === parentId)
      .map(c => (
        <div key={c._id} className={`zc-comment ${level > 0 ? "zc-comment-nested" : ""}`}
          style={{ marginLeft: level * 18 }}>

          {level > 0 && <div className="zc-comment-thread-line" />}

          <div className="zc-comment-inner">
            <div className="zc-comment-avatar">{c.author?.[0]?.toUpperCase() || "🐱"}</div>
            <div className="zc-comment-body">
              <div className="zc-comment-header">
                <span className="zc-comment-author">@{c.author}</span>
                {c.createdAt && (
                  <span className="zc-comment-time">
                    {new Date(c.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                )}
              </div>
              <p className="zc-comment-text">{c.text}</p>
              <span
                className="zc-comment-reply-btn"
                onClick={() => { setReplyTo(c._id); setReplyAuthor(c.author); }}
              >
                ↩ Reply
              </span>
            </div>
          </div>

          {renderComments(c._id, level + 1)}
        </div>
      ));
  }

  return (
    <>
      <style>{`
        .zc-comments-root {
          margin-top: 4px;
          font-family: 'DM Sans', sans-serif;
        }

        /* ---- input area ---- */
        .zc-comment-input-wrap {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 16px;
        }

        .zc-reply-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #FFF0DE;
          border: 1px solid #FFD6A5;
          border-radius: 100px;
          padding: 4px 10px 4px 8px;
          font-size: 12px;
          color: #9B5B1A;
          font-weight: 500;
          width: fit-content;
          animation: chipIn 0.2s ease;
        }
        @keyframes chipIn {
          from { opacity: 0; transform: translateY(-4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .zc-reply-chip-cancel {
          cursor: pointer;
          font-size: 14px;
          color: #C4A08A;
          line-height: 1;
          margin-left: 2px;
        }
        .zc-reply-chip-cancel:hover { color: #E86A2A; }

        .zc-comment-row {
          display: flex;
          align-items: flex-end;
          gap: 8px;
        }
        .zc-comment-self-avatar {
          width: 32px; height: 32px;
          border-radius: 50%;
          background: linear-gradient(135deg, #FFD6A5, #FFA86C);
          display: flex; align-items: center; justify-content: center;
          font-size: 15px;
          flex-shrink: 0;
          margin-bottom: 2px;
        }
        .zc-comment-textarea {
          flex: 1;
          background: #FFFAF4;
          border: 1.5px solid #FFD6A5;
          border-radius: 14px;
          padding: 10px 14px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          color: #2C1A0E;
          resize: none;
          height: 44px;
          outline: none;
          transition: border-color 0.18s, box-shadow 0.18s, height 0.2s;
          line-height: 1.5;
        }
        .zc-comment-textarea::placeholder { color: #C4A08A; }
        .zc-comment-textarea:focus {
          border-color: #F4854A;
          background: #fff;
          box-shadow: 0 0 0 3px rgba(244,133,74,0.10);
          height: 72px;
        }
        .zc-comment-submit {
          width: 36px; height: 36px;
          border-radius: 50%;
          background: linear-gradient(135deg, #F4854A, #E86A2A);
          border: none;
          color: #fff;
          font-size: 16px;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 3px 10px rgba(244,133,74,0.3);
          transition: transform 0.15s, box-shadow 0.15s;
          margin-bottom: 2px;
        }
        .zc-comment-submit:hover {
          transform: scale(1.08);
          box-shadow: 0 5px 14px rgba(244,133,74,0.4);
        }

        /* ---- comment list ---- */
        .zc-comments-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .zc-comment {
          position: relative;
          animation: commentIn 0.3s cubic-bezier(.22,1,.36,1) both;
        }
        @keyframes commentIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .zc-comment-nested {
          position: relative;
        }
        .zc-comment-thread-line {
          position: absolute;
          left: -12px; top: 0; bottom: 0;
          width: 2px;
          background: linear-gradient(to bottom, #FFD6A5, transparent);
          border-radius: 1px;
        }

        .zc-comment-inner {
          display: flex;
          gap: 8px;
          align-items: flex-start;
        }

        .zc-comment-avatar {
          width: 30px; height: 30px;
          border-radius: 50%;
          background: linear-gradient(135deg, #FFD6A5, #FFA86C);
          display: flex; align-items: center; justify-content: center;
          font-size: 13px;
          font-weight: 500;
          color: #7A3D10;
          flex-shrink: 0;
          border: 1.5px solid rgba(244,133,74,0.2);
        }

        .zc-comment-body {
          flex: 1;
          background: #FFFAF4;
          border: 1px solid rgba(255,214,165,0.5);
          border-radius: 0 14px 14px 14px;
          padding: 8px 12px;
        }

        .zc-comment-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 3px;
        }
        .zc-comment-author {
          font-size: 12px;
          font-weight: 500;
          color: #9B5B1A;
        }
        .zc-comment-time {
          font-size: 11px;
          color: #C4A08A;
        }
        .zc-comment-text {
          font-size: 13px;
          color: #3D2010;
          line-height: 1.55;
          margin-bottom: 5px;
        }
        .zc-comment-reply-btn {
          font-size: 11px;
          font-weight: 500;
          color: #C4A08A;
          cursor: pointer;
          transition: color 0.15s;
          letter-spacing: 0.02em;
        }
        .zc-comment-reply-btn:hover { color: #F4854A; }

        .zc-no-comments {
          text-align: center;
          padding: 16px 0 4px;
          font-size: 13px;
          color: #C4A08A;
          font-style: italic;
          font-family: 'Fraunces', Georgia, serif;
          font-weight: 300;
        }
      `}</style>

      <div className="zc-comments-root">

        {/* ---- input area ---- */}
        <div className="zc-comment-input-wrap">
          {replyTo && (
            <div className="zc-reply-chip">
              ↩ Replying to @{replyAuthor}
              <span className="zc-reply-chip-cancel" onClick={cancelReply}>✕</span>
            </div>
          )}
          <div className="zc-comment-row">
            <div className="zc-comment-self-avatar">🐱</div>
            <textarea
              className="zc-comment-textarea"
              placeholder={replyTo ? `Reply to @${replyAuthor}...` : "Add a comment..."}
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSubmit(); } }}
            />
            <button className="zc-comment-submit" onClick={handleSubmit}>↑</button>
          </div>
        </div>

        {/* ---- comments list ---- */}
        <div className="zc-comments-list">
          {comments.filter(c => c.parentId === null).length === 0 && (
            <p className="zc-no-comments">"No comments yet. Be the first meow! 🐾"</p>
          )}
          {renderComments()}
        </div>
      </div>
    </>
  );
}
