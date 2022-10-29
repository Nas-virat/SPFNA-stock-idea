import React, { useState } from 'react'

import logo from '../../assets/SPFNAlogo.png'
import profileImage from '../../assets/profile_image.json'

const Register = () => {
  const [data, setData] = useState({
    username: '',
    password: '',
    image: profileImage[0].alt,
  });

  const handleProfileImageStyle = (selectedImage:string) => {
    if (data.image === selectedImage) return 'w-[112px] h-[112px] ml-5 border-[#4a366b] border-8 rounded-full ease-in-out duration-200';
    return 'w-[80px] h-[80px] ml-5 rounded-full ease-in-out duration-200';
  };

  return (
    <body className = 'flex place-content-center h-screen bg-[#D6BBE8]'>
      <div className = 'flex-col self-center h-auto w-1/2 mx-auto py-2 flex items-center justify-center p-6 rounded-xl bg-white'>
        <img className = 'rounded-full' src={logo} alt='myphoto' width="200" height="200"></img>
        <h1 className = 'text-3xl font-bold pb-6'>REGISTER</h1>
        
        <div className='w-4/5'>
          <div className = 'form-group mb-4 pt-4 flex flex-col justify-between'>
            <label className = 'form-label inline-block font-medium text-2xl'>Username</label>
            <input className = 'h-12 w-[50%] mt-3 rounded-3xl border-solid border-2 pl-3' placeholder = 'Username' />
            <label className = 'form-label inline-block font-medium text-2xl pt-3'>Password</label>
            <input className = 'h-12 w-[50%] mt-3 rounded-3xl border-solid border-2 pl-3 ' placeholder = 'Password' />
            <label className = 'form-label inline-block font-medium text-2xl pt-3'>Email</label>
            <input className = 'h-12 w-full mt-3 rounded-3xl border-solid border-2 pl-3' placeholder = 'Email' />
          </div>
        </div>

        <div className="pb-3 flex justify-between w-4/5">
            <p className="font-medium text-2xl">Avatar Image</p>
          </div>
          <div className="flex pb-7 h-36">
            {profileImage.map((item : any) => (
              <button key={item.id} className="flex flex-row items-center" type="button" onClick={() => setData({ ...data, image: item.alt })}>
                <img src={item.src} alt={item.alt} className={`${handleProfileImageStyle(item.alt)}`} />
              </button>
            ))}
          </div>

        <button className ='bg-[#856dab] hover:bg-[#4a366b] text-white font-medium h-11 w-36 rounded-3xl mb-2'>REGISTER</button>
      </div>
    </body>
  )
}

export default Register