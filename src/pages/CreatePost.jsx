import { useState } from "react";
import api from "../api";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("news");

  const create = async () => {
    await api.post("/posts", {
      title,
      description,
      category,
      createdBy: "Anonymous"
    });
    alert("Post created");
  };

  return (
    <div>
      <h2>Create Post</h2>
      <input placeholder="Title" onChange={e => setTitle(e.target.value)} />
      <textarea placeholder="Description" onChange={e => setDescription(e.target.value)} />
      <select onChange={e => setCategory(e.target.value)}>
        <option value="news">News</option>
        <option value="buy">Buy</option>
        <option value="sell">Sell</option>
        <option value="exchange">Exchange</option>
        <option value="help">Help</option>
      </select>
      <button onClick={create}>Post</button>
    </div>
  );
}
