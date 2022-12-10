import React from 'react';
import {BrowserRouter as Router,Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'


// page
import Allidea from './pages/allidea/Allidea';
import Writeidea from './pages/writeidea/Writeidea';
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

const queryClient = new QueryClient()

function App() {
  return (
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" element={<Homepage/>}/> 
            <Route path="/home" element={<Homepage/>}/> 
            <Route path="/idea" element={<Allidea/>}/> 
            <Route path="/idea/add" element={<ProtectRoute><Writeidea/></ProtectRoute>}/>
            <Route path="/idea/add/:id" element={<ProtectRoute><Writeidea/></ProtectRoute>}/>  
            <Route path="/idea/post/:id" element={<Viewpost/>}/>
            <Route path="/convertcurrency" element={<ProtectRoute><ConvertCurrency/></ProtectRoute>}/> 
            <Route path="/leaderboard" element={<Leaderboard/>}/> 
            <Route path="/login" element={<Login/>}/> 
            <Route path="/myport" element={<ProtectRoute><Portfolio/></ProtectRoute>}/> 
            <Route path="/otherport/:id" element={<ProtectRoute><OtherPortfolio/></ProtectRoute>}/> 
            <Route path="/profile" element={<Profile/>} />
            <Route path="/register" element={<Register/>}/>
            <Route path="/admincontrol" element={<ProtectRoute><Admincontrol/></ProtectRoute>}/>
            <Route path="/admincontrol/:id" element={<Admincontrol/>}/>
          </Routes>
        </Router>
      </QueryClientProvider>
  );
}

export default App;
