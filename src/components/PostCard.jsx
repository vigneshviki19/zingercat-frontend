export default function PostCard({ post }) {
  return (
    <div style={{
      border: "1px solid #ddd",
      borderRadius: 10,
      padding: 15,
      marginBottom: 20,
      background: "#fff"
    }}>
      {/* Header */}
      <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
        <img
          src={post.authorAvatar || "https://via.placeholder.com/40"}
          alt="profile"
          style={{ width: 40, height: 40, borderRadius: "50%" }}
        />
        <div>
          <strong>@{post.author}</strong>
          <div style={{ fontSize: 12, color: "#666" }}>
            {post.authorDept || "Dept"} | {post.authorCollege || "College"}
          </div>
          <div style={{ fontSize: 11, color: "#999" }}>
            {new Date(post.createdAt).toLocaleString()}
          </div>
        </div>
      </div>

      {/* Content */}
      <p style={{ marginBottom: 10 }}>{post.content}</p>

      {/* Actions */}
      <div style={{ display: "flex", gap: 20, fontSize: 14 }}>
        <span style={{ cursor: "pointer" }}>❤️ Like</span>
        <span style={{ cursor: "pointer" }}>💬 Comment</span>
        <span style={{ cursor: "pointer" }}>🔁 Share</span>
      </div>
    </div>
  );
}
