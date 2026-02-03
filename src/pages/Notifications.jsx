import { useEffect, useState } from "react";
import { getFriendRequests, acceptFriend } from "../api";

export default function Notifications() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const data = await getFriendRequests();
    setRequests(data);
  }

  return (
    <div style={{ maxWidth: 400, margin: "auto" }}>
      <h2>🔔 Friend Requests</h2>

      {requests.map((u) => (
        <div key={u._id}>
          @{u.username}
          <button onClick={() => acceptFriend(u._id)}>Accept</button>
        </div>
      ))}
    </div>
  );
}
