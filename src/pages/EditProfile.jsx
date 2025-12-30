import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../api";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const [form, setForm] = useState({
    name: "",
    dept: "",
    startYear: 2020,
    endYear: 2024,
    about: "",
    profilePic: ""
  });

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    const data = await getProfile(username);
    setForm({
      name: data.name || "",
      dept: data.dept || "",
      startYear: data.startYear || 2020,
      endYear: data.endYear || 2024,
      about: data.about || "",
      profilePic: data.profilePic || ""
    });
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function saveProfile() {
    await updateProfile(form);
    navigate(`/profile/${username}`);
  }

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <h2>Edit Profile</h2>

      <input
        name="profilePic"
        value={form.profilePic}
        onChange={handleChange}
        placeholder="Profile image URL"
      />

      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Your Name"
      />

      <input
        name="dept"
        value={form.dept}
        onChange={handleChange}
        placeholder="Department"
      />

      <div style={{ display: "flex", gap: 10 }}>
        <select
  name="startYear"
  value={form.startYear}
  onChange={handleChange}
>
  {years()}
</select>

<select
  name="endYear"
  value={form.endYear}
  onChange={handleChange}
>
  {years()}
</select>

        </select>
      </div>

      <textarea
        name="about"
        value={form.about}
        maxLength={120}
        onChange={handleChange}
        placeholder="About you (120 words)"
      />

      <button onClick={saveProfile}>Save</button>
    </div>
  );
}

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
