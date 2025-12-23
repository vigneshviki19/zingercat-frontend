import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";

const socket = io("https://zingercat-backend.onrender.com");

export default function Chat() {
  const { username } = useParams();
  const me = localStorage.getItem("username");

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    socket.emit("join", me);

    socket.on("privateMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.off("privateMessage");
  }, []);

  const send = () => {
    socket.emit("privateMessage", {
      from: me,
      to: username,
      message: text
    });
    setMessages([...messages, { from: me, message: text }]);
    setText("");
  };

  return (
    <div>
      <h2>Chat with @{username}</h2>

      {messages.map((m, i) => (
        <p key={i}>
          <b>{m.from}:</b> {m.message}
        </p>
      ))}

      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={send}>Send</button>
    </div>
  );
}
