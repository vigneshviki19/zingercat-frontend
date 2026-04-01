import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getProfile,
  sendFriendRequest,
  getFriends,
  getFriendRequests,
  getPosts
} from "../api";

const DEFAULT_AVATAR = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

export default function Profile() {
  const { username } = useParams();
  const navigate     = useNavigate();
  const myUsername   = localStorage.getItem("username");

  const [profile, setProfile]     = useState(null);
  const [status, setStatus]       = useState("none"); // none | requested | friends
  const [userPosts, setUserPosts]  = useState([]);
  const [showPosts, setShowPosts]  = useState(false);
  const [postsLoading, setPostsLoading] = useState(false);

  useEffect(() => {
    loadProfile();
    checkFriendStatus();
    setShowPosts(false); // reset when navigating to different profile
  }, [username]);

  async function loadProfile() {
    try {
      const data = await getProfile(username);
      setProfile(data);
    } catch (err) {
      console.error("PROFILE LOAD ERROR:", err);
    }
  }

  async function checkFriendStatus() {
    if (username === myUsername) return;
    try {
      const friends = await getFriends();
      if (friends.some(f => f.username === username)) { setStatus("friends"); return; }
      const requests = await getFriendRequests();
      if (requests.some(r => r.username === myUsername)) setStatus("requested");
    } catch (err) {
      console.error("FRIEND STATUS ERROR:", err);
    }
  }

  async function handleAddFriend() {
    try {
      await sendFriendRequest(username);
      setStatus("requested");
    } catch { alert("Failed to send request"); }
  }

  async function handlePostsClick() {
    if (showPosts) { setShowPosts(false); return; }
    try {
      setPostsLoading(true);
      setShowPosts(true);
      const all = await getPosts();
      const filtered = (Array.isArray(all) ? all : []).filter(p => p.author === username);
      setUserPosts(filtered);
    } catch (err) {
      console.error("USER POSTS ERROR:", err);
    } finally {
      setPostsLoading(false);
    }
  }

  if (!profile) return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,600;1,9..144,300&family=DM+Sans:wght@400;500&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        .zpr-loading { min-height: 100vh; background: #FDF8F2; display: flex; align-items: center; justify-content: center; font-family: 'DM Sans', sans-serif; color: #B97B4A; gap: 10px; font-size: 15px; }
        .zpr-spin { width: 20px; height: 20px; border: 2.5px solid #FFD6A5; border-top-color: #F4854A; border-radius: 50%; animation: spin 0.7s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
      <div className="zpr-loading"><div className="zpr-spin" />Loading profile...</div>
    </>
  );

  const isMe = profile.username === myUsername;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,600;1,9..144,300&family=DM+Sans:wght@400;500&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        .zpr-root { min-height: 100vh; background: #FDF8F2; font-family: 'DM Sans', sans-serif; position: relative; overflow-x: hidden; }
        .zpr-blob { position: fixed; border-radius: 50%; filter: blur(80px); opacity: 0.35; pointer-events: none; z-index: 0; }
        .zpr-blob-1 { width: 420px; height: 420px; background: #FFD6A5; top: -80px; left: -120px; }
        .zpr-blob-2 { width: 300px; height: 300px; background: #FFAAA5; bottom: -60px; right: -80px; }
        .zpr-blob-3 { width: 200px; height: 200px; background: #A8DADC; top: 40%; left: 60%; opacity: 0.2; }
        .zpr-topbar { position: relative; z-index: 10; display: flex; justify-content: space-between; align-items: center; padding: 18px 24px; background: rgba(255,255,255,0.6); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border-bottom: 1px solid rgba(255,200,140,0.3); }
        .zpr-nav-brand { font-family: 'Fraunces', Georgia, serif; font-size: 20px; font-weight: 600; color: #2C1A0E; display: flex; align-items: center; gap: 8px; }
        .zpr-nav-btn { display: inline-flex; align-items: center; gap: 6px; padding: 8px 16px; border-radius: 10px; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500; cursor: pointer; transition: all 0.15s ease; border: 1.5px solid #FFD6A5; background: rgba(255,255,255,0.7); color: #9B5B1A; }
        .zpr-nav-btn:hover { background: #FFF0DE; border-color: #F4854A; transform: translateY(-1px); }
        .zpr-nav-btn-primary { background: linear-gradient(135deg, #F4854A, #E86A2A); color: #fff; border-color: transparent; box-shadow: 0 3px 12px rgba(244,133,74,0.3); }
        .zpr-nav-btn-primary:hover { background: linear-gradient(135deg, #F4854A, #E86A2A); color: #fff; border-color: transparent; box-shadow: 0 6px 18px rgba(244,133,74,0.4); }
        .zpr-content { position: relative; z-index: 1; max-width: 560px; margin: 36px auto; padding: 0 16px 60px; animation: fadeUp 0.65s cubic-bezier(.22,1,.36,1) both; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        .zpr-card { background: rgba(255,255,255,0.78); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(255,200,140,0.4); border-radius: 28px; overflow: hidden; box-shadow: 0 8px 48px rgba(200,120,60,0.10), 0 1px 0 rgba(255,255,255,0.9) inset; }
        .zpr-banner { height: 110px; background: linear-gradient(135deg, #FFD6A5 0%, #FFA86C 50%, #FFAAA5 100%); position: relative; }
        .zpr-banner-pattern { position: absolute; inset: 0; background-image: radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px); background-size: 20px 20px; }
        .zpr-avatar-wrap { display: flex; justify-content: center; margin-top: -52px; margin-bottom: 16px; position: relative; z-index: 2; }
        .zpr-avatar-ring { width: 104px; height: 104px; border-radius: 50%; background: linear-gradient(135deg, #F4854A, #FFD6A5); padding: 3px; box-shadow: 0 4px 20px rgba(244,133,74,0.35); }
        .zpr-avatar { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; background: #fff; display: block; }
        .zpr-body { padding: 0 28px 28px; text-align: center; }
        .zpr-username { font-family: 'Fraunces', Georgia, serif; font-size: 22px; font-weight: 600; color: #2C1A0E; letter-spacing: -0.3px; margin-bottom: 4px; }
        .zpr-name { font-size: 14px; color: #6B4226; margin-bottom: 10px; font-weight: 500; }
        .zpr-pills { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; margin-bottom: 16px; }
        .zpr-pill { display: inline-flex; align-items: center; gap: 5px; background: #FFF0DE; border: 1px solid #FFD6A5; border-radius: 100px; padding: 5px 12px; font-size: 12px; color: #9B5B1A; font-weight: 500; }
        .zpr-bio { font-size: 14px; color: #6B4226; font-style: italic; font-family: 'Fraunces', Georgia, serif; font-weight: 300; line-height: 1.6; margin-bottom: 20px; padding: 12px 16px; background: linear-gradient(145deg, #FFF8F0, #FFF2E0); border-radius: 12px; border: 1px solid rgba(255,214,165,0.5); }
        .zpr-divider { height: 1px; background: #FFD6A5; margin: 0 0 20px; opacity: 0.5; }
        .zpr-friend-btn { display: inline-flex; align-items: center; gap: 8px; padding: 11px 24px; border-radius: 12px; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500; cursor: pointer; transition: all 0.15s ease; margin-bottom: 20px; }
        .zpr-friend-btn-add { background: linear-gradient(135deg, #F4854A, #E86A2A); color: #fff; border: none; box-shadow: 0 4px 16px rgba(244,133,74,0.35); }
        .zpr-friend-btn-add:hover { transform: translateY(-2px); box-shadow: 0 8px 22px rgba(244,133,74,0.45); }
        .zpr-friend-btn-sent { background: #FFF0DE; color: #B97B4A; border: 1.5px solid #FFD6A5; cursor: default; }
        .zpr-friend-btn-friends { background: #E8F7EE; color: #2E7D4F; border: 1.5px solid #A8E0BC; cursor: default; }
        .zpr-stats { display: flex; justify-content: center; gap: 16px; }
        .zpr-stat { flex: 1; max-width: 140px; padding: 14px 12px; background: linear-gradient(145deg, #FFF8F0, #FFF2E0); border: 1px solid #FFD6A5; border-radius: 14px; text-align: center; cursor: pointer; transition: all 0.15s ease; }
        .zpr-stat:hover { transform: translateY(-2px); box-shadow: 0 4px 16px rgba(244,133,74,0.2); border-color: #F4854A; }
        .zpr-stat.active { background: linear-gradient(145deg, #FFF0DE, #FFE5C8); border-color: #F4854A; box-shadow: 0 4px 16px rgba(244,133,74,0.2); }
        .zpr-stat-num { font-family: 'Fraunces', Georgia, serif; font-size: 26px; font-weight: 600; color: #F4854A; line-height: 1; margin-bottom: 4px; }
        .zpr-stat-label { font-size: 11px; color: #C4A08A; text-transform: uppercase; letter-spacing: 0.07em; font-weight: 500; }

        /* posts section */
        .zpr-posts-section { margin-top: 20px; }
        .zpr-posts-header { font-family: 'Fraunces', Georgia, serif; font-size: 16px; font-weight: 600; color: #2C1A0E; margin-bottom: 14px; display: flex; align-items: center; gap: 8px; }
        .zpr-post-card { background: rgba(255,255,255,0.85); border: 1px solid rgba(255,200,140,0.4); border-radius: 18px; padding: 16px 18px; margin-bottom: 12px; box-shadow: 0 2px 12px rgba(200,120,60,0.06); animation: fadeUp 0.3s cubic-bezier(.22,1,.36,1) both; }
        .zpr-post-content { font-size: 14px; color: #3D2010; line-height: 1.65; margin-bottom: 10px; }
        .zpr-post-image { width: 100%; border-radius: 10px; max-height: 300px; object-fit: cover; margin-bottom: 10px; }
        .zpr-post-footer { display: flex; align-items: center; justify-content: space-between; }
        .zpr-post-likes { display: inline-flex; align-items: center; gap: 5px; font-size: 13px; color: #9B5B1A; font-weight: 500; }
        .zpr-post-time { font-size: 11px; color: #C4A08A; }
        .zpr-empty-posts { text-align: center; padding: 32px 20px; color: #C4A08A; }
        .zpr-empty-posts-icon { font-size: 32px; margin-bottom: 8px; }
        .zpr-empty-posts-text { font-family: 'Fraunces', Georgia, serif; font-style: italic; font-size: 14px; }
        .zpr-posts-spinner { display: flex; align-items: center; justify-content: center; gap: 8px; padding: 24px; color: #B97B4A; font-size: 14px; }
        .zpr-spin { width: 18px; height: 18px; border: 2px solid #FFD6A5; border-top-color: #F4854A; border-radius: 50%; animation: spin 0.7s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <div className="zpr-root">
        <div className="zpr-blob zpr-blob-1" />
        <div className="zpr-blob zpr-blob-2" />
        <div className="zpr-blob zpr-blob-3" />

        <div className="zpr-topbar">
          <div className="zpr-nav-brand">🐱 Zinger Cat</div>
          <div style={{ display: "flex", gap: 10 }}>
            <button className="zpr-nav-btn" onClick={() => navigate("/home")}>🏠 Home</button>
            {isMe && (
              <button className="zpr-nav-btn zpr-nav-btn-primary" onClick={() => navigate("/edit-profile")}>
                ✏️ Edit Profile
              </button>
            )}
          </div>
        </div>

        <div className="zpr-content">
          <div className="zpr-card">
            <div className="zpr-banner"><div className="zpr-banner-pattern" /></div>

            <div className="zpr-avatar-wrap">
              <div className="zpr-avatar-ring">
                <img src={profile.profilePic || DEFAULT_AVATAR} alt="profile" className="zpr-avatar" />
              </div>
            </div>

            <div className="zpr-body">
              <p className="zpr-username">@{profile.username}</p>
              {profile.name && <p className="zpr-name">{profile.name}</p>}

              <div className="zpr-pills">
                {profile.dept && <span className="zpr-pill">🏫 {profile.dept}</span>}
                {profile.startYear && <span className="zpr-pill">📅 {profile.startYear} – {profile.endYear}</span>}
              </div>

              {profile.about && <p className="zpr-bio">"{profile.about}"</p>}

              <div className="zpr-divider" />

              {!isMe && (
                <div style={{ marginBottom: 16 }}>
                  {status === "friends"   && <button className="zpr-friend-btn zpr-friend-btn-friends">✅ Friends</button>}
                  {status === "requested" && <button className="zpr-friend-btn zpr-friend-btn-sent">⏳ Request Sent</button>}
                  {status === "none"      && <button className="zpr-friend-btn zpr-friend-btn-add" onClick={handleAddFriend}>➕ Add Friend</button>}
                </div>
              )}

              <div className="zpr-stats">
                {/* Friends stat → navigate to friends page */}
                <div className="zpr-stat" onClick={() => navigate("/friends")}>
                  <div className="zpr-stat-num">{profile.friends?.length || 0}</div>
                  <div className="zpr-stat-label">👥 Friends</div>
                </div>

                {/* Posts stat → toggle posts below */}
                <div className={`zpr-stat${showPosts ? " active" : ""}`} onClick={handlePostsClick}>
                  <div className="zpr-stat-num">{profile.postsCount || 0}</div>
                  <div className="zpr-stat-label">📝 {showPosts ? "Hide Posts" : "Posts"}</div>
                </div>
              </div>
            </div>
          </div>

          {/* ── POSTS SECTION ── */}
          {showPosts && (
            <div className="zpr-posts-section">
              <div className="zpr-posts-header">
                📝 {isMe ? "Your" : `@${username}'s`} Posts
              </div>

              {postsLoading ? (
                <div className="zpr-posts-spinner">
                  <div className="zpr-spin" /> Loading posts...
                </div>
              ) : userPosts.length === 0 ? (
                <div className="zpr-empty-posts">
                  <div className="zpr-empty-posts-icon">🐾</div>
                  <p className="zpr-empty-posts-text">No posts yet.</p>
                </div>
              ) : (
                userPosts.map(post => (
                  <div key={post._id} className="zpr-post-card">
                    {post.content && <p className="zpr-post-content">{post.content}</p>}
                    {post.image && <img src={post.image} alt="post" className="zpr-post-image" />}
                    <div className="zpr-post-footer">
                      <span className="zpr-post-likes">
                        ❤️ {Array.isArray(post.likes) ? post.likes.length : 0} likes
                      </span>
                      <span className="zpr-post-time">
                        {new Date(post.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
