import { useEffect, useState } from "react";
import { getPosts } from "../api";
import { useParams } from "react-router-dom";

export default function UserPosts() {
  const { username } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const all = await getPosts();
    setPosts(all.filter((p) => p.author === username));
  }

  return (
    <div style={{ maxWidth: 600, margin: "auto" }}>
      <h2>@{username}'s Posts</h2>
      {posts.map((p) => (
        <div key={p._id} style={{ marginBottom: 20 }}>
          <p>{p.content}</p>
          {p.image && <img src={p.image} width="100%" />}
        </div>
      ))}
    </div>
  );
}
