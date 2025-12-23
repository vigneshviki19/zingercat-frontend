import { useEffect, useState } from "react";
import { io } from "socket.io-client";

// 🔥 create socket ONCE
const socket = io("https://zingercat-backend.onrender.com", {
  transports: ["websocket"],
});

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const username = localStorage.getItem("username");

  useEffect(() => {
    // receive old messages
    socket.on("chatHistory", (history) => {
      setMessages(history);
    });

    // receive live messages
    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("chatHistory");
      socket.off("receiveMessage");
    };
  }, []);

  const sendMessage = () => {
    if (!text.trim()) return;

    socket.emit("sendMessage", {
      user: username,
      text: text,
    });

    setText("");
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto" }}>
      <h2>💬 Live Chat</h2>

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
            <b>{m.user}:</b> {m.text}
          </p>
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
