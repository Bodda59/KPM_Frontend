import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import "./Chatbot.css";

const INITIAL_MESSAGES = [
    {
        id: 1,
        role: "assistant",
        text: "👋 Hello! I'm your KPM AI Assistant. I can help you with lessons, projects, and knowledge management. How can I assist you today?",
    },
];

function Chatbot() {
    const navigate = useNavigate();
    const { theme } = useTheme();

    // Load chats from localStorage, or set default initial chat
    const [chats, setChats] = useState(() => {
        const saved = localStorage.getItem("kpm_all_chats");
        if (saved) {
            return JSON.parse(saved);
        }
        return [
            {
                id: "chat_default",
                title: "Welcome Chat",
                messages: INITIAL_MESSAGES
            }
        ];
    });

    // Load active chat ID from localStorage
    const [activeChatId, setActiveChatId] = useState(() => {
        const savedActive = localStorage.getItem("kpm_active_chat_id");
        return savedActive || "chat_default";
    });

    const [input, setInput] = useState("");
    const bottomRef = useRef(null);

    // Save chats to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem("kpm_all_chats", JSON.stringify(chats));
    }, [chats]);

    // Save active chat ID to localStorage
    useEffect(() => {
        localStorage.setItem("kpm_active_chat_id", activeChatId);
    }, [activeChatId]);

    // Find active chat or default to the first chat
    const activeChat = chats.find((c) => c.id === activeChatId) || chats[0] || {
        id: "chat_default",
        title: "Welcome Chat",
        messages: INITIAL_MESSAGES
    };

    const messages = activeChat.messages;

    // Scroll to the bottom of message list
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleNewChat = () => {
        const newChatId = "chat_" + Date.now();
        const newChat = {
            id: newChatId,
            title: `Chat ${chats.length + 1}`,
            messages: INITIAL_MESSAGES
        };
        setChats((prev) => [newChat, ...prev]);
        setActiveChatId(newChatId);
    };

    const handleSend = () => {
        const trimmed = input.trim();
        if (!trimmed) return;

        const userMsg = { id: Date.now(), role: "user", text: trimmed };
        const botMsg = {
            id: Date.now() + 1,
            role: "assistant",
            text: "🔧 Backend not connected yet. Your message has been received and will be processed once the AI service is integrated.",
        };

        setChats((prevChats) => {
            return prevChats.map((c) => {
                if (c.id === activeChat.id) {
                    // Update chat title based on the first user query if it's default title
                    let newTitle = c.title;
                    if (c.messages.length === 1 && c.title.startsWith("Chat ")) {
                        newTitle = trimmed.slice(0, 30) + (trimmed.length > 30 ? "..." : "");
                    }
                    return {
                        ...c,
                        title: newTitle,
                        messages: [...c.messages, userMsg, botMsg]
                    };
                }
                return c;
            });
        });
        setInput("");
    };

    const handleDeleteChat = (idToDelete, e) => {
        e.stopPropagation(); // Prevent selecting the deleted chat
        if (chats.length === 1) {
            alert("You must keep at least one chat conversation.");
            return;
        }
        if (window.confirm("Are you sure you want to delete this chat conversation?")) {
            const remainingChats = chats.filter((c) => c.id !== idToDelete);
            setChats(remainingChats);

            // Switch active chat if the deleted one was selected
            if (activeChat.id === idToDelete) {
                setActiveChatId(remainingChats[0].id);
            }
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className={`chatbot-container ${theme}-mode`}>
            <div className="chatbot-inner">
                {/* Left Sidebar for Chat History */}
                <aside className="chatbot-sidebar">
                    <button className="chatbot-new-chat-btn" onClick={handleNewChat}>
                        + New Chat
                    </button>
                    <div className="chatbot-history-list">
                        {chats.map((chat) => (
                            <div
                                key={chat.id}
                                className={`chatbot-history-item ${chat.id === activeChat.id ? "active" : ""}`}
                                onClick={() => setActiveChatId(chat.id)}
                            >
                                <span className="chatbot-history-icon">💬</span>
                                <span className="chatbot-history-title" title={chat.title}>{chat.title}</span>
                                <button
                                    className="chatbot-history-delete-btn"
                                    onClick={(e) => handleDeleteChat(chat.id, e)}
                                    title="Delete Chat"
                                >
                                    🗑️
                                </button>
                            </div>
                        ))}
                    </div>
                </aside>

                {/* Right Chat Window */}
                <div className="chatbot-window">
                    {/* Header */}
                    <div className="chatbot-header">
                        <button
                            className="chatbot-back-btn"
                            onClick={() => navigate("/lessons")}
                        >
                            ← Back
                        </button>
                        <div className="chatbot-header-info">
                            <div className="chatbot-avatar">🤖</div>
                            <div>
                                <h1 className="chatbot-title">{activeChat.title}</h1>
                                <span className="chatbot-status">
                                    <span className="chatbot-status-dot" /> Online
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="chatbot-messages">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`chatbot-bubble-row ${msg.role === "user" ? "chatbot-bubble-row--user" : ""}`}
                            >
                                {msg.role === "assistant" && (
                                    <div className="chatbot-bubble-avatar">🤖</div>
                                )}
                                <div
                                    className={`chatbot-bubble ${msg.role === "user" ? "chatbot-bubble--user" : "chatbot-bubble--bot"}`}
                                >
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        <div ref={bottomRef} />
                    </div>

                    {/* Input Area */}
                    <div className="chatbot-input-area">
                        <textarea
                            className="chatbot-input"
                            placeholder="Type your message… (Enter to send)"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            rows={1}
                        />
                        <button
                            className="chatbot-send-btn"
                            onClick={handleSend}
                            disabled={!input.trim()}
                        >
                            ➤
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chatbot;
