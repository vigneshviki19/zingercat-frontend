import { useEffect, useState } from "react";
import { getProfile } from "../api";
import { useNavigate, useParams } from "react-router-dom";

export default function Profile() {
  const { username } = useParams();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const data = await getProfile(username);
      setProfile(data);
    } catch (err) {
      console.error("PROFILE LOAD ERROR", err);
    }
  }

  if (!profile) return <p>Loading profile...</p>;

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      {/* TOP ACTION BAR */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 20
        }}
      >
        <button onClick={() => navigate("/home")}>🏠 Home</button>

        {username === localStorage.getItem("username") && (
          <button onClick={() => navigate("/edit-profile")}>
            ✏️ Edit Profile
          </button>
        )}
      </div>

      {/* PROFILE CARD */}
      <div
        style={{
          background: "#fff",
          padding: 20,
          borderRadius: 8,
          border: "1px solid #ddd"
        }}
      >
        <img
          src={profile.profilePic}
          alt="profile"
          style={{
            width: 120,
            height: 120,
            borderRadius: "50%",
            objectFit: "cover"
          }}
        />

        <h2>@{profile.username}</h2>
        <p>{profile.name}</p>
        <p>{profile.dept}</p>
        <p>
          {profile.startYear} – {profile.endYear}
        </p>

        <p style={{ marginTop: 10 }}>{profile.about}</p>

        {/* STATS */}
        <div
          style={{
            display: "flex",
            gap: 20,
            marginTop: 20,
            cursor: "pointer"
          }}
        >
          <span onClick={() => navigate(`/friends/${username}`)}>
            👥 Friends
          </span>

          <span onClick={() => navigate(`/user-posts/${username}`)}>
            📝 Posts
          </span>
        </div>
      </div>
    </div>
  );
}
