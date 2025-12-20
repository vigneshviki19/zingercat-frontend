import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("https://zingercat-backend.onrender.com");

export default function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.off("receiveMessage");
  }, []);

  const sendMessage = () => {
    if (!message.trim()) return;
    socket.emit("sendMessage", message);
    setMessage("");
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h2>🐱 Live Chat</h2>

      <div style={{
        height: 300,
        border: "1px solid #ccc",
        overflowY: "auto",
        padding: 10
      }}>
        {messages.map((m, i) => (
          <p key={i}>{m}</p>
        ))}
      </div>

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type message..."
        style={{ width: "100%", marginTop: 10 }}
      />

      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
