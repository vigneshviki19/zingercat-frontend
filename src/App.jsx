import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import PrivateChat from "./pages/PrivateChat";
import Friends from "./pages/Friends";


export default function App() {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        {/* Landing */}
        <Route path="/" element={<Landing />} />

        {/* Auth */}
        <Route
          path="/login"
          element={token ? <Navigate to="/home" /> : <Login />}
        />
        <Route
          path="/register"
          element={token ? <Navigate to="/home" /> : <Register />}
        />

        {/* Protected */}
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

        {/* Catch */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
