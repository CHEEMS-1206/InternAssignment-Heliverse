import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddDetails from "./PageComponents/AddDetails.js";
import LandingPage from "./PageComponents/LandingPage.js";
import LoginPage from "./PageComponents/Loginpage.js";
import RegisterPage from "./PageComponents/RegisterPage.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/add-details" element={<AddDetails />} />
        <Route path="/list-all-users" element={<LandingPage/> } />
        <Route path="*" element={<div>Wrong Routes</div>} />
      </Routes>
    </Router>
  );
}

export default App;