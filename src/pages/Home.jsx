import Feed from "./Feed";

export default function Home() {
  const username = localStorage.getItem("username");

  return (
    <div style={{ padding: 20 }}>
      <h2>🐱 Zinger Cat</h2>
      <p>Welcome back, <b>{username}</b></p>

      {/* THIS shows textarea */}
      <Feed />
    </div>
  );
}
