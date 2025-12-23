import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";

const socket = io("https://zingercat-backend.onrender.com");

export default function Chat() {
  const { username } = useParams(); // chatting with
  const me = localStorage.getItem("username");

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => socket.off("receiveMessage");
  }, []);

  function sendMessage() {
    if (!text.trim()) return;

    socket.emit("sendMessage", {
      from: me,
      to: username,
      message: text
    });

    setText("");
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>💬 Chat with @{username}</h2>

      {messages.map((m, i) => (
        <p key={i}>
          <b>{m.from}:</b> {m.message}
        </p>
      ))}

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
