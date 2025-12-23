import api from "../api";

export default function AddFriendIcon({ username, friends }) {
  // If already friend → show nothing
  if (friends.includes(username)) return null;

  const sendRequest = async () => {
    await api.post(`/friends/request/${username}`);
    alert("Friend request sent");
  };

  return (
    <span
      onClick={sendRequest}
      style={{
        marginLeft: 8,
        cursor: "pointer",
        color: "green",
        fontWeight: "bold"
      }}
      title="Add Friend"
    >
      ➕
    </span>
  );
}
