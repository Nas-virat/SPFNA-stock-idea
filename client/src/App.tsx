import React from 'react';
import {BrowserRouter as Router,Routes, Route } from "react-router-dom";

// page
import Allidea from './pages/allidea/Allidea';
import Writeidea from './pages/allidea/writeidea/Writeidea';
import ConvertCurrency from './pages/currency/ConvertCurrency';
import Homepage from './pages/homepage/Homepage';
import Leaderboard from './pages/leaderboard/Leaderboard';
import Login from './pages/login/Login';
import Myportfolio from './pages/portfolio/Myportfolio';
import Otherportfolio from './pages/portfolio/Otherportfolio';
import Profile from './pages/profile/Profile';
import Register from './pages/register/Register';
// globalcomponent

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Homepage/>}/> 
        <Route path="/idea" element={<Allidea/>}/> 
        <Route path="/idea/post" element={<Writeidea/>}/> 
        <Route path="/convertcurrency" element={<ConvertCurrency/>}/> 
        <Route path="/leaderboard" element={<Leaderboard/>}/> 
        <Route path="/login" element={<Login/>}/> 
        <Route path="/myport" element={<Myportfolio/>}/> 
        <Route path="/otherport" element={<Otherportfolio/>}/> 
        <Route path="/profile" element={<Profile/>}/> 
        <Route path="/register" element={<Register/>}/> 
      </Routes>
    </Router>
  );
}

export default App;
