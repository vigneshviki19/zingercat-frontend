import Feed from "./Feed";

export default function Home() {
  const username = localStorage.getItem("username");

  return (
    <div style={container}>
      <div style={header}>
        <h2>🐱 Zinger Cat</h2>
        <p style={{ fontSize: 14, color: "#555" }}>
          Welcome back, <b>{username}</b>
        </p>
      </div>

      {/* Feed with textarea */}
      <Feed />
    </div>
  );
}
