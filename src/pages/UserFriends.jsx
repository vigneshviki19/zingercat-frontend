import { useEffect, useState } from "react";
import { getFriends } from "../api";

export default function UserFriends() {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const data = await getFriends();
    setFriends(data);
  }

  return (
    <div style={{ maxWidth: 400, margin: "auto" }}>
      <h2>Your Friends</h2>
      {friends.map((f) => (
        <p key={f}>@{f}</p>
      ))}
    </div>
  );
}
