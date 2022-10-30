import React from 'react'
import {NavLink} from 'react-router-dom';
import handsomeboy from '../assets/handsomeboy.jpg'
import SPFNAlogo from '../assets/SPFNAlogo.png'
import line from '../assets/line.png'

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
  return (
      <div className="bg-[#D6BBE8] h-screen w-56 flex flex-col justify-between">
        <div className='flex flex-col'>
          <img src={SPFNAlogo} alt="SPFNAlogo" className="w-40 h-40 mx-auto"/>
          <img src={line} alt="line" className="w-28 h-4 mx-auto opacity-80"/>
          <SectionLink name="Login" to='/login'/>
          <SectionLink name="Home Page" to='/home'/> 
          <SectionLink name="My Profile" to='/profile'/> 
          <SectionLink name="My Portfolio" to='/myport'/>
          <SectionLink name="Idea Space" to='/idea'/>
          <SectionLink name="Convert Currency" to='/convertcurrency'/>
          <SectionLink name="Leader Board" to='/leaderboard'/>
          <SectionLink name="Admin" to='/admincontrol'/>
          <SectionLink name="Logout" to='/logout'/>
        </div>
        <div className='flex flex-row place-content-center mb-12'>
          <img src={handsomeboy} alt="handsomeboy" className="rounded-full h-20 w-20"/>
          <div className='flex flex-col place-content-center ml-2'>
            <p className="text-center font-bold self-center">John Doe</p>
            <p className="text-center text-sm self-center font-medium">Rank #30</p>
          </div>
        </div>
        <p className='p-2 absolute bottom-0'>Avatar by <a href="https://www.freepik.com/free-vector/pack-avatars-different-people_7041832.htm#query=avatar&position=0&from_view=keyword">Freepik</a></p>
      </div>
  )
}

export default Sidebar