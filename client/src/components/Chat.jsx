import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:8080");

const Chat = ({ user }) => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [connectedUsers, setConnectedUsers] = useState(0);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/messages");
                const data = await response.json();
                setMessages(data);
            } catch (err) {
                console.error("Error fetching messages:", err);
            }
        };

        fetchMessages();

        socket.on("receive_message", (newMessage) => {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        socket.on("update_user_count", (count) => {
            setConnectedUsers(count);
        });

        return () => {
            socket.off("receive_message");
            socket.off("update_user_count");
        };
    }, []);

    const sendMessage = () => {
        if (message.trim() !== "") {
            const chatMessage = {
                username: user.username,
                text: message,
            };
            socket.emit("send_message", chatMessage);
            setMessage("");
        }
    };

    return (
        <div className="chat-container">
            <p>Users online: {connectedUsers}</p>
            <div className="chat-messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`chat-message ${user.username === msg.username ? "self" : ""}`}>
                        <strong>{msg.user || msg.username} </strong>
                        {msg.text || msg.content}
                    </div>
                ))}
            </div>
            <div className="chat-input">
                <input
                    type="text"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Chat;
