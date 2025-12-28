import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.endsWith("@psgtech.ac.in")) {
      return setError("Use college email (@psgtech.ac.in)");
    }

    if (password !== confirm) {
      return setError("Passwords do not match");
    }

    try {
      const res = await axios.post(
        "https://zingercat-backend.onrender.com/api/auth/register",
        { email, password }
      );

      // 🔥 SAVE AUTH
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);
      localStorage.setItem("profileDone", "false");

      // 🔥 REDIRECT TO PROFILE EDIT (NOT PROFILE VIEW)
      navigate("/edit-profile");
    } catch (err) {
      setError(err.response?.data?.message || "Register failed");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "60px auto" }}>
      <h2>🐱 Join Zinger Cat</h2>

      <form onSubmit={handleRegister}>
        <input
          placeholder="College Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={input}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={input}
          required
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          style={input}
          required
        />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button style={button}>Register 🐾</button>
      </form>
    </div>
  );
}

const input = {
  width: "100%",
  padding: 10,
  marginBottom: 10
};

const button = {
  width: "100%",
  padding: 12,
  background: "black",
  color: "white",
  border: "none"
};
