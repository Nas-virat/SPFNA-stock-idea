import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import axios from 'axios'
import Swal from 'sweetalert2';

import SPFNAlogo from '../assets/SPFNAlogo.png'
import line from '../assets/line.png'

import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

import profileImage from '../function/profileImage';

import config from '../config/config.json'
import { NavProps } from '../interface/NavProps';

const SectionLink: React.FC<NavProps> = ({name,to}) => {
  return(
      <NavLink 
          to = {to}
          className = {({isActive}) => (isActive ? "py-3 flex justify-center duration-300 cursor-pointer bg-[#9375a5] text-black" : 'py-3 flex justify-center duration-300 cursor-pointer hover:bg-[#c2a0d6] text-black')}
          id = {name}
      > 
          <p className="font-semibold">{name}</p>
      </NavLink>
  )
}

const Sidebar = () => {
  const navigate = useNavigate();
  const { loggedIn, role, username, img, setAuth } = React.useContext(AuthContext);

  const handleLogout = async () => {
    const res = await axios.get(config.API_URL + '/users/logout', { withCredentials: true });
    if (res.data.success) {
      setAuth({
        loggedIn: false,
        role: "",
        username: "",
        img: ""
      });
      localStorage.removeItem('user');
      navigate('/home');
    } else {
      Swal.fire({
        title: 'Error!',
        text: res.data.message,
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }
  }

  /*const fetchCurrentUser = async () => {
    const user = await axios.get(config.API_URL + '/users/user', { withCredentials: true });
    if (user.data) {
      setAuth({
        loggedIn: true,
        role: user.data.role,
        username: user.data.username,
        img: user.data.image
      });
    }
  }

  useEffect(() => {
    fetchCurrentUser();
  }, [])*/

   useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (Object.keys(user).length !== 0) {
      setAuth({
        loggedIn: true,
        role: user.role,
        username: user.username,
        img: user.image
      });
    }
  }, [setAuth])

  return (
      <div className="bg-[#D6BBE8] h-screen w-56 flex flex-col justify-between">
        <div className='flex flex-col'>
          <img src={SPFNAlogo} alt="SPFNAlogo" className="w-40 h-40 mx-auto" onClick={() => navigate('/home')}/>
          <img src={line} alt="line" className="w-28 h-4 mx-auto opacity-80"/>
          {!loggedIn ? <SectionLink name="Login" to='/login'/> : null} 
          {!loggedIn ? <SectionLink name="Register" to='/register'/> : null}
          <SectionLink name="Home Page" to='/home'/> 
          { loggedIn ? <SectionLink name="My Profile" to='/profile'/> : null}
          { loggedIn ? <SectionLink name="My Portfolio" to='/myport'/> :null}
          { loggedIn ? <SectionLink name="Idea Space" to='/idea'/> :null}
          { loggedIn ? <SectionLink name="Convert Currency" to='/convertcurrency'/> :null }
          <SectionLink name="Leaderboard" to='/leaderboard'/>
          { loggedIn && role === 'admin' ? <SectionLink name="Admin" to='/admincontrol'/> : null}
        </div>
        {
          loggedIn ? (
            <div className='flex flex-col mb-12' >
              <div className='flex flex-col place-content-center mb-2 cursor-pointer' onClick={() => navigate('/profile')}>
                <img src={profileImage(img)} alt="handsomeboy" className="rounded-full h-20 w-20 mx-auto"/>
                <div className='flex flex-col place-content-center'>
                  <p className="text-center font-bold self-center">@{username}</p>
                </div>
              </div>
              <button
                id='btn-logout'
                className="bg-[#9375a5] text-white font-semibold py-2 px-4 rounded-full mx-auto mb-4 mt-2"
                onClick={() => handleLogout()}
              >
                Logout
              </button>
            </div>
          ) : null
        }
        
        <p className='p-2 absolute bottom-0'>Avatar by <a href="https://www.freepik.com/free-vector/pack-avatars-different-people_7041832.htm#query=avatar&position=0&from_view=keyword">Freepik</a></p>
      </div>
  )
}

export default Sidebar