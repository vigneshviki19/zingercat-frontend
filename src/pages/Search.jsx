import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { searchUsers } from "../api";

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
      try {
        const data = await searchUsers(query);
        setUsers(data || []);
      } catch (err) {
        console.error("Search failed", err);
      }
    }, 300); // debounce

    return () => clearTimeout(delay);
  }, [query]);

  return (
    <div style={{ maxWidth: 400, margin: "30px auto" }}>
      <h2>🔍 Search Cats</h2>

      <input
        type="text"
        placeholder="Search by username..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          width: "100%",
          padding: 10,
          marginBottom: 15,
          borderRadius: 6,
          border: "1px solid #ccc"
        }}
      />

      <ul style={{ listStyle: "none", padding: 0 }}>
        {users.map((u) => (
          <li
            key={u._id}
            onClick={() => navigate(`/profile/${u.username}`)}
            style={{
              padding: "10px 5px",
              cursor: "pointer",
              borderBottom: "1px solid #eee"
            }}
          >
            @{u.username}
          </li>
        ))}
      </ul>
    </div>
  );
}
