import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../api";

export default function PostCard({ post, liked, likeCount, onLike, onCommentClick }) {
  const navigate = useNavigate();
  const college  = localStorage.getItem("college") || "PSG Tech";
  const [heartAnim, setHeartAnim] = useState(false);
  const [authorDept, setAuthorDept] = useState("");

  // Fetch the post author's actual dept from their profile
  useEffect(() => {
    async function fetchAuthorDept() {
      try {
        const data = await getProfile(post.author);
        setAuthorDept(data.dept || "");
      } catch {
        setAuthorDept("");
      }
    }
    fetchAuthorDept();
  }, [post.author]);

  // Trigger heart burst only when transitioning to liked
  useEffect(() => {
    if (liked) {
      setHeartAnim(true);
      const t = setTimeout(() => setHeartAnim(false), 900);
      return () => clearTimeout(t);
    }
  }, [liked]);

  return (
    <div style={{
      background: "rgba(255,255,255,0.78)",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
      border: "1px solid rgba(255,200,140,0.35)",
      borderRadius: 20,
      padding: "18px 20px",
      marginBottom: 16,
      boxShadow: "0 2px 16px rgba(200,120,60,0.06)",
      fontFamily: "'DM Sans', sans-serif",
      animation: "fadeUp 0.4s cubic-bezier(.22,1,.36,1) both",
    }}>
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        @keyframes heartPop {
          0%   { opacity:0;   transform:translate(-50%,-50%) scale(0.3); }
          30%  { opacity:1;   transform:translate(-50%,-50%) scale(1.4); }
          60%  { opacity:0.9; transform:translate(-50%,-50%) scale(1.1); }
          100% { opacity:0;   transform:translate(-50%,-50%) scale(0.8); }
        }
        .pc-btn { display:inline-flex; align-items:center; gap:5px; padding:6px 14px; border-radius:9px; font-size:13px; font-weight:500; cursor:pointer; background:#FFF8F2; border:1px solid rgba(255,214,165,0.5); color:#9B5B1A; transition:background 0.15s, border-color 0.15s, transform 0.1s; font-family:'DM Sans',sans-serif; }
        .pc-btn:hover { background:#FFF0DE; border-color:#F4854A; transform:translateY(-1px); }
        .pc-btn.liked { color:#E86A2A; background:#FFF0DE; border-color:#F4854A; }
        .pc-author { font-weight:500; font-size:14px; color:#2C1A0E; cursor:pointer; transition:color 0.15s; }
        .pc-author:hover { color:#F4854A; }
        .pc-dept-pill { display:inline-flex; align-items:center; gap:4px; background:#FFF0DE; border:1px solid #FFD6A5; border-radius:100px; padding:2px 8px; font-size:11px; color:#9B5B1A; font-weight:500; }
      `}</style>

      {/* Header */}
      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
        <div onClick={() => navigate(`/profile/${post.author}`)} style={{ width:40, height:40, borderRadius:"50%", background:"linear-gradient(135deg,#FFD6A5,#FFA86C)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0, border:"2px solid rgba(244,133,74,0.25)", cursor:"pointer" }}>
          🐱
        </div>
        <div>
          <div className="pc-author" onClick={() => navigate(`/profile/${post.author}`)}>@{post.author}</div>
          <div style={{ display:"flex", alignItems:"center", gap:6, marginTop:3 }}>
            {authorDept
              ? <span className="pc-dept-pill">🏫 {authorDept}</span>
              : <span style={{ fontSize:11, color:"#C4A08A" }}>{college}</span>
            }
          </div>
        </div>
      </div>

      {/* Content */}
      {post.content && <p style={{ fontSize:14, color:"#3D2010", lineHeight:1.65, marginBottom:10 }}>{post.content}</p>}

      {/* Image */}
      {post.image && <img src={post.image} alt="post" style={{ width:"100%", borderRadius:12, marginBottom:10, maxHeight:380, objectFit:"cover" }} />}

      {/* Actions */}
      <div style={{ display:"flex", gap:6, paddingTop:10, borderTop:"1px solid rgba(255,214,165,0.4)" }}>

        {/* Like button */}
        <div style={{ position:"relative", display:"inline-flex" }}>
          <button className={`pc-btn${liked ? " liked" : ""}`} onClick={() => onLike(post._id)}>
            {liked ? "❤️" : "🤍"} {likeCount}
          </button>
          {heartAnim && (
            <span style={{ position:"absolute", top:"50%", left:"50%", fontSize:42, pointerEvents:"none", zIndex:10, animation:"heartPop 0.75s cubic-bezier(.36,.07,.19,.97) forwards" }}>❤️</span>
          )}
        </div>

        {/* Comment */}
        <button className="pc-btn" onClick={() => onCommentClick(post._id)}>💬 Comment</button>

        {/* Share */}
        <button className="pc-btn" onClick={() => navigate(`/chat/${post.author}`)}>🔗 Share</button>
      </div>

      {/* Time */}
      <div style={{ fontSize:11, color:"#C4A08A", marginTop:10, textAlign:"right" }}>
        {new Date(post.createdAt).toLocaleString()}
      </div>
    </div>
  );
}
