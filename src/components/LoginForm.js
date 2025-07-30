import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      navigate("/main");
    } catch (err) {
      console.error("Login error:", err);
      alert("Invalid email or password.");
    }
  };

  return (
    <div style={{ height: "100vh", display: "flex", backgroundColor: "#f4f4f4", alignItems: "center", justifyContent: "center" }}>
      <div style={{ backgroundColor: "#fff", padding: "40px", borderRadius: "12px", width: "400px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}>
        <h2 style={{ textAlign: "center", marginBottom: "30px", color: "#B39384" }}>Login</h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <button type="submit" style={{ ...inputStyle, backgroundColor: "#B39384", color: "white", border: "none", cursor: "pointer" }}>
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

const inputStyle = {
  padding: "12px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "16px"
};

export default LoginForm;
