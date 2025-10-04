import React, { useState, useRef, useEffect } from "react";
import "./Bot.css";

function AdminBot() {
  const messagesEndRef = useRef(null);

  // Load chat history from localStorage
  const [messages, setMessages] = useState(() => {
    const savedChats = localStorage.getItem("adminChatHistory");
    return savedChats
      ? JSON.parse(savedChats)
      : [
          {
            sender: "bot",
            text: "Hello 👋! I'm your AI Admin Assistant. I can help you cancel or reschedule appointments.",
            timestamp: new Date(),
          },
        ];
  });

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages]);

  // Save messages in localStorage whenever updated
  useEffect(() => {
    localStorage.setItem("adminChatHistory", JSON.stringify(messages));
  }, [messages]);

  // ✅ Use deployed backend
  const API_BASE = "https://time-bot-backend-2.onrender.com/api";

  // Send message to backend
  const sendMessage = async (adminMessage) => {
    const adminId = localStorage.getItem("adminId");
    if (!adminId) {
      alert("Admin ID not found! Please login.");
      return;
    }

    const userMsg = { sender: "user", text: adminMessage, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const res = await fetch(`${API_BASE}/admin/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: adminMessage, adminId }),
      });
      const data = await res.json();
      const botReply = data?.reply || "❌ Sorry, I couldn't understand that.";
      const botMsg = { sender: "bot", text: botReply, timestamp: new Date() };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      const errorMsg = {
        sender: "bot",
        text: `❌ Server error: ${err.message}`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
      scrollToBottom();
    }
  };

  // Handle send button or Enter key
  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input.trim());
    setInput("");
  };

  // Start a new chat session
  const handleNewChat = async () => {
    const adminId = localStorage.getItem("adminId");
    if (adminId) {
      try {
        await fetch(`${API_BASE}/admin/reset-session`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ adminId }),
        });
      } catch (err) {
        console.error("Reset session error:", err);
      }
    }

    const defaultMsg = [
      {
        sender: "bot",
        text: "Hello 👋! I'm your AI Admin Assistant. You can cancel or reschedule appointments.",
        timestamp: new Date(),
      },
    ];
    setMessages(defaultMsg);
    localStorage.setItem("adminChatHistory", JSON.stringify(defaultMsg));
    scrollToBottom();
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h3>💬 Admin Chat Assistant</h3>
        <div className="chat-header-buttons">
          <button onClick={handleNewChat}>New Chat</button>
        </div>
      </div>

      {/* Chat Box */}
      <div className="chat-box">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`message ${msg.sender === "user" ? "user-message" : "bot-message"}`}
          >
            <div className="message-content">
              <p>{msg.text}</p>
              <span className="message-time">
                {new Date(msg.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="message bot-message">
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <div className="input-box">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend} disabled={!input.trim()} className="send-button">
          Send
        </button>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <button onClick={() => sendMessage("cancel")}>Cancel Appointment</button>
        <button onClick={() => sendMessage("reschedule")}>Reschedule Appointment</button>
      </div>
    </div>
  );
}

export default AdminBot;
