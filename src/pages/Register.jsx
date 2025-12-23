import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { searchUsers } from "../api";

export default function Search() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!query.trim()) {
      setUsers([]);
      return;
    }

    const delay = setTimeout(async () => {
      try {
        setLoading(true);
        const data = await searchUsers(query);
        setUsers(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [query]);

  return (
    <div style={{ maxWidth: 400, margin: "30px auto" }}>
      <h2>🔍 Search Cats</h2>

      <input
        placeholder="Search cats 🐾"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ width: "100%", padding: 8 }}
      />

      {loading && <p>Searching...</p>}

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
            <strong>@{u.username}</strong>
            <div style={{ fontSize: 12, color: "#666" }}>
              {u.about || "No bio"}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
