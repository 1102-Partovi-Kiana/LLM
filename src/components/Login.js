import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "Arial, sans-serif" }}>
      {/* Left side */}
      <div
        style={{
          flex: 1,
          backgroundColor: "#B39384",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1 style={{ color: "white", fontWeight: "bold", fontSize: "40px" }}>ROOMIFY</h1>
      </div>

      {/* Right side */}
      <div
        style={{
          flex: 1,
          backgroundColor: "#FFFFFF",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px",
        }}
      >
        <div style={{ textAlign: "left", width: "100%", maxWidth: "400px" }}>
          <h2 style={{ color: "#B39384", fontSize: "20px", marginBottom: "40px" }}>
            AI-Powered <br />
            Design Assistant
          </h2>
        </div>

        <div style={{ display: "flex", gap: "20px" }}>
          <button
            onClick={() => navigate("/main")}
            style={{
              padding: "24px 40px",
              fontSize: "16px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              background: "#ffffff",
              cursor: "pointer",
            }}
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            style={{
              padding: "24px 40px",
              fontSize: "16px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              background: "#f1f1f1",
              cursor: "pointer",
            }}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
