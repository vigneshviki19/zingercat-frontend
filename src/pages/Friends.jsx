import { useEffect, useState } from "react";
import { getFriends, getFriendRequests, acceptFriend } from "../api";
import { useNavigate } from "react-router-dom";

export default function Friends() {
  const [friends, setFriends] = useState([]);
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getFriends().then(setFriends);
    getFriendRequests().then(setRequests);
  }, []);

  return (
    <div style={{ maxWidth: 500, margin: "auto" }}>
      <h2>👥 Friends</h2>

      {friends.map((f) => (
        <div key={f.username} onClick={() => navigate(`/chat/${f.username}`)}>
          @{f.username}
        </div>
      ))}

      <h3>🔔 Requests</h3>
      {requests.map((r) => (
        <div key={r.username}>
          @{r.username}
          <button onClick={() => acceptFriend(r.username)}>Accept</button>
        </div>
      ))}
    </div>
  );
}
