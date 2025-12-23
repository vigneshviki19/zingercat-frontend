import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

export default function Profile() {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const me = localStorage.getItem("username");
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/profile/${username}`).then(res => setProfile(res.data));
  }, [username]);

  if (!profile) return <p>Loading...</p>;

  const isFriend = profile.friends.includes(me);

  const sendRequest = async () => {
    await api.post(`/friends/request/${username}`);
    alert("Friend request sent");
  };

  return (
    <div style={{ maxWidth: 500, margin: "auto" }}>
      <h2>@{profile.username}</h2>

      <p>{profile.about || "No bio yet"}</p>

      <p>👥 Friends: {profile.friendsCount}</p>
      <p>📝 Posts: {profile.postsCount}</p>

      {me !== username && !isFriend && (
        <button onClick={sendRequest}>➕ Add Friend</button>
      )}

      {isFriend && (
        <button onClick={() => navigate(`/chat/${username}`)}>
          💬 Chat
        </button>
      )}

      {me === username && (
        <button onClick={() => navigate("/edit-profile")}>
          ✏️ Edit Profile
        </button>
      )}
    </div>
  );
}
