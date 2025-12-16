export default function Home() {
  // temporary username (later comes from backend)
  const username = localStorage.getItem("username");


  return (
    <div style={container}>
      {/* Header */}
      <div style={header}>
        <h2>🐱 Zinger Cat</h2>
        <p style={{ fontSize: 14, color: "#555" }}>
          Welcome back, <b>{username}</b>
        </p>
      </div>

      {/* Main card */}
      <div style={card}>
        <h3>Hello, Cat 👋</h3>
        <p style={text}>
          This is your safe space.  
          Ask for help, share news, or help another cat 🐾
        </p>

        <button style={button}>
          + Create a Post
        </button>
      </div>

      {/* Feed placeholder */}
      <div style={feed}>
        <p style={{ color: "#777" }}>
          🐾 No posts yet. Be the first cat to speak.
        </p>
      </div>
    </div>
  );
}

/* styles */
const container = {
  minHeight: "100vh",
  background: "#f4f4f4",
  padding: 20,
};

const header = {
  marginBottom: 20,
};

const card = {
  background: "#fff",
  padding: 20,
  borderRadius: 12,
  boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
  marginBottom: 20,
};

const text = {
  fontSize: 15,
  color: "#555",
  marginBottom: 15,
};

const button = {
  padding: "10px 18px",
  borderRadius: 6,
  border: "none",
  background: "#000",
  color: "#fff",
  cursor: "pointer",
};

const feed = {
  background: "#fff",
  padding: 20,
  borderRadius: 12,
};
