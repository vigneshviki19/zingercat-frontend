import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";

import Chat from "./pages/Chat";
import PrivateChat from "./pages/PrivateChat";
import Friends from "./pages/Friends";
import FriendRequests from "./pages/FriendRequests";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Search from "./pages/Search";

export default function App() {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        {/* ---------- PUBLIC ---------- */}
        <Route path="/" element={<Landing />} />

        <Route
          path="/register"
          element={token ? <Navigate to="/home" /> : <Register />}
        />

        <Route
          path="/login"
          element={token ? <Navigate to="/home" /> : <Login />}
        />

        {/* ---------- PROFILE EDIT (ALLOW AFTER REGISTER) ---------- */}
        <Route
          path="/edit-profile"
          element={
            localStorage.getItem("token")
              ? <EditProfile />
              : <Navigate to="/login" />
          }
        />

        {/* ---------- PROTECTED ---------- */}
        <Route
          path="/home"
          element={token ? <Home /> : <Navigate to="/login" />}
        />

        <Route
          path="/chat"
          element={token ? <Chat /> : <Navigate to="/login" />}
        />

        <Route
          path="/chat/:user"
          element={token ? <PrivateChat /> : <Navigate to="/login" />}
        />

        <Route
          path="/friends"
          element={token ? <Friends /> : <Navigate to="/login" />}
        />

        <Route
          path="/requests"
          element={token ? <FriendRequests /> : <Navigate to="/login" />}
        />

        <Route
          path="/profile/:username"
          element={token ? <Profile /> : <Navigate to="/login" />}
        />

        <Route
          path="/search"
          element={token ? <Search /> : <Navigate to="/login" />}
        />

        {/* ---------- FALLBACK ---------- */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
