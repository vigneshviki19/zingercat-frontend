import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div style={container}>
      <h1>🐱 Zinger Cat</h1>
      <p>A safe college community</p>

      <button style={btn} onClick={() => navigate("/register")}>
        New User? Sign Up
      </button>

      <button style={btnOutline} onClick={() => navigate("/login")}>
        Already a Cat? Log In
      </button>
    </div>
  );
}

const container = {
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: 15,
};

const btn = {
  padding: "10px 20px",
  background: "black",
  color: "white",
  border: "none",
  cursor: "pointer",
};

const btnOutline = {
  padding: "10px 20px",
  background: "white",
  color: "black",
  border: "1px solid black",
  cursor: "pointer",
};
