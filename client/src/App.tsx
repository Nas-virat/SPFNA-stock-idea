import React from 'react';
import {BrowserRouter as Router,Routes, Route } from "react-router-dom";

// page
import Allidea from './pages/allidea/Allidea';
import Writeidea from './pages/allidea/writeidea/Writeidea';
import ConvertCurrency from './pages/currency/ConvertCurrency';
import Homepage from './pages/homepage/Homepage';
import Leaderboard from './pages/leaderboard/Leaderboard';
import Login from './pages/login/Login';
import Portfolio from './pages/portfolio/Portfolio';
import Profile from './pages/profile/Profile';
import Register from './pages/register/Register';
import Admincontrol from './pages/admincontrol/Admincontrol';
import ProtectRoute from './globalcomponents/ProtectRoute';
// globalcomponent

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage/>}/> 
        <Route path="/home" element={
          <ProtectRoute>
            <Homepage/>
          </ProtectRoute>
        }/> 
        <Route path="/idea" element={<Allidea/>}/> 
        <Route path="/idea/post" element={<Writeidea/>}/> 
        <Route path="/convertcurrency" element={<ConvertCurrency/>}/> 
        <Route path="/leaderboard" element={<Leaderboard/>}/> 
        <Route path="/login" element={<Login/>}/> 
        <Route path="/myport" element={<Portfolio/>}/> 
        <Route path="/otherport" element={<Portfolio/>}/> 
        <Route path="/profile" element={<Profile/>}/> 
        <Route path="/register" element={<Register/>}/> 
        <Route path="/admincontrol" element={<Admincontrol/>}/>
      </Routes>
    </Router>
  );
}

export default App;
