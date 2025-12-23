import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchUsers } from "../api";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      setLoading(true);
      setError("");

      const data = await searchUsers(query);
      setResults(data || []);
    } catch (err) {
      console.error(err);
      setError("Search failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>🔍 Search Cats</h2>

      {/* Search box */}
      <div style={{ marginBottom: 15 }}>
        <input
          type="text"
          placeholder="Search by username..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: 8, width: 250 }}
        />
        <button onClick={handleSearch} style={{ marginLeft: 8 }}>
          Search
        </button>
      </div>

      {loading && <p>Searching...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Results */}
      {results.length === 0 && !loading && query && (
        <p>No users found</p>
      )}

      {results.map((user) => (
        <div
          key={user.username}
          style={{
            borderBottom: "1px solid #ddd",
            padding: "10px 0",
            cursor: "pointer"
          }}
          onClick={() => navigate(`/profile/${user.username}`)}
        >
          <strong>{user.username}</strong>
          <div style={{ fontSize: 12, color: "#666" }}>
            {user.about || "No bio"}
          </div>
        </div>
      ))}
    </div>
  );
}
