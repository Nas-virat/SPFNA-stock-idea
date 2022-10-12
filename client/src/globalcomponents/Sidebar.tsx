import React from 'react'
import {NavLink} from 'react-router-dom';

interface NavProp{
  name:string;
  to:string;
}

const SectionLink = ({name,to}:NavProp) => {
  return(
      <NavLink 
          to = {to}
          className = {({isActive}) => (isActive ? "p-2.5 mt-3 flex justify-center rounded-md duration-300 cursor-pointer bg-slate-400 text-black" : 'p-2.5 mt-3 flex justify-center rounded-md duration-300 cursor-pointer hover:bg-slate-300 text-black')}
      > 
          <p className="font-semibold">{name}</p>
      </NavLink>
  )
}

const Sidebar = () => {
  return (
    <div className="flex fixed">    
      <div className="bg-slate-200 h-96 ml-8 mt-60 p-3 pt-3 w-56 space-y-4 rounded-lg">
        <SectionLink name="Home Page" to='/'/> 
        <SectionLink name="My Profile" to='/profile'/> 
        <SectionLink name="My Portfolio" to='/portfolio'/>
        <SectionLink name="Idea Space" to='/idea'/>
        <SectionLink name="Convert Currency" to='/convertcurrency'/>
      </div>
    </div>
  )
}

export default Sidebar