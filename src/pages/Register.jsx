import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const res = await fetch(
      "https://zingercat-backend.onrender.com/api/auth/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

    if (res.ok) navigate("/login");
    else alert("Registration failed");
  };

  return (
    <div style={container}>
      <form style={card} onSubmit={handleRegister}>
        <h2>🐱 Join Zinger Cat</h2>
        <p>Create your anonymous college identity</p>

        <input
          type="email"
          placeholder="College Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={input}
        />

        <button style={button}>Create Account</button>

        <p style={{ marginTop: 10 }}>
          Already a cat?{" "}
          <span style={link} onClick={() => navigate("/login")}>
            Login
          </span>
        </p>
      </form>
    </div>
  );
}

const container = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #000, #333)",
};

const card = {
  background: "#fff",
  padding: 30,
  borderRadius: 12,
  width: 320,
  textAlign: "center",
};

const input = {
  width: "100%",
  padding: 10,
  margin: "10px 0",
};

const button = {
  width: "100%",
  padding: 10,
  background: "#000",
  color: "#fff",
  border: "none",
  cursor: "pointer",
};

const link = {
  color: "#000",
  cursor: "pointer",
  fontWeight: "bold",
};
