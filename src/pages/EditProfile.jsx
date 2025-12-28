import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function EditProfile() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [yearFrom, setYearFrom] = useState("");
  const [yearTo, setYearTo] = useState("");
  const [about, setAbout] = useState("");
  const [loading, setLoading] = useState(false);

  // load existing profile
  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await api.get(`/profile/${username}`);
        const p = res.data;

        setName(p.name || "");
        setDepartment(p.department || "");
        setYearFrom(p.yearFrom || "");
        setYearTo(p.yearTo || "");
        setAbout(p.about || "");
      } catch (err) {
        console.error("Profile load failed", err);
      }
    }
    loadProfile();
  }, [username]);

  async function handleSave(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await api.put(`/profile/${username}`, {
        name,
        department,
        yearFrom,
        yearTo,
        about
      });

      localStorage.setItem("profileDone", "true");
      navigate(`/profile/${username}`);
    } catch (err) {
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 500, margin: "40px auto" }}>
      <h2>✏️ Edit Profile</h2>

      <form onSubmit={handleSave}>
        <input
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={input}
        />

        <input
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          style={input}
        />

        <div style={{ display: "flex", gap: 10 }}>
          <input
            placeholder="Year from (2024)"
            value={yearFrom}
            onChange={(e) => setYearFrom(e.target.value)}
            style={input}
          />
          <input
            placeholder="Year to (2028)"
            value={yearTo}
            onChange={(e) => setYearTo(e.target.value)}
            style={input}
          />
        </div>

        <textarea
          placeholder="About you (max 120 words)"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          maxLength={700}
          rows={4}
          style={{ ...input, resize: "none" }}
        />

        <button disabled={loading} style={button}>
          {loading ? "Saving..." : "Save Profile"}
        </button>
      </form>
    </div>
  );
}

const input = {
  width: "100%",
  padding: 10,
  marginBottom: 12
};

const button = {
  width: "100%",
  padding: 12,
  background: "black",
  color: "white",
  border: "none",
  cursor: "pointer"
};
