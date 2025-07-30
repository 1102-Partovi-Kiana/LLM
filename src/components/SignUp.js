import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      // 1. Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredential.user;

      // 2. Set display name in Firebase Auth
      await updateProfile(user, { displayName: formData.fullName });

      // 3. Save user info to Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        fullName: formData.fullName,
        username: formData.username,
        email: formData.email,
        createdAt: new Date().toISOString()
      });

      // 4. Redirect to dashboard
      navigate("/main");
    } catch (err) {
      console.error("Signup error:", err);
      alert(err.message);
    }
  };

  return (
    <div style={{ height: "100vh", display: "flex", backgroundColor: "#f4f4f4", alignItems: "center", justifyContent: "center" }}>
      <div style={{ backgroundColor: "#fff", padding: "40px", borderRadius: "12px", width: "400px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}>
        <h2 style={{ textAlign: "center", marginBottom: "30px", color: "#B39384" }}>Sign Up</h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
            style={inputStyle}
          />
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
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
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
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <button type="submit" style={{ ...inputStyle, backgroundColor: "#B39384", color: "white", border: "none", cursor: "pointer" }}>
            Create Account
          </button>
          <button onClick={() => navigate("/login")} style={inputStyle}>
            Already have an account? Log in
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

export default SignUp;
