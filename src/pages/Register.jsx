import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const COLLEGE_DOMAIN = "@psgtech.ac.in";

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    // ✅ Domain check
    if (!email.endsWith(COLLEGE_DOMAIN)) {
      return setError(`Email must end with ${COLLEGE_DOMAIN}`);
    }

    // ✅ Password check
    if (password.length < 6) {
      return setError("Password must be at least 6 characters");
    }

    // ✅ Confirm password
    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "https://zingercat-backend.onrender.com/api/auth/register",
        { email, password }
      );

      // save auth
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);
      localStorage.setItem("profileDone", "false");

      // 🔥 redirect to profile setup
      navigate("/profile-setup");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "60px auto" }}>
      <h2>🐱 Join Zinger Cat</h2>
      <p>Create your cat identity ✨</p>

      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder={`Email (${COLLEGE_DOMAIN})`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: "100%", padding: 10, marginBottom: 10 }}
        />

        <input
          type="password"
          placeholder="Create password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: "100%", padding: 10, marginBottom: 10 }}
        />

        <input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          style={{ width: "100%", padding: 10, marginBottom: 10 }}
        />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button
          type="submit"
          disabled={loading}
          style={{ width: "100%", padding: 10 }}
        >
          {loading ? "Creating account..." : "Register 🐾"}
        </button>
      </form>

      <p style={{ marginTop: 15 }}>
        Already a cat?{" "}
        <span
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => navigate("/login")}
        >
          Login
        </span>
      </p>
    </div>
  );
}
