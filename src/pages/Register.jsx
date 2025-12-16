import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "https://zingercat-backend.onrender.com/api/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      if (res.ok) {
        navigate("/login");
      } else {
        alert("Register failed");
      }
    } catch (err) {
      alert("Register failed");
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h1>Join Zinger Cat 🐱</h1>

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit">Become a Zinger Cat 🐱</button>
    </form>
  );
}
