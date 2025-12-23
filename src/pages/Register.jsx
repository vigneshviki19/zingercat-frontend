import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchUsers } from "../api";

export default function Search() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!query.trim()) return;
    const data = await searchUsers(query);
    setUsers(data || []);
  };

  return (
    <div style={{ maxWidth: 400, margin: "30px auto" }}>
      <h2>🔍 Search Cats</h2>

      <input
        placeholder="Search username"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ width: "100%", padding: 8 }}
      />

      <button onClick={handleSearch} style={{ marginTop: 10 }}>
        Search
      </button>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {users.map((u) => (
          <li
            key={u.username}
            onClick={() => navigate(`/profile/${u.username}`)}
            style={{
              padding: 10,
              cursor: "pointer",
              borderBottom: "1px solid #ddd"
            }}
          >
            @{u.username}
          </li>
        ))}
      </ul>
    </div>
  );
}
