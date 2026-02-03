import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Friends from "./pages/Friends";
import Notifications from "./pages/Notifications";
import Search from "./pages/Search";
import Chat from "./pages/Chat";
import PrivateChat from "./pages/PrivateChat";

export default function App() {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Landing />} />
        <Route
          path="/login"
          element={token ? <Navigate to="/home" /> : <Login />}
        />
        <Route
          path="/register"
          element={token ? <Navigate to="/home" /> : <Register />}
        />

        {/* PROTECTED */}
        <Route
          path="/home"
          element={token ? <Home /> : <Navigate to="/login" />}
        />

        <Route
          path="/profile/:username"
          element={token ? <Profile /> : <Navigate to="/login" />}
        />

        <Route
          path="/edit-profile"
          element={token ? <EditProfile /> : <Navigate to="/login" />}
        />

        <Route
          path="/friends"
          element={token ? <Friends /> : <Navigate to="/login" />}
        />

        <Route
          path="/notifications"
          element={token ? <Notifications /> : <Navigate to="/login" />}
        />

        <Route
          path="/search"
          element={token ? <Search /> : <Navigate to="/login" />}
        />

        <Route
          path="/chat"
          element={token ? <Chat /> : <Navigate to="/login" />}
        />

        <Route
          path="/chat/:user"
          element={token ? <PrivateChat /> : <Navigate to="/login" />}
        />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
