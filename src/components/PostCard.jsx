import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { likePost } from "../api";

function getLikedFromStorage() {
  try { return JSON.parse(localStorage.getItem("likedPosts") || "{}"); }
  catch { return {}; }
}
function saveLikedToStorage(liked) {
  try { localStorage.setItem("likedPosts", JSON.stringify(liked)); }
  catch {}
}

export default function PostCard({ post, onLikeUpdate }) {
  const navigate  = useNavigate();
  const username  = localStorage.getItem("username");
  const dept      = localStorage.getItem("dept")    || "CSE";
  const college   = localStorage.getItem("college") || "PSG Tech";

  const isLikedInStorage = () => {
    const stored = getLikedFromStorage();
    return stored[post._id] || false;
  };

  const [liked, setLiked]         = useState(isLikedInStorage);
  const [likeCount, setLikeCount] = useState(Array.isArray(post.likes) ? post.likes.length : 0);
  const [heartAnim, setHeartAnim] = useState(false);
  const [loading, setLoading]     = useState(false);

  // Sync if post prop changes (e.g. parent re-fetches)
  useEffect(() => {
    const serverLiked = Array.isArray(post.likes) && post.likes.includes(username);
    const storageLiked = isLikedInStorage();
    const resolved = serverLiked || storageLiked;

    setLiked(resolved);
    setLikeCount(Array.isArray(post.likes) ? post.likes.length : 0);

    // Persist server truth into storage
    if (serverLiked) {
      const stored = getLikedFromStorage();
      saveLikedToStorage({ ...stored, [post._id]: true });
    }
  }, [post._id, post.likes?.length]);

  async function handleLike() {
    if (loading) return;
    const alreadyLiked = liked;

    // 1. Optimistic update
    const newLiked = !alreadyLiked;
    setLiked(newLiked);
    setLikeCount(c => newLiked ? c + 1 : c - 1);

    // 2. Persist to localStorage immediately
    const stored = getLikedFromStorage();
    const updated = { ...stored, [post._id]: newLiked };
    saveLikedToStorage(updated);

    // 3. Heart burst
    if (newLiked) {
      setHeartAnim(true);
      setTimeout(() => setHeartAnim(false), 900);
    }

    // 4. API — NO loadPosts after this
    try {
      setLoading(true);
      await likePost(post._id);
      if (onLikeUpdate) onLikeUpdate(post._id, newLiked);
    } catch (err) {
      console.error("LIKE ERROR:", err);
      // Revert
      setLiked(alreadyLiked);
      setLikeCount(c => alreadyLiked ? c + 1 : c - 1);
      const reverted = { ...stored, [post._id]: alreadyLiked };
      saveLikedToStorage(reverted);
    } finally {
      setLoading(false);
    }
  }

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
        .pc-action-btn { display:inline-flex; align-items:center; gap:5px; padding:6px 14px; border-radius:9px; font-size:13px; font-weight:500; cursor:pointer; background:#FFF8F2; border:1px solid rgba(255,214,165,0.5); color:#9B5B1A; transition:background 0.15s, border-color 0.15s, transform 0.1s; font-family:'DM Sans',sans-serif; }
        .pc-action-btn:hover { background:#FFF0DE; border-color:#F4854A; transform:translateY(-1px); }
        .pc-action-btn.liked { color:#E86A2A; background:#FFF0DE; border-color:#F4854A; }
        .pc-action-btn:disabled { opacity:0.7; cursor:not-allowed; transform:none; }
        .pc-author:hover { color:#F4854A; }
      `}</style>

      {/* Header */}
      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
        <div
          onClick={() => navigate(`/profile/${post.author}`)}
          style={{ width:40, height:40, borderRadius:"50%", background:"linear-gradient(135deg,#FFD6A5,#FFA86C)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0, border:"2px solid rgba(244,133,74,0.25)", cursor:"pointer" }}
        >
          🐱
        </div>
        <div>
          <div
            className="pc-author"
            onClick={() => navigate(`/profile/${post.author}`)}
            style={{ fontWeight:500, fontSize:14, color:"#2C1A0E", cursor:"pointer", transition:"color 0.15s" }}
          >
            @{post.author}
          </div>
          <div style={{ fontSize:11, color:"#C4A08A", marginTop:1 }}>{dept} · {college}</div>
        </div>
      </div>

      {/* Content */}
      {post.content && (
        <p style={{ fontSize:14, color:"#3D2010", lineHeight:1.65, marginBottom:10 }}>
          {post.content}
        </p>
      )}

      {/* Image */}
      {post.image && (
        <img src={post.image} alt="post" style={{ width:"100%", borderRadius:12, marginBottom:10, maxHeight:380, objectFit:"cover" }} />
      )}

      {/* Actions */}
      <div style={{ display:"flex", gap:6, paddingTop:10, borderTop:"1px solid rgba(255,214,165,0.4)" }}>
        {/* Like */}
        <div style={{ position:"relative", display:"inline-flex" }}>
          <button
            className={`pc-action-btn${liked ? " liked" : ""}`}
            onClick={handleLike}
            disabled={loading}
          >
            {liked ? "❤️" : "🤍"} {likeCount}
          </button>
          {heartAnim && (
            <span style={{
              position:"absolute", top:"50%", left:"50%",
              transform:"translate(-50%,-50%)",
              fontSize:42, pointerEvents:"none", zIndex:10,
              animation:"heartPop 0.75s cubic-bezier(.36,.07,.19,.97) forwards"
            }}>❤️</span>
          )}
        </div>

        {/* Comment — parent handles toggle */}
        {post.onCommentClick && (
          <button className="pc-action-btn" onClick={post.onCommentClick}>
            💬 Comment
          </button>
        )}

        {/* Share */}
        <button className="pc-action-btn" onClick={() => navigate(`/chat/${post.author}`)}>
          🔗 Share
        </button>
      </div>

      {/* Time */}
      <div style={{ fontSize:11, color:"#C4A08A", marginTop:10, textAlign:"right" }}>
        {new Date(post.createdAt).toLocaleString()}
      </div>
    </div>
  );
}
