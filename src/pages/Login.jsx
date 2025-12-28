import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "https://zingercat-backend.onrender.com/api/auth/login",
        { email, password }
      );

      // 🔐 Save auth data
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);
      localStorage.setItem("profileDone", "true"); // login users already have profile

      // ✅ GO DIRECTLY TO HOME
      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: "60px auto" }}>
      <h2>😺 Welcome back, Meow!</h2>
      <p>Login to continue</p>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="College Email (example@psgtech.ac.in)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: "100%", padding: 10, marginBottom: 10 }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: "100%", padding: 10, marginBottom: 10 }}
        />

        {error && (
          <p style={{ color: "red", marginBottom: 10 }}>{error}</p>
        )}

        <button
          type="submit"
          style={{ width: "100%", padding: 10 }}
        >
          Login 🐾
        </button>
      </form>

      <p style={{ marginTop: 15 }}>
        New here?{" "}
        <span
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => navigate("/register")}
        >
          Create an account
        </span>
      </p>
    </div>
  );
}
