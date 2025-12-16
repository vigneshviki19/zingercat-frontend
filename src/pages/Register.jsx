import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault(); // 🔥 MUST

    console.log("Register clicked"); // 🔥 DEBUG

    const res = await fetch(
      "https://zingercat-backend.onrender.com/api/auth/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

    console.log("Response status:", res.status);

    const data = await res.json();
    console.log("Response data:", data);

    if (res.ok) {
      navigate("/");
    } else {
      alert("Register failed");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
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

      <button type="submit">
        Become a Zinger Cat 🐱
      </button>
    </form>
  );
}
