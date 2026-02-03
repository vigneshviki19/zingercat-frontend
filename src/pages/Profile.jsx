import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getProfile,
  sendFriendRequest,
  getFriends
} from "../api";

const DEFAULT_AVATAR =
  "https://cdn-icons-png.flaticon.com/512/149/149071.png";

export default function Profile() {
  const { username } = useParams();
  const navigate = useNavigate();

  const myUsername = localStorage.getItem("username");

  const [profile, setProfile] = useState(null);
  const [friends, setFriends] = useState([]);
  const [status, setStatus] = useState("none"); 
  // none | requested | friends

  useEffect(() => {
    loadProfile();
    loadFriends();
  }, [username]);

  /* =========================
     LOAD PROFILE
  ========================= */
  async function loadProfile() {
    try {
      const data = await getProfile(username);
      setProfile(data);
    } catch (err) {
      console.error("PROFILE LOAD ERROR:", err);
    }
  }

  /* =========================
     LOAD FRIEND STATUS
  ========================= */
  async function loadFriends() {
    try {
      const data = await getFriends();
      setFriends(data);

      if (data.find((f) => f.username === username)) {
        setStatus("friends");
      }
    } catch (err) {
      console.error("FRIEND LOAD ERROR:", err);
    }
  }

  /* =========================
     SEND FRIEND REQUEST
  ========================= */
  async function handleAddFriend() {
    try {
      await sendFriendRequest(username);
      setStatus("requested");
    } catch (err) {
      alert("Request failed");
    }
  }

  if (!profile) return <p>Loading profile...</p>;

  const isMe = myUsername === profile.username;

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      {/* ================= TOP BAR ================= */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 20
        }}
      >
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
          padding: 20,
          borderRadius: 10,
          border: "1px solid #ddd",
          textAlign: "center"
        }}
      >
        {/* PROFILE PIC */}
        <img
          src={profile.profilePic || DEFAULT_AVATAR}
          alt="profile"
          style={{
            width: 130,
            height: 130,
            borderRadius: "50%",
            objectFit: "cover",
            marginBottom: 10
          }}
        />

        <h2>@{profile.username}</h2>
        <p>{profile.name}</p>
        <p>{profile.dept}</p>
        <p>
          {profile.startYear} – {profile.endYear}
        </p>

        <p style={{ marginTop: 10 }}>
          {profile.about || "No bio yet"}
        </p>

        {/* ================= FRIEND BUTTON ================= */}
        {!isMe && (
          <div style={{ marginTop: 15 }}>
            {status === "friends" && (
              <button disabled>✅ Friends</button>
            )}

            {status === "requested" && (
              <button disabled>⏳ Request Sent</button>
            )}

            {status === "none" && (
              <button onClick={handleAddFriend}>
                ➕ Add Friend
              </button>
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
            cursor: "pointer"
          }}
        >
          <span
            onClick={() => navigate(`/friends/${profile.username}`)}
          >
            👥 Friends
          </span>

          <span
            onClick={() => navigate(`/user-posts/${profile.username}`)}
          >
            📝 Posts
          </span>
        </div>
      </div>
    </div>
  );
}
