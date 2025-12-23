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

      <Feed />
    </div>
  );
}
