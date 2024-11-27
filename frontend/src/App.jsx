import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import LoginSignup from "./components/LoginSignup";
import Dashboard from "./components/Dashboard";

const App = () => {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/home" element={<Home/>}/>
        <Route path="/" element={<LoginSignup/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
    </Router>
    </>
  );
};

export default App;
