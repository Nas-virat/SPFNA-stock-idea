import React from 'react'
import { NavLink } from 'react-router-dom';
import axios from 'axios'
import Swal from 'sweetalert2';

import SPFNAlogo from '../assets/SPFNAlogo.png'
import line from '../assets/line.png'
import avatarImage from '../assets/profile_image.json';

import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

interface NavProp{
  name:string;
  to:string;
}

const SectionLink: React.FC<NavProp> = ({name,to}) => {
  return(
      <NavLink 
          to = {to}
          className = {({isActive}) => (isActive ? "py-3 flex justify-center duration-300 cursor-pointer bg-[#9375a5] text-black" : 'py-3 flex justify-center duration-300 cursor-pointer hover:bg-[#c2a0d6] text-black')}
      > 
          <p className="font-semibold">{name}</p>
      </NavLink>
  )
}

const Sidebar = () => {
  const navigate = useNavigate();
  const { loggedIn, role, username, img, setAuth } = React.useContext(AuthContext);

  const profileImage = (image: string) => {
    const imageProfile = avatarImage.find((img) => img.alt === image);
    return imageProfile?.src;
  };

  const handleLogout = async () => {
    const res = await axios.get('http://localhost:5000/api/users/logout', { withCredentials: true });
    setAuth({
      loggedIn: false,
      role: "",
      username: "",
      img: ""
    });
    if (res.data.success) {
      navigate('/login');
    } else {
      Swal.fire({
        title: 'Error!',
        text: res.data.message,
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }
  }

  return (
      <div className="bg-[#D6BBE8] h-screen w-56 flex flex-col justify-between">
        <div className='flex flex-col'>
          <img src={SPFNAlogo} alt="SPFNAlogo" className="w-40 h-40 mx-auto"/>
          <img src={line} alt="line" className="w-28 h-4 mx-auto opacity-80"/>
          <SectionLink name="Login" to='/login'/> 
          {!loggedIn ? <SectionLink name="Register" to='/register'/> : null}
          <SectionLink name="Home Page" to='/home'/> 
          { loggedIn ? <SectionLink name="My Profile" to='/profile'/> : null}
          { loggedIn ? <SectionLink name="My Portfolio" to='/myport'/> :null}
          { loggedIn ? <SectionLink name="Idea Space" to='/idea'/> :null}
          { loggedIn ? <SectionLink name="Convert Currency" to='/convertcurrency'/> :null}
          <SectionLink name="Leader Board" to='/leaderboard'/>
          { loggedIn && role === 'admin' ? <SectionLink name="Admin" to='/admincontrol'/> : null}
        </div>
        {
          loggedIn ? (
            <div className='flex flex-col mb-12'>
              <div className='flex flex-col place-content-center mb-2'>
                <img src={profileImage(img)} alt="handsomeboy" className="rounded-full h-20 w-20 mx-auto"/>
                <div className='flex flex-col place-content-center'>
                  <p className="text-center font-bold self-center">@{username}</p>
                  <p className="text-center text-sm self-center font-medium">Rank #30</p>
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