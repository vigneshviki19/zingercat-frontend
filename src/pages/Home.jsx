import { useEffect } from "react";
import Feed from "./Feed";
import io from "socket.io-client";

const socket = io("https://zingercat-backend.onrender.com");

export default function Home() {
  const username = localStorage.getItem("username");

  function handleLogout() {
    localStorage.clear();
    window.location.href = "/login";
  }

  useEffect(() => {
    if (!username) return;

    // Join socket room
    socket.emit("join", username);

    // Listen for notifications
    socket.on("notification", (data) => {
      if (data.type === "friend") {
        alert(`🤝 Friend request from ${data.from}`);
      } else if (data.type === "message") {
        alert(`💬 New message from ${data.from}`);
      }
    });

    return () => {
      socket.off("notification");
    };
  }, [username]);

  return (
    <div style={{ padding: 20 }}>
      <h2>🐱 Zinger Cat</h2>
      <p>
        Welcome, <b>{username}</b>
      </p>

      <div style={{ marginBottom: 15 }}>
        <button onClick={handleLogout}>🚪 Logout</button>{" "}
        <button onClick={() => (window.location.href = "/friends")}>
          🤝 Friends
        </button>{" "}
        <button onClick={() => (window.location.href = "/search")}>
          🔍 Search
        </button>{" "}
        <button
          onClick={() =>
            (window.location.href = `/profile/${username}`)
          }
        >
          👤 My Profile
        </button>
      </div>

      <Feed />
    </div>
  );
}
