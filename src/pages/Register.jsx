import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await axios.post("https://zingercat-backend.onrender.com/api/auth/register", {
        email,
        password,
      });
      alert("You are officially a Zinger Cat 🐱🎉");
    } catch (err) {
      alert("Meow! Something went wrong 😿");
    }
  };

  return (
    <div style={container}>
      <div style={card}>
        <h1>🐱 Join Zinger Cat</h1>

        <p style={quote}>
          “A place where cats help cats.  
          No judgment. No outsiders. Just paws together.”
        </p>

        <input
          style={input}
          placeholder="College Email (@psgtech.ac.in)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={input}
          type="password"
          placeholder="Create a Paw-word"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={button} onClick={handleRegister}>
          Become a Zinger Cat 🐾
        </button>

        <p style={footerText}>
          Already part of the pride? 👉{" "}
          <a href="/login">Come back, chief</a>
        </p>
      </div>
    </div>
  );
}

/* same styles */
const container = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#f9f9f9",
};

const card = {
  width: 380,
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
