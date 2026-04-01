import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getComments, addComment } from "../api";

export default function Comments({ postId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const [replyAuthor, setReplyAuthor] = useState("");
  const [focused, setFocused] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadComments();
  }, []);

  async function loadComments() {
    const data = await getComments(postId);
    setComments(data);
  }

  async function handleSubmit() {
    if (!text.trim() || submitting) return;
    setSubmitting(true);
    await addComment({ postId, text, parentId: replyTo });
    setText("");
    setReplyTo(null);
    setReplyAuthor("");
    setFocused(false);
    setSubmitting(false);
    loadComments();
  }

  function cancelReply() {
    setReplyTo(null);
    setReplyAuthor("");
  }

  function getInitial(name) {
    return name ? name[0].toUpperCase() : "?";
  }

  function timeAgo(dateStr) {
    if (!dateStr) return "";
    const diff = (Date.now() - new Date(dateStr)) / 1000;
    if (diff < 60) return "just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
    return `${Math.floor(diff / 86400)}d`;
  }

  // avatar color based on username
  const avatarColors = [
    { bg: "#EEF2FF", color: "#4338CA" },
    { bg: "#FDF2F8", color: "#9D174D" },
    { bg: "#ECFDF5", color: "#065F46" },
    { bg: "#FFF7ED", color: "#92400E" },
    { bg: "#EFF6FF", color: "#1E40AF" },
  ];
  function getAvatarColor(name) {
    if (!name) return avatarColors[0];
    return avatarColors[name.charCodeAt(0) % avatarColors.length];
  }

  function renderComments(parentId = null, level = 0) {
    return comments
      .filter((c) => c.parentId === parentId)
      .map((c) => {
        const { bg, color } = getAvatarColor(c.author);
        return (
          <div key={c._id} style={{ marginLeft: level > 0 ? 28 : 0, position: "relative" }}>
            {level > 0 && (
              <div style={{
                position: "absolute",
                left: -16,
                top: 0,
                bottom: 12,
                width: 1.5,
                background: "linear-gradient(to bottom, #E5E7EB 80%, transparent)"
              }} />
            )}

            <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
              {/* Avatar */}
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  background: bg,
                  color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 600,
                  fontSize: 12,
                  flexShrink: 0,
                  cursor: "pointer",
                  border: `1.5px solid ${color}22`
                }}
                onClick={() => navigate(`/profile/${c.author}`)}
              >
                {getInitial(c.author)}
              </div>

              {/* Bubble */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  background: "#F9FAFB",
                  border: "1px solid #F3F4F6",
                  borderRadius: "0 12px 12px 12px",
                  padding: "8px 12px",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
                    <span
                      style={{ fontSize: 13, fontWeight: 600, color: "#111827", cursor: "pointer" }}
                      onClick={() => navigate(`/profile/${c.author}`)}
                    >
                      @{c.author}
                    </span>
                    <span style={{ fontSize: 11, color: "#9CA3AF" }}>{timeAgo(c.createdAt)}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: 13.5, color: "#374151", lineHeight: 1.5 }}>
                    {c.text}
                  </p>
                </div>

                <button
                  onClick={() => { setReplyTo(c._id); setReplyAuthor(c.author); }}
                  style={{
                    background: "none",
                    border: "none",
                    padding: "3px 4px",
                    marginTop: 2,
                    fontSize: 12,
                    color: "#6B7280",
                    cursor: "pointer",
                    fontWeight: 500,
                    letterSpacing: "0.01em"
                  }}
                >
                  Reply
                </button>
              </div>
            </div>

            {renderComments(c._id, level + 1)}
          </div>
        );
      });
  }

  const me = localStorage.getItem("username") || "me";
  const { bg: myBg, color: myColor } = getAvatarColor(me);

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", padding: "4px 0" }}>

      {/* Reply chip */}
      {replyTo && (
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          background: "#EFF6FF",
          border: "1px solid #BFDBFE",
          borderRadius: 100,
          padding: "4px 10px",
          fontSize: 12,
          color: "#1D4ED8",
          fontWeight: 500,
          marginBottom: 8,
        }}>
          ↩ Replying to @{replyAuthor}
          <span
            onClick={cancelReply}
            style={{ cursor: "pointer", color: "#93C5FD", fontSize: 14, lineHeight: 1, marginLeft: 2 }}
          >✕</span>
        </div>
      )}

      {/* Input */}
      <div style={{
        display: "flex",
        gap: 10,
        alignItems: "flex-end",
        marginBottom: 20,
        background: "#fff",
        border: focused ? "1.5px solid #6366F1" : "1.5px solid #E5E7EB",
        borderRadius: 14,
        padding: "8px 8px 8px 12px",
        transition: "border-color 0.15s",
        boxShadow: focused ? "0 0 0 3px rgba(99,102,241,0.08)" : "none"
      }}>
        {/* Self avatar */}
        <div style={{
          width: 28,
          height: 28,
          borderRadius: "50%",
          background: myBg,
          color: myColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 600,
          fontSize: 11,
          flexShrink: 0,
          marginBottom: 1,
          border: `1.5px solid ${myColor}22`
        }}>
          {getInitial(me)}
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
          placeholder={replyTo ? `Reply to @${replyAuthor}...` : "Write a comment..."}
          rows={1}
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            resize: "none",
            fontFamily: "inherit",
            fontSize: 13.5,
            color: "#111827",
            background: "transparent",
            lineHeight: 1.5,
            paddingTop: 4,
          }}
        />

        <button
          onClick={handleSubmit}
          disabled={!text.trim() || submitting}
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: text.trim() && !submitting ? "#6366F1" : "#E5E7EB",
            border: "none",
            color: text.trim() && !submitting ? "#fff" : "#9CA3AF",
            fontSize: 15,
            cursor: text.trim() && !submitting ? "pointer" : "default",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "background 0.15s, color 0.15s",
          }}
        >
          ↑
        </button>
      </div>

      {/* Comments list */}
      <div>
        {comments.length === 0 ? (
          <p style={{ fontSize: 13, color: "#9CA3AF", textAlign: "center", padding: "16px 0" }}>
            No comments yet — be the first!
          </p>
        ) : (
          renderComments()
        )}
      </div>
    </div>
  );
}
