import { Navigate } from "react-router-dom";

export default function Landing() {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/home" />;
  }

  return (
    <div style={{ textAlign: "center", marginTop: 100 }}>
      <h1>🐱 Zinger Cat</h1>
      <p>College discussion & sharing platform</p>

      <div style={{ marginTop: 20 }}>
        <a href="/login">
          <button style={{ marginRight: 10 }}>Login</button>
        </a>
        <a href="/register">
          <button>Register</button>
        </a>
      </div>
    </div>
  );
}
