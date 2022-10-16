import React from 'react'

import myphoto from '../../assets/SPFNAlogo.png'

import Layout from '../../globalcomponents/Layout'

const Login = () => {
  return (
    <body className = 'flex place-content-center h-screen bg-[#D6BBE8]'>
      <div className = 'self-center h-1/2 w-1/2 mx-auto flex items-center justify-center p-6 rounded-xl bg-white'>
        
        <img className = 'mx-auto rounded-full pr-4 ' src={myphoto} alt='myphoto' width="300" height="300"></img>
        
        <div className='w-1/2'>
          <h1 className = 'text-3xl font-bold mb-6'>LOGIN</h1>
          <div className = 'form-group mb-6 ml-2'>
            <label className = 'form-label inline-block font-medium text-2xl'>Username</label>
            <input className = 'h-12 w-4/5 mt-3 rounded-3xl border-solid border-2 pl-3' placeholder = 'Username' />
          </div>

          <div className = 'form-group mb-6 ml-2'>
              <label className = 'form-label inline-block font-medium text-2xl'>Password</label>
              <input className = 'h-12 w-4/5 mt-3 rounded-3xl border-solid border-2 pl-3' placeholder = 'Password' />
          </div>
          <button className ='mt-3 ml-2 bg-[#856dab] hover:bg-[#4a366b] text-white font-medium h-9 w-32 rounded-3xl'>LOG IN</button>
        </div>
      </div>
    </body>
  )
}

export default Login