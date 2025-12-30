import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../api";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    profilePic: "",
    name: "",
    dept: "",
    startYear: 2020,
    endYear: 2024,
    about: ""
  });

  /* =========================
     LOAD PROFILE
  ========================= */
  useEffect(() => {
    async function load() {
      try {
        const data = await getProfile(username);
        setForm({
          profilePic: data.profilePic || "",
          name: data.name || "",
          dept: data.dept || "",
          startYear: data.startYear || 2020,
          endYear: data.endYear || 2024,
          about: data.about || ""
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [username]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function saveProfile() {
    try {
      await updateProfile({
        ...form,
        startYear: Number(form.startYear),
        endYear: Number(form.endYear)
      });
      navigate(`/profile/${username}`);
    } catch (err) {
      alert("Failed to save profile");
    }
  }

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;

  return (
    <div style={container}>
      <h2 style={{ textAlign: "center" }}>Edit Profile</h2>

      {/* PROFILE PHOTO */}
      <label>Profile Photo</label>
      <input
        name="profilePic"
        value={form.profilePic}
        onChange={handleChange}
        placeholder="Paste image URL"
        style={input}
      />

      {form.profilePic && (
        <img
          src={form.profilePic}
          alt="preview"
          style={avatar}
        />
      )}

      {/* NAME */}
      <label>Your Name</label>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Enter your name"
        style={input}
      />

      {/* DEPARTMENT */}
      <label>Department</label>
      <input
        name="dept"
        value={form.dept}
        onChange={handleChange}
        placeholder="CSE / ECE / IT"
        style={input}
      />

      {/* YEAR */}
      <label>Year of Study</label>
      <div style={{ display: "flex", gap: 10 }}>
        <select
          name="startYear"
          value={form.startYear}
          onChange={handleChange}
          style={input}
        >
          {years()}
        </select>

        <select
          name="endYear"
          value={form.endYear}
          onChange={handleChange}
          style={input}
        >
          {years()}
        </select>
      </div>

      {/* ABOUT */}
      <label>About You (max 120 chars)</label>
      <textarea
        name="about"
        value={form.about}
        onChange={handleChange}
        maxLength={120}
        style={{ ...input, height: 80 }}
      />

      <button onClick={saveProfile} style={btn}>
        Save Profile
      </button>
    </div>
  );
}

/* =========================
   YEARS
========================= */
function years() {
  const list = [];
  for (let y = 2010; y <= 2050; y++) {
    list.push(
      <option key={y} value={y}>
        {y}
      </option>
    );
  }
  return list;
}

/* =========================
   STYLES
========================= */
const container = {
  maxWidth: 420,
  margin: "auto",
  padding: 20,
  display: "flex",
  flexDirection: "column",
  gap: 8
};

const input = {
  padding: 8,
  width: "100%",
  boxSizing: "border-box"
};

const btn = {
  marginTop: 10,
  padding: 10,
  cursor: "pointer"
};

const avatar = {
  width: 100,
  height: 100,
  objectFit: "cover",
  borderRadius: "50%",
  margin: "10px auto"
};
