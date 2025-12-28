import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);

      // ❗ DO NOT SET profileDone HERE
      // let App.jsx decide

      navigate("/home", { replace: true });
    } catch {
      setError("Invalid email or password");
    }
  }

  return (
    <div style={{ padding: 40 }}>
      <h2>🐱 Welcome back, Meow!</h2>

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
