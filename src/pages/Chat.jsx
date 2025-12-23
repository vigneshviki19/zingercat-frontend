import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("https://zingercat-backend.onrender.com");

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const user = localStorage.getItem("username");

  // Load old messages
  useEffect(() => {
    fetch("https://zingercat-backend.onrender.com/api/chat")
      .then((res) => res.json())
      .then((data) => setMessages(data));
  }, []);

  // Live messages
  useEffect(() => {
    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.off("receiveMessage");
  }, []);

  const sendMessage = () => {
    if (!text.trim()) return;

    socket.emit("sendMessage", {
      user,
      message: text
    });

    setText("");
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto" }}>
      <h2>💬 Live Chat</h2>

      <div style={{ border: "1px solid #ccc", padding: 10, height: 300, overflowY: "auto" }}>
        {messages.map((m, i) => (
          <div key={i}>
            <b>{m.user}</b>: {m.message}
          </div>
        ))}
      </div>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type message..."
        style={{ width: "80%" }}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
