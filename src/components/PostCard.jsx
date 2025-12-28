export default function PostCard({ post }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        background: "#fff"
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 10 }}>
        <strong>@{post.author}</strong>
        <div style={{ fontSize: 12, color: "#777" }}>
          {new Date(post.createdAt).toLocaleString()}
        </div>
      </div>

      {/* Content */}
      <p style={{ marginBottom: 10 }}>{post.content}</p>

      {/* Actions */}
      <div style={{ display: "flex", gap: 20 }}>
        <span>❤️ Like</span>
        <span>💬 Comment</span>
        <span>🔁 Share</span>
      </div>
    </div>
  );
}
