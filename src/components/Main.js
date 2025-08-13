import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const Main = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // --- chat state ---
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { id: "m0", sender: "system", text: "Welcome! Ask anything." },
  ]);

  // draft attachments (for the message being composed)
  const [draftAttachments, setDraftAttachments] = useState([]); // {id, src, name, size, file}

  // refs
  const chatListRef = useRef(null);
  const filePickerRef = useRef(null);
  const createdUrlsRef = useRef([]); // track object URLs to revoke

  // --- handlers ---
  function handlePickImages(e) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const newAtts = files.map((file) => {
      const url = URL.createObjectURL(file);
      createdUrlsRef.current.push(url);
      return {
        id: crypto.randomUUID?.() ?? String(Date.now() + Math.random()),
        src: url,
        name: file.name,
        size: file.size,
        file,
      };
    });
    setDraftAttachments((prev) => [...prev, ...newAtts]);
    // allow re-selecting the same file later
    e.target.value = "";
  }

  function removeAttachment(id) {
    setDraftAttachments((prev) => {
      const toRemove = prev.find((a) => a.id === id);
      if (toRemove?.src) URL.revokeObjectURL(toRemove.src);
      return prev.filter((a) => a.id !== id);
    });
  }

  // cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      createdUrlsRef.current.forEach((u) => URL.revokeObjectURL(u));
    };
  }, []);

  // autoscroll on new messages
  useEffect(() => {
    if (!chatListRef.current) return;
    chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
  }, [chatMessages]);

  // send message (now supports text + attachments)
  function sendMessage(e) {
    e?.preventDefault?.();
    const text = chatInput.trim();
    if (!text && draftAttachments.length === 0) return;

    const attachments = draftAttachments.map((a) => ({
      kind: "image",
      src: a.src,
      name: a.name,
      size: a.size,
    }));

    const msg = {
      id: crypto.randomUUID?.() ?? String(Date.now()),
      sender: "me",
      text,
      attachments, // may be []
    };

    setChatMessages((prev) => [...prev, msg]);
    setChatInput("");
    setDraftAttachments([]); // clear preview
  }

  // auth / user data
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
      if (userDoc.exists()) setUserData(userDoc.data());
    };
    fetchUserData();
  }, [navigate]);

  if (!userData) return <div>Loading user data...</div>;

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f7f7f7",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div
        style={{
          backgroundColor: "#B39384",
          padding: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ color: "white", fontWeight: "bold" }}>
          <div>AI-Powered</div>
          <div>Design Assistant</div>
        </div>
        <h1 style={{ color: "white", margin: 0 }}>ROOMIFY</h1>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <input
            type="text"
            placeholder="Chat History"
            style={{
              padding: "8px 12px",
              borderRadius: "20px",
              border: "1px solid #ccc",
              width: "160px",
            }}
            readOnly
          />
          <span style={{ cursor: "pointer" }}>❓ Help</span>
        </div>
      </div>

      {/* Navigation */}
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <span>Welcome, {userData.fullName}</span>
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            borderRadius: "6px",
            padding: "8px 16px",
            cursor: "pointer",
          }}
        >
          Log Out
        </button>
      </div>

      {/* Chat area */}
      <div
        style={{
          flex: 1,
          padding: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            border: "1px solid #ddd",
            borderRadius: "8px",
            width: "90%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            padding: "20px",
            gap: "20px",
          }}
        >
          {/* Chat Bubbles */}
          <div
            ref={chatListRef}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              height: "340px",
              overflowY: "auto",
              paddingRight: "6px",
            }}
          >
            {chatMessages.map((m) => {
              const isMe = m.sender === "me";
              const hasAttachments = Array.isArray(m.attachments) && m.attachments.length > 0;

              // Back-compat: if an older message is 'image'-only
              if (!hasAttachments && m.type === "image") {
                return (
                  <div
                    key={m.id}
                    style={{ display: "flex", justifyContent: isMe ? "flex-end" : "flex-start" }}
                  >
                    <div
                      style={{
                        maxWidth: "70%",
                        background: isMe ? "#DCFCE7" : "#F3F4F6",
                        border: "1px solid #e5e7eb",
                        borderRadius: 14,
                        padding: 8,
                      }}
                    >
                      <img
                        src={m.src}
                        alt={m.name || "image"}
                        style={{ maxWidth: "100%", height: "auto", borderRadius: 10, display: "block" }}
                        onClick={() => window.open(m.src, "_blank")}
                      />
                      {m.name ? (
                        <div style={{ fontSize: 12, opacity: 0.7, marginTop: 6 }}>{m.name}</div>
                      ) : null}
                    </div>
                  </div>
                );
              }

              // Standard text + optional attachments message
              return (
                <div
                  key={m.id}
                  style={{ display: "flex", justifyContent: isMe ? "flex-end" : "flex-start" }}
                >
                  <div
                    style={{
                      maxWidth: "70%",
                      border: "1px solid #e5e7eb",
                      background: isMe ? "#DCFCE7" : "#F3F4F6",
                      borderRadius: 14,
                      padding: 10,
                    }}
                  >
                    {m.text ? (
                      <div
                        style={{
                          whiteSpace: "pre-wrap",
                          wordBreak: "break-word",
                          fontSize: 14,
                          marginBottom: hasAttachments ? 8 : 0,
                        }}
                      >
                        {m.text}
                      </div>
                    ) : null}

                    {hasAttachments ? (
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
                          gap: 8,
                        }}
                      >
                        {m.attachments.map((att, i) =>
                          att.kind === "image" ? (
                            <img
                              key={i}
                              src={att.src}
                              alt={att.name || "image"}
                              style={{
                                width: "100%",
                                height: 120,
                                objectFit: "cover",
                                borderRadius: 10,
                                display: "block",
                                cursor: "pointer",
                              }}
                              onClick={() => window.open(att.src, "_blank")}
                            />
                          ) : null
                        )}
                      </div>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Composer */}
          <form onSubmit={sendMessage} style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: "auto" }}>
            {/* Draft attachment preview */}
            {draftAttachments.length > 0 && (
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  overflowX: "auto",
                  padding: 6,
                  border: "1px dashed #d1d5db",
                  borderRadius: 10,
                }}
              >
                {draftAttachments.map((a) => (
                  <div key={a.id} style={{ position: "relative", flex: "0 0 auto" }}>
                    <img
                      src={a.src}
                      alt={a.name || "attachment"}
                      style={{ width: 90, height: 90, objectFit: "cover", borderRadius: 8, display: "block" }}
                    />
                    <button
                      type="button"
                      onClick={() => removeAttachment(a.id)}
                      title="Remove"
                      style={{
                        position: "absolute",
                        top: -8,
                        right: -8,
                        width: 22,
                        height: 22,
                        borderRadius: "50%",
                        border: "1px solid #ccc",
                        background: "#fff",
                        cursor: "pointer",
                        lineHeight: "20px",
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div style={{ display: "flex", gap: 20 }}>
              <button
                type="button"
                onClick={() => filePickerRef.current?.click()}
                style={{
                  padding: "10px 20px",
                  border: "1px solid #ccc",
                  borderRadius: "6px",
                  background: "#fff",
                  cursor: "pointer",
                }}
              >
                Insert Image
              </button>

              <input
                ref={filePickerRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handlePickImages}
                style={{ display: "none" }}
              />

              <input
                type="text"
                placeholder="Type here..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                style={{
                  padding: "10px 12px",
                  borderRadius: "20px",
                  border: "1px solid #ccc",
                  flex: 1,
                  minWidth: 0,
                }}
              />

              <button
                type="submit"
                style={{
                  padding: "10px 20px",
                  border: "1px solid #ccc",
                  borderRadius: "6px",
                  background: "#fff",
                  cursor: "pointer",
                }}
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Main;
