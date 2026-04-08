import React, { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client'; // Assume you have set up socket.io correctly

const Chat = () => {
  const [friends, setFriends] = useState([]);
  const [unreadMessages, setUnreadMessages] = useState({});
  const socket = Socket('your_socket_endpoint'); // Replace with your socket endpoint

  useEffect(() => {
    // Fetch friends list
    const fetchFriends = async () => {
      // Assume you have an API to get friends
      const response = await fetch('/api/friends');
      const data = await response.json();
      setFriends(data);
    };

    fetchFriends();

    // Listen for unread messages
    socket.on('unreadMessage', (friendId) => {
      setUnreadMessages((prev) => ({
        ...prev,
        [friendId]: (prev[friendId] || 0) + 1,
      }));
    });

    return () => {
      socket.off('unreadMessage');
    };
  }, [socket]);

  const handleFriendClick = (friendId) => {
    // Navigate to private chat
    // Assume you have a method to navigate
    navigate(`/chat/${friendId}`);
  };

  return (
    <div className="chat-container">
      <div className="sidebar">
        {friends.map((friend) => (
          <div key={friend.id} className="friend" onClick={() => handleFriendClick(friend.id)}>
            {friend.name}
            {unreadMessages[friend.id] > 0 && (
              <span className="badge">{unreadMessages[friend.id]}</span>
            )}
          </div>
        ))}
      </div>
      <div className="chat-window">
        {/* Chat window implementation */}
      </div>
    </div>
  );
};

export default Chat;