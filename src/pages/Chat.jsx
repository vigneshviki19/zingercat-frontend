import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFriends } from "../api";
import io from "socket.io-client";

const socket = io("https://zingercat-backend.onrender.com");

export default function Chat() {
    const me = localStorage.getItem("username");
    const navigate = useNavigate();
    const [friends, setFriends] = useState([]);
    const [unreadMessages, setUnreadMessages] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadFriends() {
            try {
                const data = await getFriends();
                setFriends(data || []);
            } catch (err) {
                console.error("Failed to load friends:", err);
            } finally {
                setLoading(false);
            }
        }
        loadFriends();

        // 🔥 Tell backend this user is online
        socket.emit("userOnline", me);
        console.log("📡 Emitted userOnline:", me);

    }, [me]);

    // Listen for unread alerts
    useEffect(() => {
        socket.on("unreadAlert", (alert) => {
            console.log("🔔 Unread Alert:", alert);
            setUnreadMessages((prev) => ({
                ...prev,
                [alert.sender]: (prev[alert.sender] || 0) + 1,
            }));
        });

        return () => socket.off("unreadAlert");
    }, []);

    const handleFriendClick = (friendUsername) => {
        setUnreadMessages((prev) => ({
            ...prev,
            [friendUsername]: 0,
        }));
        navigate(`/chat/${friendUsername}`);
    };

    return (
        <>
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,600;1,9..144,300&family=DM+Sans:wght@400;500&display=swap'); * { margin: 0; padding: 0; box-sizing: border-box; } .zc-root { min-height: 100vh; background: #FDF8F2; font-family: 'DM Sans', sans-serif; display: flex; flex-direction: column; } .zc-blob { position: fixed; border-radius: 50%; filter: blur(90px); opacity: 0.28; pointer-events: none; z-index: 0; } .zc-blob-1 { width: 500px; height: 500px; background: #FFD6A5; top: -100px; left: -150px; } .zc-blob-2 { width: 350px; height: 350px; background: #FFAAA5; bottom: -80px; right: -80px; } .zc-blob-3 { width: 220px; height: 220px; background: #A8DADC; top: 35%; left: 55%; opacity: 0.18; } .zc-nav { position: sticky; top: 0; z-index: 100; background: rgba(253,248,242,0.85); backdrop-filter: blur(14px); border-bottom: 1px solid rgba(255,200,140,0.35); padding: 0 24px; display: flex; align-items: center; justify-content: space-between; height: 58px; flex-shrink: 0; } .zc-nav-brand { font-family: 'Fraunces', Georgia, serif; font-size: 20px; font-weight: 600; color: #2C1A0E; display: flex; align-items: center; gap: 8px; } .zc-nav-links { display: flex; align-items: center; gap: 4px; } .zc-nav-item { display: flex; align-items: center; gap: 5px; padding: 7px 12px; border-radius: 10px; font-size: 13px; font-weight: 500; color: #9B5B1A; cursor: pointer; transition: background 0.15s ease; } .zc-nav-item:hover { background: #FFF0DE; } .zc-nav-item-active { background: #FFF0DE; color: #F4854A; font-weight: 600; } .zc-container { position: relative; z-index: 1; flex: 1; display: flex; max-width: 1200px; width: 100%; margin: 0 auto; gap: 12px; padding: 16px; } .zc-sidebar { width: 280px; background: rgba(255,255,255,0.78); backdrop-filter: blur(14px); border: 1px solid rgba(255,200,140,0.4); border-radius: 20px; padding: 12px; overflow-y: auto; max-height: calc(100vh - 100px); box-shadow: 0 4px 24px rgba(200,120,60,0.08); } .zc-sidebar-title { font-size: 14px; font-weight: 600; color: #2C1A0E; padding: 8px 12px; font-family: 'Fraunces'; } .zc-friend-item { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 12px; cursor: pointer; transition: all 0.15s; background: #FFFAF4; border: 1px solid rgba(255,200,140,0.2); } .zc-friend-item:hover { background: #FFF0DE; transform: translateX(3px); border-color: rgba(244,133,74,0.3); } .zc-friend-avatar { width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, #FFD6A5, #FFA86C); display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; } .zc-friend-info { flex: 1; min-width: 0; } .zc-friend-name { font-size: 13px; font-weight: 500; color: #2C1A0E; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; } .zc-unread-badge { min-width: 20px; height: 20px; background: #E74C3C; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 600; flex-shrink: 0; box-shadow: 0 2px 8px rgba(231,76,60,0.4); animation: pulse 0.5s ease-in-out; } @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.1); } } .zc-empty-friends { text-align: center; padding: 24px 12px; color: #C4A08A; font-style: italic; font-size: 13px; } .zc-main-content { flex: 1; background: rgba(255,255,255,0.78); backdrop-filter: blur(14px); border: 1px solid rgba(255,200,140,0.4); border-radius: 20px; padding: 24px; display: flex; flex-direction: column; align-items: center; justify-content: center; box-shadow: 0 4px 24px rgba(200,120,60,0.08); min-height: calc(100vh - 100px); gap: 12px; } .zc-main-icon { font-size: 48px; } .zc-main-text { font-family: 'Fraunces', Georgia, serif; font-style: italic; font-size: 16px; color: #B97B4A; } .zc-loading { text-align: center; padding: 24px; color: #C4A08A; } .zc-spin { width: 24px; height: 24px; border: 3px solid #FFD6A5; border-top-color: #F4854A; border-radius: 50%; animation: spin 0.7s linear infinite; margin: 0 auto; } @keyframes spin { to { transform: rotate(360deg); } }`}</style>
            <div className="zc-root">
                <div className="zc-blob zc-blob-1" />
                <div className="zc-blob zc-blob-2" />
                <div className="zc-blob zc-blob-3" />
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
                <div className="zc-container">
                    <div className="zc-sidebar">
                        <div className="zc-sidebar-title">👥 Friends</div>
                        {loading ? (
                            <div className="zc-loading">
                                <div className="zc-spin" />
                            </div>
                        ) : friends.length === 0 ? (
                            <div className="zc-empty-friends">"No friends yet!"</div>
                        ) : (
                            friends.map((friend) => (
                                <div key={friend.username} className="zc-friend-item" onClick={() => handleFriendClick(friend.username)}>
                                    <div className="zc-friend-avatar">🐱</div>
                                    <div className="zc-friend-info">
                                        <div className="zc-friend-name">@{friend.username}</div>
                                    </div>
                                    {unreadMessages[friend.username] > 0 && (
                                        <div className="zc-unread-badge">{unreadMessages[friend.username] > 99 ? "99+" : unreadMessages[friend.username]}</div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                    <div className="zc-main-content">
                        <div className="zc-main-icon">💬</div>
                        <div className="zc-main-text">"Select a friend to start chatting!"</div>
                    </div>
                </div>
            </div>
        </>
    );
}
