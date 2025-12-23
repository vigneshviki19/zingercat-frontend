import { useState, useEffect } from "react";
import { searchUsers } from "../api";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!query.trim()) {
      setUsers([]);
      return;
    }

    const delay = setTimeout(async () => {
      const data = await searchUsers(query);
      setUsers(data);
    }, 300);

    return () => clearTimeout(delay);
  }, [query]);

  return (
    <div style={{ maxWidth: 400, margin: "30px auto" }}>
      <input
        placeholder="Search cats 🐾"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ width: "100%", padding: 8 }}
      />

      <ul style={{ listStyle: "none", padding: 0 }}>
        {users.map((u) => (
          <li
            key={u._id}
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
