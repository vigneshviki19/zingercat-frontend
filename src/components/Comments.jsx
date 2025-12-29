import { useEffect, useState } from "react";
import { getComments, addComment } from "../api";

export default function Comments({ postId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [replyTo, setReplyTo] = useState(null);

  useEffect(() => {
    loadComments();
  }, []);

  async function loadComments() {
    const data = await getComments(postId);
    setComments(data);
  }

  async function handleSubmit() {
    if (!text.trim()) return;

    await addComment({
      postId,
      text,
      parentId: replyTo
    });

    setText("");
    setReplyTo(null);
    loadComments();
  }

  // Recursive render (Reddit-style)
  function renderComments(parentId = null, level = 0) {
    return comments
      .filter(c => c.parentId === parentId)
      .map(c => (
        <div key={c._id} style={{ marginLeft: level * 20 }}>
          <div style={{ fontWeight: "bold" }}>@{c.author}</div>
          <div>{c.text}</div>

          <span
            style={{ fontSize: 12, cursor: "pointer", color: "blue" }}
            onClick={() => setReplyTo(c._id)}
          >
            Reply
          </span>

          {renderComments(c._id, level + 1)}
        </div>
      ));
  }

  return (
    <div style={{ marginTop: 10 }}>
      <textarea
        placeholder={replyTo ? "Reply..." : "Add a comment..."}
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ width: "100%" }}
      />
      <button onClick={handleSubmit}>
        {replyTo ? "Reply" : "Comment"}
      </button>

      <div style={{ marginTop: 10 }}>
        {renderComments()}
      </div>
    </div>
  );
}
