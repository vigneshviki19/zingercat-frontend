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
    <div>
      <h2>🤝 Friends</h2>
      {friends.map(f => (
        <div key={f}>
          <b>{f}</b>
          <button onClick={() => navigate(`/chat/${f}`)}>💬 Chat</button>
        </div>
      ))}
    </div>
  );
}
