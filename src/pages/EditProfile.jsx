import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function EditProfile() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [fromYear, setFromYear] = useState("");
  const [toYear, setToYear] = useState("");
  const [about, setAbout] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadMyProfile() {
      try {
        const res = await api.get("/profile/me");
        const p = res.data;

        setName(p.name || "");
        setDepartment(p.department || "");
        setFromYear(p.fromYear || "");
        setToYear(p.toYear || "");
        setAbout(p.about || "");
      } catch {
        setError("Failed to load profile");
      }
    }

    loadMyProfile();
  }, []);

  async function saveProfile() {
    try {
      await api.put("/profile", {
        name,
        department,
        fromYear,
        toYear,
        about
      });

      navigate(`/profile/${localStorage.getItem("username")}`);
    } catch {
      setError("Failed to save profile");
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>✏️ Edit Your Profile</h2>

      <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
      <input value={department} onChange={e => setDepartment(e.target.value)} placeholder="Department" />

      <div>
        <input value={fromYear} onChange={e => setFromYear(e.target.value)} placeholder="From year" />
        <input value={toYear} onChange={e => setToYear(e.target.value)} placeholder="To year" />
      </div>

      <textarea
        value={about}
        maxLength={120}
        onChange={e => setAbout(e.target.value)}
        placeholder="About you (max 120 chars)"
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button onClick={saveProfile}>Save Profile ✅</button>
    </div>
  );
}
