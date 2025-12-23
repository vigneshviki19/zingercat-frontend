import { useState } from "react";
import api from "../api";

export default function EditProfile() {
  const [about, setAbout] = useState("");

  const save = async () => {
    await api.put("/profile/edit", { about });
    alert("Profile updated");
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto" }}>
      <h2>Edit Profile</h2>

      <textarea
        value={about}
        onChange={(e) => setAbout(e.target.value)}
        placeholder="About me..."
        style={{ width: "100%", height: 80 }}
      />

      <button onClick={save}>Save</button>
    </div>
  );
}
