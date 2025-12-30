import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../api";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    dept: "",
    startYear: 2020,
    endYear: 2024,
    about: "",
    profilePic: ""
  });

  /* =========================
     LOAD PROFILE
  ========================= */
  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const data = await getProfile(username);
      setForm({
        name: data.name || "",
        dept: data.dept || "",
        startYear: data.startYear || 2020,
        endYear: data.endYear || 2024,
        about: data.about || "",
        profilePic: data.profilePic || ""
      });
    } catch (err) {
      console.error("PROFILE LOAD ERROR:", err);
    } finally {
      setLoading(false);
    }
  }

  /* =========================
     HANDLE CHANGE
  ========================= */
  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  /* =========================
     SAVE PROFILE
  ========================= */
  async function saveProfile() {
    try {
      await updateProfile({
        ...form,
        startYear: Number(form.startYear),
        endYear: Number(form.endYear)
      });

      navigate(`/profile/${username}`);
    } catch (err) {
      console.error("PROFILE SAVE ERROR:", err);
      alert("Failed to save profile");
    }
  }

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading profile...</p>;
  }

  return (
    <div style={{ maxWidth: 420, margin: "auto", padding: 20 }}>
      <h2>Edit Profile</h2>

      {/* PROFILE IMAGE */}
      <input
        name="profilePic"
        value={form.profilePic}
        onChange={handleChange}
        placeholder="Profile image URL"
        style={{ width: "100%", marginBottom: 10 }}
      />

      {/* NAME */}
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Your Name"
        style={{ width: "100%", marginBottom: 10 }}
      />

      {/* DEPARTMENT */}
      <input
        name="dept"
        value={form.dept}
        onChange={handleChange}
        placeholder="Department (e.g. CSE)"
        style={{ width: "100%", marginBottom: 10 }}
      />

      {/* YEAR RANGE */}
      <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
        <select
          name="startYear"
          value={form.startYear}
          onChange={handleChange}
          style={{ flex: 1 }}
        >
          {years()}
        </select>

        <select
          name="endYear"
          value={form.endYear}
          onChange={handleChange}
          style={{ flex: 1 }}
        >
          {years()}
        </select>
      </div>

      {/* ABOUT */}
      <textarea
        name="about"
        value={form.about}
        maxLength={120}
        onChange={handleChange}
        placeholder="About you (max 120 characters)"
        style={{
          width: "100%",
          height: 80,
          resize: "none",
          marginBottom: 10
        }}
      />

      <button onClick={saveProfile} style={{ width: "100%" }}>
        Save Profile
      </button>
    </div>
  );
}

/* =========================
   YEARS DROPDOWN
========================= */
function years() {
  const arr = [];
  for (let y = 2010; y <= 2050; y++) {
    arr.push(
      <option key={y} value={y}>
        {y}
      </option>
    );
  }
  return arr;
}
