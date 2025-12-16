import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: 20
      }}
    >
      {/* Logo placeholder */}
      <div style={{ fontSize: 60, marginBottom: 10 }}>🐱</div>

      <h1 style={{ fontSize: 36, marginBottom: 10 }}>Zinger Cat</h1>

      <p style={{ maxWidth: 400, color: "#555", marginBottom: 30 }}>
        A private, college-only community to connect, share, help and trade —
        safely and anonymously.
      </p>

      <div>
        <Link to="/login">
          <button style={btnStyle}>Sign In</button>
        </Link>

        <Link to="/register">
          <button style={{ ...btnStyle, marginLeft: 10 }}>
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
}

const btnStyle = {
  padding: "12px 24px",
  fontSize: 16,
  borderRadius: 6,
  border: "none",
  cursor: "pointer",
  backgroundColor: "#000",
  color: "#fff"
};
