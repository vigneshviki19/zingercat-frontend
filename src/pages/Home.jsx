import { useEffect, useState } from "react";
import { getPosts, createPost, likePost } from "../api";
import { useNavigate } from "react-router-dom";
import Comments from "../components/Comments";

function getLikedFromStorage() {
  try { return JSON.parse(localStorage.getItem("likedPosts") || "{}"); }
  catch { return {}; }
}
function saveLikedToStorage(liked) {
  try { localStorage.setItem("likedPosts", JSON.stringify(liked)); }
  catch {}
}

export default function Home() {
  const [posts, setPosts]               = useState([]);
  const [content, setContent]           = useState("");
  const [image, setImage]               = useState(null);
  const [loading, setLoading]           = useState(false);
  const [openComments, setOpenComments] = useState(null);
  const [likedPosts, setLikedPosts]     = useState(getLikedFromStorage); // init from localStorage
  const [heartAnim, setHeartAnim]       = useState({});

  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const dept     = localStorage.getItem("dept")    || "CSE";
  const college  = localStorage.getItem("college") || "PSG Tech";

  useEffect(() => { loadPosts(); }, []);

  async function loadPosts() {
    try {
      const data     = await getPosts();
      const postList = Array.isArray(data) ? data : [];
      setPosts(postList);

      // Merge: server is truth for liked=true, localStorage keeps it across refreshes
      const stored = getLikedFromStorage();
      const merged = { ...stored };
      postList.forEach(p => {
        if (Array.isArray(p.likes) && p.likes.includes(username)) {
          merged[p._id] = true;
        }
      });
      setLikedPosts(merged);
      saveLikedToStorage(merged);
    } catch (err) {
      console.error("LOAD POSTS ERROR:", err);
    }
  }

  async function handlePost() {
    if (!content.trim() && !image) return;
    const formData = new FormData();
    formData.append("content", content);
    if (image) formData.append("image", image);
    try {
      setLoading(true);
      await createPost(formData);
      setContent("");
      setImage(null);
      loadPosts();
    } catch { alert("Post failed"); }
    finally { setLoading(false); }
  }

  async function handleLike(postId) {
    const alreadyLiked = likedPosts[postId] || false;

    // 1. Optimistic update
    const newLiked = { ...likedPosts, [postId]: !alreadyLiked };
    setLikedPosts(newLiked);
    saveLikedToStorage(newLiked); // persist immediately so refresh remembers it

    setPosts(prev => prev.map(p => {
      if (p._id !== postId) return p;
      const likes = Array.isArray(p.likes) ? p.likes : [];
      return {
        ...p,
        likes: alreadyLiked
          ? likes.filter(u => u !== username)
          : [...new Set([...likes, username])]
      };
    }));

    // 2. Heart burst
    setHeartAnim(prev => ({ ...prev, [postId]: true }));
    setTimeout(() => setHeartAnim(prev => ({ ...prev, [postId]: false })), 900);

    // 3. API — NO loadPosts() here (causes the -2 bug)
    try {
      await likePost(postId);
    } catch (err) {
      console.error("LIKE ERROR:", err);
      // Revert on failure
      const reverted = { ...likedPosts, [postId]: alreadyLiked };
      setLikedPosts(reverted);
      saveLikedToStorage(reverted);
      setPosts(prev => prev.map(p => {
        if (p._id !== postId) return p;
        const likes = Array.isArray(p.likes) ? p.likes : [];
        return {
          ...p,
          likes: alreadyLiked
            ? [...new Set([...likes, username])]
            : likes.filter(u => u !== username)
        };
      }));
    }
  }

  function handleLogout() {
    localStorage.clear();
    navigate("/");
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,600;1,9..144,300&family=DM+Sans:wght@400;500&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        .zh-root { min-height: 100vh; background: #FDF8F2; font-family: 'DM Sans', sans-serif; }
        .zh-blob { position: fixed; border-radius: 50%; filter: blur(90px); opacity: 0.28; pointer-events: none; z-index: 0; }
        .zh-blob-1 { width: 500px; height: 500px; background: #FFD6A5; top: -100px; left: -150px; }
        .zh-blob-2 { width: 350px; height: 350px; background: #FFAAA5; bottom: -80px; right: -80px; }
        .zh-blob-3 { width: 220px; height: 220px; background: #A8DADC; top: 35%; left: 55%; opacity: 0.18; }
        .zh-nav { position: sticky; top: 0; z-index: 100; background: rgba(253,248,242,0.85); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); border-bottom: 1px solid rgba(255,200,140,0.35); padding: 0 24px; display: flex; align-items: center; justify-content: space-between; height: 58px; }
        .zh-nav-brand { font-family: 'Fraunces', Georgia, serif; font-size: 20px; font-weight: 600; color: #2C1A0E; display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
        .zh-nav-links { display: flex; align-items: center; gap: 4px; }
        .zh-nav-item { display: flex; align-items: center; gap: 5px; padding: 7px 12px; border-radius: 10px; font-size: 13px; font-weight: 500; color: #9B5B1A; cursor: pointer; transition: background 0.15s ease, color 0.15s ease; white-space: nowrap; }
        .zh-nav-item:hover { background: #FFF0DE; }
        .zh-nav-item-logout { color: #C0392B; border: 1px solid rgba(255,188,176,0.5); }
        .zh-nav-item-logout:hover { background: #FFF0EE; }
        .zh-main { position: relative; z-index: 1; max-width: 620px; margin: 28px auto; padding: 0 16px 60px; }
        .zh-create { background: rgba(255,255,255,0.78); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); border: 1px solid rgba(255,200,140,0.4); border-radius: 20px; padding: 18px 20px; margin-bottom: 24px; box-shadow: 0 4px 24px rgba(200,120,60,0.08); }
        .zh-create-header { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
        .zh-create-avatar { width: 38px; height: 38px; border-radius: 50%; background: linear-gradient(135deg, #FFD6A5, #FFA86C); display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }
        .zh-create-name { font-size: 13px; font-weight: 500; color: #9B5B1A; }
        .zh-textarea { width: 100%; background: #FFFAF4; border: 1.5px solid #FFD6A5; border-radius: 12px; padding: 12px 14px; font-family: 'DM Sans', sans-serif; font-size: 14px; color: #2C1A0E; resize: none; height: 88px; outline: none; transition: border-color 0.18s, box-shadow 0.18s; line-height: 1.5; }
        .zh-textarea::placeholder { color: #C4A08A; }
        .zh-textarea:focus { border-color: #F4854A; background: #fff; box-shadow: 0 0 0 4px rgba(244,133,74,0.10); }
        .zh-create-footer { display: flex; align-items: center; justify-content: space-between; margin-top: 10px; gap: 10px; }
        .zh-file-label { display: inline-flex; align-items: center; gap: 6px; padding: 7px 14px; background: #FFF0DE; border: 1px solid #FFD6A5; border-radius: 10px; font-size: 13px; color: #9B5B1A; font-weight: 500; cursor: pointer; transition: background 0.15s, border-color 0.15s; }
        .zh-file-label:hover { background: #FFE5C8; border-color: #F4854A; }
        .zh-file-input { display: none; }
        .zh-file-name { font-size: 12px; color: #C4A08A; max-width: 120px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .zh-post-btn { padding: 8px 22px; background: linear-gradient(135deg, #F4854A, #E86A2A); color: #fff; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500; border: none; border-radius: 10px; cursor: pointer; box-shadow: 0 3px 12px rgba(244,133,74,0.3); transition: transform 0.15s, box-shadow 0.15s, opacity 0.15s; white-space: nowrap; }
        .zh-post-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 18px rgba(244,133,74,0.4); }
        .zh-post-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .zh-feed-label { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; }
        .zh-feed-label-line { flex: 1; height: 1px; background: #FFD6A5; opacity: 0.6; }
        .zh-feed-label-text { font-size: 11px; color: #C4A08A; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 500; }
        .zh-empty { text-align: center; padding: 48px 20px; color: #C4A08A; }
        .zh-empty-icon { font-size: 40px; margin-bottom: 12px; }
        .zh-empty-text { font-family: 'Fraunces', Georgia, serif; font-style: italic; font-size: 15px; }
        .zh-post { background: rgba(255,255,255,0.78); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); border: 1px solid rgba(255,200,140,0.35); border-radius: 20px; padding: 18px 20px; margin-bottom: 16px; box-shadow: 0 2px 16px rgba(200,120,60,0.06); animation: fadeUp 0.4s cubic-bezier(.22,1,.36,1) both; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        .zh-post-header { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
        .zh-post-avatar { width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, #FFD6A5, #FFA86C); display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0; border: 2px solid rgba(244,133,74,0.25); cursor: pointer; }
        .zh-post-author { font-weight: 500; font-size: 14px; color: #2C1A0E; cursor: pointer; }
        .zh-post-author:hover { color: #F4854A; }
        .zh-post-meta { font-size: 11px; color: #C4A08A; margin-top: 1px; }
        .zh-post-content { font-size: 14px; color: #3D2010; line-height: 1.65; margin-bottom: 10px; }
        .zh-post-image { width: 100%; border-radius: 12px; margin-bottom: 10px; max-height: 380px; object-fit: cover; }
        .zh-post-actions { display: flex; gap: 6px; padding-top: 10px; border-top: 1px solid rgba(255,214,165,0.4); }
        .zh-action-btn { display: inline-flex; align-items: center; gap: 5px; padding: 6px 14px; border-radius: 9px; font-size: 13px; font-weight: 500; cursor: pointer; background: #FFF8F2; border: 1px solid rgba(255,214,165,0.5); color: #9B5B1A; transition: background 0.15s, border-color 0.15s, transform 0.1s; }
        .zh-action-btn:hover { background: #FFF0DE; border-color: #F4854A; transform: translateY(-1px); }
        .zh-action-btn-like:hover { color: #E86A2A; }
        .zh-action-btn-like.liked { color: #E86A2A; background: #FFF0DE; border-color: #F4854A; }
        .zh-post-time { font-size: 11px; color: #C4A08A; margin-top: 10px; text-align: right; }
        .zh-like-wrap { position: relative; display: inline-flex; }
        .zh-heart-burst { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 42px; pointer-events: none; opacity: 0; z-index: 10; }
        .zh-heart-burst.active { animation: heartPop 0.75s cubic-bezier(.36,.07,.19,.97) forwards; }
        @keyframes heartPop {
          0%   { opacity: 0;   transform: translate(-50%, -50%) scale(0.3); }
          30%  { opacity: 1;   transform: translate(-50%, -50%) scale(1.4); }
          60%  { opacity: 0.9; transform: translate(-50%, -50%) scale(1.1); }
          100% { opacity: 0;   transform: translate(-50%, -50%) scale(0.8); }
        }
        .zh-comments-wrap { margin-top: 14px; padding-top: 14px; border-top: 1px solid rgba(255,214,165,0.4); }
      `}</style>

      <div className="zh-root">
        <div className="zh-blob zh-blob-1" />
        <div className="zh-blob zh-blob-2" />
        <div className="zh-blob zh-blob-3" />

        <nav className="zh-nav">
          <div className="zh-nav-brand">🐱 Zinger Cat</div>
          <div className="zh-nav-links">
            <span className="zh-nav-item" onClick={() => navigate(`/profile/${username}`)}>👤 Profile</span>
            <span className="zh-nav-item" onClick={() => navigate("/search")}>🔍 Search</span>
            <span className="zh-nav-item" onClick={() => navigate("/friends")}>👥 Community</span>
            <span className="zh-nav-item" onClick={() => navigate("/chat")}>💬 Messages</span>
            <span className="zh-nav-item" onClick={() => navigate("/notifications")}>🔔 Alerts</span>
            <span className="zh-nav-item zh-nav-item-logout" onClick={handleLogout}>🚪 Logout</span>
          </div>
        </nav>

        <div className="zh-main">
          <div className="zh-create">
            <div className="zh-create-header">
              <div className="zh-create-avatar">🐱</div>
              <div className="zh-create-name">@{username} · {dept}</div>
            </div>
            <textarea className="zh-textarea" placeholder="Speak your mind, meow... 🐾"
              value={content} onChange={(e) => setContent(e.target.value)} />
            <div className="zh-create-footer">
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label className="zh-file-label" htmlFor="zh-img-input">📷 Photo</label>
                <input id="zh-img-input" className="zh-file-input" type="file" accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])} />
                {image && <span className="zh-file-name">{image.name}</span>}
              </div>
              <button className="zh-post-btn" onClick={handlePost} disabled={loading}>
                {loading ? "Posting..." : "🐾 Post"}
              </button>
            </div>
          </div>

          <div className="zh-feed-label">
            <div className="zh-feed-label-line" />
            <span className="zh-feed-label-text">Latest posts</span>
            <div className="zh-feed-label-line" />
          </div>

          {posts.length === 0 && (
            <div className="zh-empty">
              <div className="zh-empty-icon">🐾</div>
              <p className="zh-empty-text">"No posts yet. Be the first cat to speak!"</p>
            </div>
          )}

          {posts.map((post) => (
            <div key={post._id} className="zh-post">
              <div className="zh-post-header">
                <div className="zh-post-avatar" onClick={() => navigate(`/profile/${post.author}`)}>🐱</div>
                <div>
                  <div className="zh-post-author" onClick={() => navigate(`/profile/${post.author}`)}>
                    @{post.author}
                  </div>
                  <div className="zh-post-meta">{dept} · {college}</div>
                </div>
              </div>
              {post.content && <p className="zh-post-content">{post.content}</p>}
              {post.image && <img src={post.image} alt="post" className="zh-post-image" />}
              <div className="zh-post-actions">
                <div className="zh-like-wrap">
                  <button
                    className={`zh-action-btn zh-action-btn-like${likedPosts[post._id] ? " liked" : ""}`}
                    onClick={() => handleLike(post._id)}
                  >
                    {likedPosts[post._id] ? "❤️" : "🤍"} {Array.isArray(post.likes) ? post.likes.length : 0}
                  </button>
                  <span className={`zh-heart-burst${heartAnim[post._id] ? " active" : ""}`}>❤️</span>
                </div>
                <button className="zh-action-btn"
                  onClick={() => setOpenComments(openComments === post._id ? null : post._id)}>
                  💬 Comment
                </button>
                <button className="zh-action-btn" onClick={() => navigate(`/chat/${post.author}`)}>
                  🔗 Share
                </button>
              </div>
              {openComments === post._id && (
                <div className="zh-comments-wrap">
                  <Comments postId={post._id} />
                </div>
              )}
              <div className="zh-post-time">{new Date(post.createdAt).toLocaleString()}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
