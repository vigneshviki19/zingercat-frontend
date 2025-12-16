import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await axios.post("https://zingercat-backend.onrender.com/api/auth/login", {
        email,
        password,
      });
      alert("Welcome back, chief cat 🐾");
    } catch (err) {
      alert("Meow! Wrong details 😿");
    }
  };

  return (
    <div style={container}>
      <div style={card}>
        <h1>🐱 Welcome Back, Cat!</h1>
        <p style={quote}>
          “Every cat has nine lives — log in and continue yours.”
        </p>

        <input
          style={input}
          placeholder="College Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={input}
          type="password"
          placeholder="Secret Paw-word"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={button} onClick={handleLogin}>
          Enter the Cat Zone 🐾
        </button>

        <p style={footerText}>
          New here, little kitten? 👉{" "}
          <a href="/register">Join the pride</a>
        </p>
      </div>
    </div>
  );
}

/* styles */
const container = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#f9f9f9",
};

const card = {
  width: 350,
  padding: 30,
  borderRadius: 12,
  background: "#fff",
  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  textAlign: "center",
};

const input = {
  width: "100%",
  padding: 12,
  marginTop: 10,
  borderRadius: 6,
  border: "1px solid #ccc",
};

const button = {
  width: "100%",
  padding: 12,
  marginTop: 20,
  borderRadius: 6,
  border: "none",
  background: "#000",
  color: "#fff",
  cursor: "pointer",
};

const quote = {
  fontSize: 14,
  color: "#555",
  marginBottom: 20,
};

const footerText = {
  marginTop: 15,
  fontSize: 13,
};
