import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "https://zingercat-backend.onrender.com/api/auth/login",
        { email, password }
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);

      navigate("/home");
    } catch (err) {
      alert("Meow 😿 Wrong whiskers!");
    }
  };

  return (
    <div style={styles.container}>
      <h1>Welcome back, Chief Cat 🐱</h1>
      <p>Scratch less, post more.</p>

      <input
        placeholder="Cat Email 🐾"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={styles.input}
      />

      <input
        type="password"
        placeholder="Secret Meow 🤫"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />

      <button onClick={handleLogin} style={styles.button}>
        Enter the Litter 🐾
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
