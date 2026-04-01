import { useEffect, useState } from "react";
import { getPosts, createPost, likePost } from "../api";
import { useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";
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

  // Single source of truth for liked state — backed by localStorage
  const [likedPosts, setLikedPosts] = useState(getLikedFromStorage);

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

      // Merge server truth into localStorage
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

    // 1. Optimistic update for liked state
    const newLikedMap = { ...likedPosts, [postId]: !alreadyLiked };
    setLikedPosts(newLikedMap);
    saveLikedToStorage(newLikedMap);

    // 2. Optimistic update for post likes array (drives the count display)
    setPosts(prev => prev.map(p => {
      if (p._id !== postId) return p;
      const likes = Array.isArray(p.likes) ? p.likes : [];
      return {
        ...p,
        likes: alreadyLiked
          ? likes.filter(u => u !== username)          // unlike → remove username → count -1
          : [...new Set([...likes, username])]          // like   → add username    → count +1
      };
    }));

    // 3. API call — NO loadPosts() after (that resets optimistic state and causes -2)
    try {
      await likePost(postId);
    } catch (err) {
      console.error("LIKE ERROR:", err);
      // Revert both liked map and posts array
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
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
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
            <div key={post._id}>
              <PostCard
                post={post}
                liked={likedPosts[post._id] || false}
                likeCount={Array.isArray(post.likes) ? post.likes.length : 0}
                onLike={handleLike}
                onCommentClick={(id) => setOpenComments(openComments === id ? null : id)}
              />
              {openComments === post._id && (
                <div className="zh-comments-wrap" style={{ marginTop: -10, marginBottom: 16, background: "rgba(255,255,255,0.78)", border: "1px solid rgba(255,200,140,0.35)", borderRadius: "0 0 20px 20px", padding: "14px 20px" }}>
                  <Comments postId={post._id} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
