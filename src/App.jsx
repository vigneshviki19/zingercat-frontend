import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProfileSetup from "./pages/ProfileSetup";
import Home from "./pages/Home";

export default function App() {
  const token = localStorage.getItem("token");
  const profileDone = localStorage.getItem("profileDone");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route
          path="/register"
          element={token ? <Navigate to="/home" /> : <Register />}
        />

        <Route
          path="/login"
          element={token ? <Navigate to="/home" /> : <Login />}
        />

        <Route
          path="/profile-setup"
          element={
            token && !profileDone ? (
              <ProfileSetup />
            ) : (
              <Navigate to="/home" />
            )
          }
        />

        <Route
          path="/home"
          element={token ? <Home /> : <Navigate to="/login" />}
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
