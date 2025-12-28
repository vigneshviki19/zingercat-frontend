import { useState } from "react";
import axios from "axios";

export default function EditProfile() {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [yearFrom, setYearFrom] = useState("");
  const [yearTo, setYearTo] = useState("");
  const [about, setAbout] = useState("");
  const [error, setError] = useState("");

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !department || !yearFrom || !yearTo) {
      setError("Fill all required fields");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await axios.put(
        "https://zingercat-backend.onrender.com/api/profile",
        {
          name,
          department,
          year: `${yearFrom}-${yearTo}`,
          about
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // 🔥 MARK PROFILE DONE
      localStorage.setItem("profileDone", "true");

      // 🔥 GO HOME
      window.location.href = "/home";

    } catch (err) {
      setError("Failed to save profile");
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "60px auto" }}>
      <h2>👤 Complete Your Profile</h2>

      <form onSubmit={handleSave}>
        <input
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: "100%", padding: 10, marginBottom: 10 }}
        />

        <input
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          style={{ width: "100%", padding: 10, marginBottom: 10 }}
        />

        <div style={{ display: "flex", gap: 10 }}>
          <input
            placeholder="From (2024)"
            value={yearFrom}
            onChange={(e) => setYearFrom(e.target.value)}
            style={{ flex: 1, padding: 10 }}
          />
          <input
            placeholder="To (2028)"
            value={yearTo}
            onChange={(e) => setYearTo(e.target.value)}
            style={{ flex: 1, padding: 10 }}
          />
        </div>

        <textarea
          placeholder="About you (max 120 words)"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          rows={4}
          style={{ width: "100%", padding: 10, marginTop: 10 }}
        />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button
          type="submit"
          style={{ width: "100%", padding: 10, marginTop: 15 }}
        >
          Save Profile ✅
        </button>
      </form>
    </div>
  );
}
