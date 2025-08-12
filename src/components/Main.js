import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import useGeminiChat from "../hooks/useGeminiChat";
import "./Main.css";

const Main = () => {
  const [userData, setUserData] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const { sendMessage } = useGeminiChat();

  const handleLogout = async () => {
    try {
      setLoading(true);
      await auth.signOut();
      navigate("/");
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (!user) {
        navigate("/");
        return;
      }

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        setUserData(userDoc.data());
      }
    };

    fetchUserData();
  }, [navigate]);

  if (!userData) return <div>Loading user data...</div>;

  const PanelToggleButton = ({ onClick }) => (
    <button className="panel-toggle" onClick={onClick}>
      {isPanelOpen ? "←" : "→"}
    </button>
  );

  
  return (
    <div className="main-container">
  <div className="main-header">
  <div className="main-header-title">
    <div className="brand-subtitle">AI-Powered</div>
    <div className="brand-title">Design Assistant</div>
  </div>

  <h1 className="main-h1">ROOMIFY</h1>
  <div className="main-help">
    {!isPanelOpen && <PanelToggleButton onClick={() => setIsPanelOpen(true)} />}
    <span>❓ Help</span>
  </div>
</div>

{/* Side panel */}
{isPanelOpen && (
  <div className="side-panel open">
    <PanelToggleButton onClick={() => setIsPanelOpen(false)} />
    <div className="panel-content">
      <p>Welcome, {userData.fullName}</p>
      <button onClick={handleLogout}>Log Out</button>
      <button onClick={() => navigate("/furniture")}>🪑 Try Furniture Swiper</button>
      <button>❓ Help</button>
    </div>
  </div>
)}



  <div className="chat-wrapper">
    <div className="chat-box">
      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`chat-bubble ${msg.role === "user" ? "user-message" : "ai-message"}`}
          >
            <div>{msg.text}</div>
            <div className="timestamp">12:34 PM</div>
          </div>
        ))}

      </div>

      <div className="chat-input-row">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type here..."
          className="chat-input"
        />
        <button
          onClick={async () => {
            if (!input.trim()) return;
            const userMessage = { role: "user", text: input };
            setMessages((prev) => [...prev, userMessage]);
            setInput("");

            const responseText = await sendMessage(input);
            const aiMessage = { role: "ai", text: responseText };
            setMessages((prev) => [...prev, aiMessage]);
          }}
          className="send-button"
        >
          Ask anything
        </button>
      </div>
    </div>
  </div>
</div>
  );
};

export default Main;

