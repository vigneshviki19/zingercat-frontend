import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProfile } from "../api";

const DEFAULT_AVATAR =
  "https://cdn-icons-png.flaticon.com/512/149/149071.png";

export default function Profile() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    const data = await getProfile(username);
    setProfile(data);
  }

  if (!profile) return <p>Loading...</p>;

  return (
    <div style={container}>
      {/* PROFILE IMAGE */}
      <img
        src={profile.profilePic || DEFAULT_AVATAR}
        alt="profile"
        style={avatar}
      />

      {/* USERNAME */}
      <h2>@{profile.username}</h2>

      {/* NAME */}
      <h3>{profile.name || "Your Name"}</h3>

      {/* DEPT + YEAR */}
      <p style={{ color: "#666" }}>
        {profile.dept || "Department"} ·{" "}
        {profile.startYear || "YYYY"} - {profile.endYear || "YYYY"}
      </p>

      {/* ABOUT */}
      <p style={about}>{profile.about || "No bio yet"}</p>

      {/* STATS */}
      <div style={stats}>
        <div
          style={statItem}
          onClick={() => navigate(`/profile/${username}/friends`)}
        >
          <strong>{profile.friends?.length || 0}</strong>
          <span>Friends</span>
        </div>

        <div
          style={statItem}
          onClick={() => navigate(`/profile/${username}/posts`)}
        >
          <strong>{profile.postsCount || 0}</strong>
          <span>Posts</span>
        </div>
      </div>

      {/* EDIT BUTTON (ONLY OWN PROFILE) */}
      {username === localStorage.getItem("username") && (
        <button onClick={() => navigate("/edit-profile")}>
          Edit Profile ✏️
        </button>
      )}
    </div>
  );
}

/* ================= STYLES ================= */
const container = {
  maxWidth: 500,
  margin: "auto",
  textAlign: "center",
  padding: 20
};

const avatar = {
  width: 120,
  height: 120,
  borderRadius: "50%",
  objectFit: "cover"
};

const about = {
  marginTop: 12,
  lineHeight: 1.5
};

const stats = {
  display: "flex",
  justifyContent: "space-around",
  marginTop: 20,
  cursor: "pointer"
};

const statItem = {
  textAlign: "center"
};
