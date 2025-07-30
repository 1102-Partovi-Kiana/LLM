import React from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./components/Landing";
import Main from "./components/Main";
import SignUp from "./components/SignUp";
import LoginForm from "./components/LoginForm";
import FurnitureSwiper from "./components/FurnitureSwiper";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/main" element={<Main />} />
        <Route path="/furniture" element={<FurnitureSwiper />} />
      </Routes>
    </Router>
  );
}

export default App;

