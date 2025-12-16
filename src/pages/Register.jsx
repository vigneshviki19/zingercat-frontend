import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await axios.post(
        "https://zingercat-backend.onrender.com/api/auth/register",
        { email, password }
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);

      navigate("/home");
    } catch (err) {
      alert("Meow 😿 Could not join the pride!");
    }
  };

  return (
    <div style={styles.container}>
      <h1>Join Zinger Cat 🐱</h1>
      <p>Every cat deserves a voice.</p>

      <input
        placeholder="Cat Email 🐾"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={styles.input}
      />

      <input
        type="password"
        placeholder="Create Secret Meow 🤫"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />

      <button onClick={handleRegister} style={styles.button}>
        Become a Zinger Cat 😼
      </button>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "12px",
  },
  input: {
    padding: "10px",
    width: "250px",
  },
  button: {
    padding: "10px 20px",
    cursor: "pointer",
  },
};
