 import { useState } from "react";
import api from "../api";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    const res = await api.post("/auth/register", { email, password });
    alert("Registered as " + res.data.username);
  };

  return (
    <div>
      <h2>Register</h2>
      <input placeholder="College Email" onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
      <button onClick={register}>Register</button>
    </div>
  );
}
