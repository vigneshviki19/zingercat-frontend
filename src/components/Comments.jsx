import { useEffect, useState } from "react";
import { getComments, addComment } from "../api";

export default function Comments({ postId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const data = await getComments(postId);
    setComments(data);
  }

  async function submit(parentComment = null) {
    if (!text.trim()) return;

    await addComment({
      postId,
      content: text,
      parentComment
    });

    setText("");
    load();
  }

  return (
    <div style={{ marginTop: 10 }}>
      <input
        placeholder="Write a comment…"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ width: "100%", padding: 6 }}
      />
      <button onClick={() => submit(null)}>Comment</button>

      {comments
        .filter((c) => !c.parentComment)
        .map((c) => (
          <div key={c._id} style={{ marginTop: 10 }}>
            <b>@{c.author}</b>
            <p>{c.content}</p>

            {/* Replies */}
            {comments
              .filter((r) => r.parentComment === c._id)
              .map((r) => (
                <div
                  key={r._id}
                  style={{
                    marginLeft: 20,
                    borderLeft: "2px solid #ddd",
                    paddingLeft: 10
                  }}
                >
                  <b>@{r.author}</b>
                  <p>{r.content}</p>
                </div>
              ))}

            <button
              onClick={() => submit(c._id)}
              style={{ fontSize: 12 }}
            >
              Reply
            </button>
          </div>
        ))}
    </div>
  );
}
