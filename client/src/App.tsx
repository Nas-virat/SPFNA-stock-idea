import React from 'react';
import {BrowserRouter as Router,Routes, Route } from "react-router-dom";

// page
import Allidea from './pages/allidea/Allidea';
import Writeidea from './pages/allidea/writeidea/Writeidea';
import Viewpost from './pages/viewpost/Viewpost';
import ConvertCurrency from './pages/currency/ConvertCurrency';
import Homepage from './pages/homepage/Homepage';
import Leaderboard from './pages/leaderboard/Leaderboard';
import Login from './pages/login/Login';
import Portfolio from './pages/portfolio/Portfolio';
import OtherPortfolio from './pages/portfolio/OtherPortfolio';
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
        <Route path="/home" element={<Homepage/>}/> 
        <Route path="/idea" element={<Allidea/>}/> 
        <Route path="/idea/post" element={<ProtectRoute><Writeidea/></ProtectRoute>}/> 
        <Route path="/idea/post/:id" element={<Viewpost/>}/>
        <Route path="/convertcurrency" element={<ProtectRoute><ConvertCurrency/></ProtectRoute>}/> 
        <Route path="/leaderboard" element={<Leaderboard/>}/> 
        <Route path="/login" element={<Login/>}/> 
        <Route path="/myport" element={<ProtectRoute><Portfolio/></ProtectRoute>}/> 
        <Route path="/otherport/:id" element={<ProtectRoute><OtherPortfolio/></ProtectRoute>}/> 
        <Route path="/profile" element={<ProtectRoute><Profile/></ProtectRoute>}/> 
        <Route path="/register" element={<Register/>}/>
        <Route path="/admincontrol" element={<ProtectRoute><Admincontrol/></ProtectRoute>}/>
      </Routes>
    </Router>
  );
}

export default App;
