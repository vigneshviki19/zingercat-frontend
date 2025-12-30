import { useState } from "react";
import { updateProfile } from "../api";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    dept: "",
    startYear: 2020,
    endYear: 2024,
    about: "",
    profilePic: ""
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function saveProfile() {
    await updateProfile(form);
    navigate(`/profile/${localStorage.getItem("username")}`);
  }

  return (
    <div style={container}>
      <h2>Complete Your Profile</h2>

      {/* PROFILE PHOTO URL */}
      <input
        name="profilePic"
        placeholder="Profile image URL (optional)"
        onChange={handleChange}
      />

      <input name="name" placeholder="Your Name" onChange={handleChange} />
      <input name="dept" placeholder="Department" onChange={handleChange} />

      {/* YEAR SELECT */}
      <div style={{ display: "flex", gap: 10 }}>
        <select name="startYear" onChange={handleChange}>
          {yearOptions()}
        </select>

        <select name="endYear" onChange={handleChange}>
          {yearOptions()}
        </select>
      </div>

      {/* ABOUT */}
      <textarea
        name="about"
        maxLength={120}
        placeholder="About you (max 120 words)"
        onChange={handleChange}
      />

      <button onClick={saveProfile}>Save Profile ✅</button>
    </div>
  );
}

function yearOptions() {
  const years = [];
  for (let y = 2010; y <= 2050; y++) {
    years.push(
      <option key={y} value={y}>
        {y}
      </option>
    );
  }
  return years;
}

const container = {
  maxWidth: 400,
  margin: "auto",
  padding: 20,
  display: "flex",
  flexDirection: "column",
  gap: 10
};
