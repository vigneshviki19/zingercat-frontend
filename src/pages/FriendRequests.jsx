import { useEffect, useState } from "react";
import api from "../api";

export default function FriendRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    api.get("/friends/requests").then(res => setRequests(res.data));
  }, []);

  const accept = async (u) => {
    await api.post(`/friends/accept/${u}`);
    setRequests(req => req.filter(r => r !== u));
  };

  return (
    <div>
      <h2>📩 Friend Requests</h2>
      {requests.map(u => (
        <div key={u}>
          <b>{u}</b>
          <button onClick={() => accept(u)}>✅ Accept</button>
        </div>
      ))}
    </div>
  );
}
