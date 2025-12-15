import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
      <Link to="/" style={{ marginRight: 15 }}>🏠 Home</Link>
      <Link to="/create" style={{ marginRight: 15 }}>✏️ Create</Link>
      <Link to="/login" style={{ marginRight: 15 }}>🔐 Login</Link>
      <Link to="/register">📝 Register</Link>
    </nav>
  );
}
