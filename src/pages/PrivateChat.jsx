import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";

const socket = io("https://zingercat-backend.onrender.com", {
  transports: ["websocket"]
});

export default function PrivateChat() {
  const { user } = useParams(); // receiver
  const sender = localStorage.getItem("username");

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const roomId = [sender, user].sort().join("_");

  useEffect(() => {
    socket.emit("joinPrivate", { roomId });

    socket.on("privateHistory", (history) => {
      setMessages(history);
    });

    socket.on("receivePrivate", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("privateHistory");
      socket.off("receivePrivate");
    };
  }, [roomId]);

  const sendMessage = () => {
    if (!text.trim()) return;

    socket.emit("sendPrivate", {
      roomId,
      sender,
      receiver: user,
      message: text
    });

    setText("");
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto" }}>
      <h2>💬 Chat with {user}</h2>

      <div
        style={{
          height: 300,
          border: "1px solid #ccc",
          padding: 10,
          overflowY: "auto",
          marginBottom: 10
        }}
      >
        {messages.map((m, i) => (
          <p key={i}>
            <b>{m.sender}:</b> {m.message}
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
