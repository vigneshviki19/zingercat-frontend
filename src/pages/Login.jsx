import { useState } from "react";
import api from "../api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/login", {
        email,
        password
      });

      // 🔥 SAVE AUTH
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);

      // ❌ DO NOT TOUCH profileDone here

      // 🔥 FORCE FULL APP RELOAD
      window.location.href = "/home";
    } catch (err) {
      setError("Invalid email or password");
    }
  }

  return (
    <div style={{ padding: 40 }}>
      <h2>🐱 Welcome back, Meow!</h2>
      <p>Login to continue</p>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="College Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br /><br />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit">Login 😺</button>
      </form>
    </div>
  );
}
