import React from "react";
import { useNavigate } from "react-router-dom";
import "./FloatingChatbot.css";

function FloatingChatbot() {
    const navigate = useNavigate();

    return (
        <button
            className="floating-chatbot-btn"
            onClick={() => navigate("/chatbot")}
            title="Open AI Assistant"
            aria-label="Open AI chatbot assistant"
        >
            <span className="floating-chatbot-icon">🤖</span>
            <span className="floating-chatbot-pulse" />
        </button>
    );
}

export default FloatingChatbot;
