import React from 'react'

import myphoto from '../../assets/SPFNAlogo.png'

import Layout from '../../globalcomponents/Layout'

const Register = () => {
  return (
    <body className = 'flex place-content-center h-screen bg-[#D6BBE8]'>
      <div className = 'flex-col self-center h-auto w-1/2 mx-auto flex items-center justify-center p-6 rounded-xl bg-white'>
        <img className = 'rounded-full' src={myphoto} alt='myphoto' width="200" height="200"></img>
        <h1 className = 'text-3xl font-bold pb-6'>REGISTER</h1>
        
        <div className='w-4/5'>
          <div className='flex flex-row justify-between '>
            <div className = 'form-group items-center'>
              <label className = 'form-label inline-block font-medium text-2xl'>Firstname</label>
              <input className = 'h-12 w-64 mt-3 rounded-3xl border-solid border-2 pl-3' placeholder = 'Firstname' />
            </div>

            <div className = 'form-group items-center'>
                <label className = 'form-label inline-block font-medium text-2xl'>Lastname</label>
                <input className = 'h-12 w-64 mt-3 rounded-3xl border-solid border-2 pl-3' placeholder = 'Lastname' />
            </div>
          </div>

            <div className = 'form-group mb-6 pt-4 flex flex-col justify-between'>
                <label className = 'form-label inline-block font-medium text-2xl'>Username</label>
                <input className = 'h-12 w-64 mt-3 rounded-3xl border-solid border-2 pl-3' placeholder = 'Username' />
                <label className = 'form-label inline-block font-medium text-2xl pt-3'>Password</label>
                <input className = 'h-12 w-64 mt-3 rounded-3xl border-solid border-2 pl-3 ' placeholder = 'Password' />
                <label className = 'form-label inline-block font-medium text-2xl pt-3'>Email</label>
                <input className = 'h-12 w-full mt-3 rounded-3xl border-solid border-2 pl-3' placeholder = 'Email' />
            </div>
        </div>
        <button className ='bg-[#856dab] hover:bg-[#4a366b] text-white font-medium h-11 w-36 rounded-3xl'>REGISTER</button>
        </div>
    </body>
  )
}

export default Register