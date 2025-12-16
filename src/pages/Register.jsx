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
      alert("Meow! Something went wrong 😿");
    }
  };

  // UI stays SAME as before
}
