import { useEffect, useState } from "react";
import { getFriends } from "../api";
import { useNavigate } from "react-router-dom";

export default function Friends() {
  const [friends, setFriends] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getFriends().then(setFriends);
  }, []);

  if (!friends.length) {
    return <p style={{ padding: 20 }}>No friends yet 🐾</p>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>👥 Friends</h2>
      {friends.map((f) => (
        <div
          key={f}
          style={{ cursor: "pointer", padding: 10 }}
          onClick={() => navigate(`/chat/${f}`)}
        >
          @{f}
        </div>
      ))}
    </div>
  );
}
