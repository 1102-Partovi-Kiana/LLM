import React from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Main from "./components/Main";
import SignUp from "./components/SignUp";
import FurnitureSwiper from "./components/FurnitureSwiper";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Main" element={<Main />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/furniture" element={<FurnitureSwiper />} />
      </Routes>
    </Router>
  );
}

export default App;

