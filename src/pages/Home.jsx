import Feed from "./Feed";

export default function Home() {
  const username = localStorage.getItem("username");

  function handleLogout() {
    localStorage.clear(); // 🔥 THIS FIXES EVERYTHING
    window.location.href = "/login";
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>🐱 Zinger Cat</h2>
      <p>Welcome, <b>{username}</b></p>

      <button onClick={handleLogout} style={{ marginBottom: 20 }}>
        Logout 🚪
      </button>
      <button onClick={() => window.location.href = "/chat"}>
  💬 Open Live Chat
</button>
      <button onClick={() => window.location.href = "/friends"}>🤝 My Friends</button>
<button onClick={() => window.location.href = "/requests"}>📩 Friend Requests</button>
      <button onClick={() => window.location.href = "/search"}>🔍 Search</button>
<button onClick={() => window.location.href = `/profile/${localStorage.getItem("username")}`}>
  👤 My Profile
</button>

socket.on("notification", (data) => {
  alert(
    data.type === "friend"
      ? `New friend request from ${data.from}`
      : `New message from ${data.from}`
  );
});




      <Feed />
    </div>
  );
}
