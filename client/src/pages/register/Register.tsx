import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

import logo from '../../assets/SPFNAlogo.png'
import profileImage from '../../assets/profile_image.json'

const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: '',
    password: '',
    email: '',
    role: 'user',
    image: profileImage[0].alt,
  });

  const handleSubmit = async () => {
    if (data.username === '' || data.password === '' || data.email === '') {
      Swal.fire({
        title: 'Error!',
        text: 'Please fill in all the fields',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    } else {
      try {
        const res = await axios.post('http://localhost:5000/api/users/register', data);
        if (res.data.success) {
          Swal.fire({
            title: 'Success!',
            text: 'You have successfully registered!',
            icon: 'success',
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading()
            },
          }).then(() => {
            navigate('/home');
          })
        } else {
          Swal.fire({
            title: 'Error!',
            text: res.data.message,
            icon: 'error',
            confirmButtonText: 'OK'
          })
        }
      } catch (err: any) {
        Swal.fire({
          icon: 'error',
          title: 'Server Error Occured',
          html: err.response.data,
        })
      }
    }
  };

  const handleProfileImageStyle = (selectedImage:string) => {
    if (data.image === selectedImage) return 'w-[112px] h-[112px] ml-5 border-[#4a366b] border-8 rounded-full ease-in-out duration-200';
    return 'w-[80px] h-[80px] ml-5 rounded-full ease-in-out duration-200';
  };

  return (
    <div className = 'flex place-content-center h-screen bg-[#D6BBE8]'>
      <div className = 'flex-col self-center h-auto w-1/2 mx-auto py-2 flex items-center justify-center p-6 rounded-xl bg-white'>
        <img className = 'rounded-full' src={logo} alt='myphoto' width="200" height="200"></img>
        <h1 className = 'text-3xl font-bold pb-6'>REGISTER</h1>
        
        <div className='w-4/5'>
          <form className = 'form-group mb-4 pt-4 flex flex-col justify-between'>
            <label className = 'form-label inline-block font-medium text-2xl'>Username</label>
            <input
              id='username-form'
              className = 'h-12 w-[50%] mt-3 rounded-3xl border-solid border-2 pl-3'
              placeholder = 'Username'
              onChange={(e) => setData({ ...data, username: e.target.value })}
              required
            />
            <label className = 'form-label inline-block font-medium text-2xl pt-3'>Password</label>
            <input
              id='password-form'
              className = 'h-12 w-[50%] mt-3 rounded-3xl border-solid border-2 pl-3'
              placeholder = 'Password'
              type='password'
              onChange={(e) => setData({ ...data, password: e.target.value })}
              required
              autoComplete='on'
            />
            <label className = 'form-label inline-block font-medium text-2xl pt-3'>Email</label>
            <input
              id='email-form'
              className = 'h-12 w-full mt-3 rounded-3xl border-solid border-2 pl-3'
              placeholder = 'Email'
              onChange={(e) => setData({ ...data, email: e.target.value })}
              required
            />
          </form>
        </div>

        <div className="pb-3 flex justify-between w-4/5">
            <p className="font-medium text-2xl">
              Avatar Image 
              <span className='text-sm font-light ml-2'>
                Avatar by 
                <a href="https://www.freepik.com/free-vector/pack-avatars-different-people_7041832.htm#query=avatar&position=0&from_view=keyword">
                  &nbsp;Freepik
                </a>
              </span>
            </p>
          </div>
          <div className="flex pb-7 h-36">
            {profileImage.map((item : any) => (
              <button id={`btn-img-${item.id}`} key={item.id} className="flex flex-row items-center" type="button" onClick={() => setData({ ...data, image: item.alt })}>
                <img src={item.src} alt={item.alt} className={`${handleProfileImageStyle(item.alt)}`} />
              </button>
            ))}
          </div>

        <button
          id='btn-submit'
          className ='bg-[#856dab] hover:bg-[#4a366b] text-white font-medium h-11 w-36 rounded-3xl mb-2'
          type='submit'
          onClick = {() => handleSubmit()}
        >
          REGISTER
        </button>
      </div>
    </div>
  )
}

export default Register