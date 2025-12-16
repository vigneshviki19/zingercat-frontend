import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault(); // 🔥 VERY IMPORTANT

    try {
      const res = await api.post("/auth/register", {
        email,
        password,
      });

      if (res.data.success) {
        navigate("/"); // redirect to home
      } else {
        alert("Register failed");
      }
    } catch (err) {
      alert("Register failed");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h1>Join Zinger Cat 🐱</h1>

      <input
        type="email"
        placeholder="College Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit">Become a Zinger Cat 🐱</button>
    </form>
  );
}
