import { useEffect, useState } from "react";
import { getPosts } from "../api";
import PostList from "../components/PostList";

export default function Home() {
  const username = localStorage.getItem("username");

  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadPosts();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  async function loadPosts() {
    if (loading) return;
    setLoading(true);

    const data = await getPosts();
    setPosts(prev => [...prev, ...data]);
    setPage(prev => prev + 1);

    setLoading(false);
  }

  function handleScroll() {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 100
    ) {
      loadPosts();
    }
  }

  function logout() {
    localStorage.clear();
    window.location.href = "/login";
  }

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <h2>🐱 Zinger Cat</h2>
        <p>Welcome, <b>{username}</b></p>

        <button onClick={() => window.location.href = `/profile/${username}`}>
          👤 My Profile
        </button>
        <button onClick={logout} style={{ marginLeft: 10 }}>
          🚪 Logout
        </button>
      </div>

      {/* Feed */}
      <PostList posts={posts} />

      {loading && <p>Loading more posts...</p>}
    </div>
  );
}
