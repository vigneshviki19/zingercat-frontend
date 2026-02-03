import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getProfile,
  sendFriendRequest,
  getFriends,
  getFriendRequests
} from "../api";

const DEFAULT_AVATAR =
  "https://cdn-icons-png.flaticon.com/512/149/149071.png";

export default function Profile() {
  const { username } = useParams();
  const navigate = useNavigate();
  const myUsername = localStorage.getItem("username");

  const [profile, setProfile] = useState(null);
  const [status, setStatus] = useState("none"); 
  // none | requested | friends

  /* =========================
     LOAD DATA
  ========================= */
  useEffect(() => {
    loadProfile();
    checkFriendStatus();
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
      if (friends.some(f => f.username === username)) {
        setStatus("friends");
        return;
      }

      const requests = await getFriendRequests();
      if (requests.some(r => r.username === myUsername)) {
        setStatus("requested");
      }
    } catch (err) {
      console.error("FRIEND STATUS ERROR:", err);
    }
  }

  async function handleAddFriend() {
    try {
      await sendFriendRequest(username);
      setStatus("requested");
    } catch {
      alert("Failed to send request");
    }
  }

  if (!profile) return <p>Loading profile...</p>;

  const isMe = profile.username === myUsername;

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>

      {/* ================= TOP BAR ================= */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button onClick={() => navigate("/home")}>🏠 Home</button>

        {isMe && (
          <button onClick={() => navigate("/edit-profile")}>
            ✏️ Edit Profile
          </button>
        )}
      </div>

      {/* ================= PROFILE CARD ================= */}
      <div
        style={{
          background: "#fff",
          marginTop: 20,
          padding: 20,
          borderRadius: 10,
          border: "1px solid #ddd",
          textAlign: "center"
        }}
      >
        <img
          src={profile.profilePic || DEFAULT_AVATAR}
          alt="profile"
          style={{
            width: 130,
            height: 130,
            borderRadius: "50%",
            objectFit: "cover"
          }}
        />

        <h2>@{profile.username}</h2>
        <p>{profile.name || "No name"}</p>
        <p>{profile.dept || "No department"}</p>
        <p>
          {profile.startYear} – {profile.endYear}
        </p>
        <p style={{ marginTop: 10 }}>
          {profile.about || "No bio yet"}
        </p>

        {/* ================= FRIEND BUTTON ================= */}
        {!isMe && (
          <div style={{ marginTop: 15 }}>
            {status === "friends" && <button disabled>✅ Friends</button>}
            {status === "requested" && <button disabled>⏳ Request Sent</button>}
            {status === "none" && (
              <button onClick={handleAddFriend}>➕ Add Friend</button>
            )}
          </div>
        )}

        {/* ================= STATS ================= */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 30,
            marginTop: 20,
            fontWeight: "bold"
          }}
        >
          <span
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/friends")}
          >
            👥 Friends ({profile.friends?.length || 0})
          </span>

          <span>
            📝 Posts ({profile.postsCount || 0})
          </span>
        </div>
      </div>
    </div>
  );
}
