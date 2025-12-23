import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const [q, setQ] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const search = async () => {
    const res = await api.get(`/profile?q=${q}`);
    setUsers(res.data);
  };

  return (
    <div>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search users..."
      />
      <button onClick={search}>🔍</button>

      {users.map(u => (
        <p key={u.username} onClick={() => navigate(`/profile/${u.username}`)}>
          @{u.username}
        </p>
      ))}
    </div>
  );
}
