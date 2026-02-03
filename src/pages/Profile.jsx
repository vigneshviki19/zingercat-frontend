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

  useEffect(() => {
    loadProfile();
    loadStatus();
  }, [username]);

  async function loadProfile() {
    const data = await getProfile(username);
    setProfile(data);
  }

  async function loadStatus() {
    if (username === myUsername) return;

    const friends = await getFriends();
    if (friends.find(f => f.username === username)) {
      setStatus("friends");
      return;
    }

    const requests = await getFriendRequests();
    if (requests.find(r => r.username === myUsername)) {
      setStatus("requested");
    }
  }

  async function handleAddFriend() {
    await sendFriendRequest(username);
    setStatus("requested");
  }

  if (!profile) return <p>Loading...</p>;

  const isMe = profile.username === myUsername;

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <button onClick={() => navigate("/home")}>🏠 Home</button>

      <div style={{ textAlign: "center", marginTop: 20 }}>
        <img
          src={profile.profilePic || DEFAULT_AVATAR}
          style={{ width: 120, height: 120, borderRadius: "50%" }}
        />

        <h2>@{profile.username}</h2>
        <p>{profile.name}</p>
        <p>{profile.dept}</p>
        <p>{profile.startYear} – {profile.endYear}</p>
        <p>{profile.about}</p>

        {!isMe && (
          <>
            {status === "friends" && <button disabled>✅ Friends</button>}
            {status === "requested" && <button disabled>⏳ Request Sent</button>}
            {status === "none" && (
              <button onClick={handleAddFriend}>➕ Add Friend</button>
            )}
          </>
        )}

        <div style={{ marginTop: 20 }}>
          <span onClick={() => navigate(`/friends/${username}`)}>👥 Friends</span>{" "}
          |{" "}
          <span onClick={() => navigate(`/user-posts/${username}`)}>📝 Posts</span>
        </div>
      </div>
    </div>
  );
}
