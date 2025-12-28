import { useState } from "react";
import { createPost } from "../api";

export default function CreatePost({ onPost }) {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async () => {
    if (!content.trim()) return;

    const formData = new FormData();
    formData.append("content", content);
    if (image) formData.append("image", image);

    await createPost(formData);
    setContent("");
    setImage(null);
    onPost();
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <textarea
        placeholder="What's on your mind? 🐾"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{ width: "100%", height: 80 }}
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />

      <button onClick={handleSubmit}>Post</button>
    </div>
  );
}
