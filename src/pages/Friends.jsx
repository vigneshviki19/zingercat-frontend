import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function Friends() {
  const [friends, setFriends] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/friends/list").then(res => setFriends(res.data));
  }, []);

  return (
    <div style={{ maxWidth: 500, margin: "auto" }}>
      <h2>🤝 Friends</h2>

      {friends.map((f, i) => (
        <div key={i} style={{ marginBottom: 10 }}>
          <b>{f}</b>
          <button
            style={{ marginLeft: 10 }}
            onClick={() => navigate(`/chat/${f}`)}
          >
            💬 Chat
          </button>
        </div>
      ))}

      {friends.length === 0 && <p>No friends yet</p>}
    </div>
  );
}
