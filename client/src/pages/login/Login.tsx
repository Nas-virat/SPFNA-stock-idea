import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

import logo from '../../assets/SPFNAlogo.png'

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    userId: '',
    password: '',
  });

  const handleSubmit = async () => {
    if (data.userId === '' || data.password === '') {
      Swal.fire({
        title: 'Error!',
        text: 'Please fill in all the fields',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    } else {
      try {
        const res = await axios.post('http://localhost:5000/api/users/login', data, { withCredentials: true });
        if (res.data.success) {
          Swal.fire({
            title: 'Success!',
            text: 'You have successfully logged in!',
            icon: 'success',
            timer: 1500,
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

  return (
    <div className = 'flex place-content-center h-screen bg-[#D6BBE8]'>
      <div className = 'self-center h-1/2 w-1/2 mx-auto flex items-center justify-center p-6 rounded-xl bg-white'>
        <img className = 'mx-auto rounded-full pr-4 ' src={logo} alt='myphoto' width="300" height="300"></img>
        <div className='w-1/2'>
          <h1 className = 'text-3xl font-bold mb-6'>LOGIN</h1>
          <div className = 'form-group mb-6 ml-2'>
            <label className = 'form-label inline-block font-medium text-2xl'>Username or Email</label>
            <input
              id='userid-form'
              className = 'h-12 w-4/5 mt-3 rounded-3xl border-solid border-2 pl-3'
              placeholder = 'Username or Email'
              onChange={(e) => setData({ ...data, userId: e.target.value })}
              required
            />
          </div>
          <form className = 'form-group mb-6 ml-2'>
              <label className = 'form-label inline-block font-medium text-2xl'>Password</label>
              <input
                id='password-form'
                className = 'h-12 w-4/5 mt-3 rounded-3xl border-solid border-2 pl-3'
                placeholder = 'Password'
                type='password'
                onChange={(e) => setData({ ...data, password: e.target.value })}
                autoComplete='on'
                required
              />
          </form>
          <div className = 'flex flex-row justify-between w-4/5'>
            <button
              id='btn-submit'
              className='mt-3 ml-2 bg-[#856dab] hover:bg-[#4a366b] text-white font-medium h-9 w-32 rounded-3xl'
              type='submit'
              onClick = {() => handleSubmit()}
            >
              LOG IN
            </button>
            <button
              id='btn-to-register'
              className ='mt-3 ml-2 bg-[#9d8fb3] hover:bg-[#4a366b] text-white font-medium h-9 w-32 rounded-3xl'
              onClick={() => navigate('/register')}
            >
              REGISTER
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login