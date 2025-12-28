import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import EditProfile from "./pages/EditProfile";
import Chat from "./pages/Chat";
import PrivateChat from "./pages/PrivateChat";
import Friends from "./pages/Friends";
import FriendRequests from "./pages/FriendRequests";
import Profile from "./pages/Profile";
import Search from "./pages/Search";

export default function App() {
  const token = localStorage.getItem("token");
  const profileDone = localStorage.getItem("profileDone") === "true";

  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={!token ? <Login /> : <Navigate to="/home" />} />
        <Route path="/register" element={!token ? <Register /> : <Navigate to="/home" />} />

        {/* PROFILE SETUP */}
        <Route
          path="/edit-profile"
          element={
            token && !profileDone ? <EditProfile /> : <Navigate to="/home" />
          }
        />

        {/* HOME */}
        <Route
          path="/home"
          element={
            token ? (
              profileDone ? <Home /> : <Navigate to="/edit-profile" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* OTHER PROTECTED */}
        <Route path="/chat" element={token ? <Chat /> : <Navigate to="/login" />} />
        <Route path="/chat/:user" element={token ? <PrivateChat /> : <Navigate to="/login" />} />
        <Route path="/friends" element={token ? <Friends /> : <Navigate to="/login" />} />
        <Route path="/requests" element={token ? <FriendRequests /> : <Navigate to="/login" />} />
        <Route path="/profile/:username" element={token ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/search" element={token ? <Search /> : <Navigate to="/login" />} />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}
