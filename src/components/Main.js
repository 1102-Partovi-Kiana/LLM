import React from "react";

const Main = () => {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f7f7f7", height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{ backgroundColor: "#B39384", padding: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
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
          />
          <span style={{ cursor: "pointer" }}>❓ Help</span>
        </div>
      </div>

      {/* Navigation */}
      <div style={{ backgroundColor: "#f2f2f2", padding: "10px 20px" }}>
        <span style={{ fontWeight: "bold" }}>About Us</span>
      </div>

      {/* Chat area */}
      <div style={{ flex: 1, padding: "20px", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div style={{ backgroundColor: "white", border: "1px solid #ddd", borderRadius: "8px", width: "90%", height: "100%", display: "flex", flexDirection: "column", padding: "20px", gap: "20px" }}>
          {/* Chat Bubbles */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <div style={{ alignSelf: "flex-start", backgroundColor: "#f1f1f1", padding: "10px 15px", borderRadius: "10px", maxWidth: "300px" }}>
              Dawg, you gatta blow up that room...
            </div>

            <div style={{ alignSelf: "flex-end", textAlign: "right" }}>
              <img
                src="https://i.imgur.com/3QkZ5zQ.jpg" // <-- Replace with local image if needed
                alt="room"
                style={{ width: "150px", borderRadius: "6px" }}
              />
              <div style={{ backgroundColor: "#f1f1f1", padding: "10px 15px", borderRadius: "10px", marginTop: "5px", display: "inline-block" }}>
                Make my room cooler bru bru
              </div>
            </div>
          </div>

          {/* Input Bar */}
          <div style={{ display: "flex", gap: "20px", marginTop: "auto" }}>
            <button style={{ padding: "10px 20px", border: "1px solid #ccc", borderRadius: "6px", background: "#fff", cursor: "pointer" }}>
              Insert Image
            </button>
            <input
              type="text"
              placeholder="Type here..."
              style={{
                flex: 1,
                padding: "10px 15px",
                border: "1px solid #ccc",
                borderRadius: "6px",
              }}
            />
            <button style={{ padding: "10px 20px", border: "1px solid #ccc", borderRadius: "6px", background: "#fff", cursor: "pointer" }}>
              Ask anything
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
