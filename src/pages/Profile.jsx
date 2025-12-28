import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProfile } from "../api";

export default function Profile() {
  const { username } = useParams();
  const navigate = useNavigate();
  const myUsername = localStorage.getItem("username");

  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await getProfile(username);

        // 🚫 Not friend and not self → block
        if (!data.isSelf && !data.isFriend) {
          setError("🚫 You can only view your friends’ profiles.");
          return;
        }

        setProfile(data);
      } catch (err) {
        setError("Failed to load profile");
      }
    }

    loadProfile();
  }, [username]);

  if (error) {
    return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;
  }

  if (!profile) return <p>Loading profile...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>@{profile.username}</h2>

      <p>{profile.about || "No bio yet"}</p>

      <p>👥 Friends: {profile.friends.length}</p>
      <p>📝 Posts: {profile.postCount}</p>

      {/* ✏️ Edit button ONLY for self */}
      {profile.isSelf && (
        <button onClick={() => navigate("/edit-profile")}>
          ✏️ Edit Profile
        </button>
      )}
    </div>
  );
}
