import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("https://zingercat-backend.onrender.com");

export default function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const username = localStorage.getItem("username");

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });
  }, []);

  const sendMessage = () => {
    if (!message.trim()) return;

    socket.emit("sendMessage", {
      user: username,
      text: message
    });

    setMessage("");
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto" }}>
      <h2>💬 Live Chat</h2>

      <div style={{ border: "1px solid #ccc", padding: 10, height: 300, overflowY: "auto" }}>
        {messages.map((msg, i) => (
          <p key={i}><b>{msg.user}:</b> {msg.text}</p>
        ))}
      </div>

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type message..."
        style={{ width: "80%" }}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
