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

      {requests.length === 0 && <p>No requests</p>}

      {requests.map((u) => (
        <div key={u._id} style={{ marginBottom: 10 }}>
          @{u.username}
          <button
            style={{ marginLeft: 10 }}
            onClick={async () => {
              await acceptFriend(u._id);
              load();
            }}
          >
            Accept
          </button>
        </div>
      ))}
    </div>
  );
}
