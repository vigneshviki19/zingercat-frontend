import { useEffect, useState } from "react";
import { getFriends } from "../api";
import { useNavigate } from "react-router-dom";

export default function Friends() {
  const [friends, setFriends] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadFriends();
  }, []);

  async function loadFriends() {
    try {
      const data = await getFriends();
      setFriends(data || []);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>🤝 My Friends</h2>

      {friends.map((friend) => (
        <div
          key={friend}
          onClick={() => navigate(`/profile/${friend}`)}
          style={{
            padding: 10,
            cursor: "pointer",
            borderBottom: "1px solid #ddd"
          }}        >
          @{friend}
        </div>
      ))}
    </div>
  );
}
