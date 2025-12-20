import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("https://zingercat-backend.onrender.com");

export default function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const username = localStorage.getItem("username") || "Anonymous";

  useEffect(() => {
    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.off("receiveMessage");
  }, []);

  const sendMessage = () => {
    if (!message.trim()) return;

    socket.emit("sendMessage", {
      user: username,
      text: message,
    });

    setMessage("");
  };

  return (
    <div style={{ maxWidth: 600, margin: "20px auto" }}>
      <h2>🐱 Zinger Live Chat</h2>

      <div
        style={{
          height: 300,
          border: "1px solid #ccc",
          padding: 10,
          overflowY: "auto",
          marginBottom: 10,
        }}
      >
        {messages.map((m, i) => (
          <p key={i}>
            <strong>{m.user}:</strong> {m.text}
          </p>
        ))}
      </div>

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type message..."
        style={{ width: "80%", padding: 8 }}
      />
      <button onClick={sendMessage} style={{ padding: 8 }}>
        Send
      </button>
    </div>
  );
}
