import { useEffect, useState } from "react";
import api from "../api";

export default function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.get("/posts").then(res => setPosts(res.data));
  }, []);

  return (
    <div>
      <h1>Zinger Cat 🐱</h1>
      {posts.map(p => (
        <div key={p._id}>
          <h3>{p.title}</h3>
          <p>{p.description}</p>
          <small>{p.category} • {p.createdBy}</small>
        </div>
      ))}
    </div>
  );
}
