import { useEffect, useState } from "react";
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
        setUsers(data);
      } catch (err) {
        console.error(err);
      }
    }, 300); // Instagram-style debounce

    return () => clearTimeout(delay);
  }, [query]);

  return (
    <div style={{ maxWidth: 400, margin: "30px auto" }}>
      <h2>🔍 Search Cats</h2>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search username..."
        style={{ width: "100%", padding: 8 }}
      />

      {users.map((u) => (
        <div
          key={u.username}
          onClick={() => navigate(`/profile/${u.username}`)}
          style={{
            padding: 10,
            borderBottom: "1px solid #ddd",
            cursor: "pointer"
          }}
        >
          <strong>@{u.username}</strong>
          <div style={{ fontSize: 12 }}>{u.about || "No bio"}</div>
        </div>
      ))}
    </div>
  );
}
