import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProfile } from "../api";

export default function Profile() {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await getProfile(username);
        setProfile(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load profile");
      }
    }
    loadProfile();
  }, [username]);

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  if (!profile) {
    return <p>Loading profile...</p>;
  }

  return (
    <div style={{ maxWidth: 400, margin: "30px auto" }}>
      <h2>@{profile.username}</h2>

      <p style={{ color: "#555" }}>
        {profile.about || "No bio yet"}
      </p>

      <p>👥 Friends: {profile.friendsCount}</p>
      <p>📝 Posts: {profile.postsCount}</p>
    </div>
  );
}
