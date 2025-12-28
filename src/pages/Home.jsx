import { useEffect, useState } from "react";
import { getPosts } from "../api";
import CreatePost from "../components/CreatePost";

export default function Home() {
  const [posts, setPosts] = useState([]);

  const loadPosts = async () => {
    const data = await getPosts();
    setPosts(data || []);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <div style={{ maxWidth: 600, margin: "auto" }}>
      <h2>🐱 Zinger Cat Feed</h2>

      <CreatePost onPost={loadPosts} />

      {posts.map((post) => (
        <div key={post._id} style={{ marginBottom: 30 }}>
          <strong>@{post.author}</strong>

          <p>{post.content}</p>

          {post.image && (
            <img
              src={`https://zingercat-backend.onrender.com${post.image}`}
              alt="post"
              style={{ width: "100%", borderRadius: 10 }}
            />
          )}

          <small>{new Date(post.createdAt).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
}
