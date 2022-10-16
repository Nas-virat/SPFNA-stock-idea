/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Layout from '../../../globalcomponents/Layout'


const Writeidea = () => {
  const navigate = useNavigate();
  const [postidea, setPostidea] = useState({ 
    title: '', 
    content: '',
    date: Date.now(), 
  });

  const handlePost = () => {
    Swal.fire({
      title: 'Successfully Post!',
      html: `You have successfully post the idea!<br>TOPIC: <b>${postidea.title}</b>`,
      icon: 'success',
      confirmButtonText: 'OK',
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/idea', { replace: true });
      }
    });
  }

  const handleDraft = () => {
    Swal.fire({
      title: 'Successfully Save!',
      html: `You have successfully save the idea as draft!<br>TOPIC: <b>${postidea.title}</b>`,
      icon: 'success',
      confirmButtonText: 'OK',
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/idea', { replace: true });
      }
    });
  }

  const handleCancel = () => {
    navigate('/idea', { replace: true });
  }

  return (
    <Layout>
      <div className='pt-4 pr-20'>
        <p className='font-bold text-3xl pb-7'>Write Your Idea</p>
        <div className='w-full rounded-lg border h-auto shadow-md p-6'>
          <input 
            className='w-[50%] h-10 rounded-lg border shadow-md p-4 border-black'
            placeholder='What is your Topic'
            onChange={(e) => setPostidea({ ...postidea, title: e.target.value })}
          />
          <textarea 
            className='w-full h-96 rounded-lg border shadow-md p-4 mt-4 resize-none border-black'
            placeholder='Say something...'
            onChange={(e) => setPostidea({ ...postidea, content: e.target.value })}
          />
        </div>
        <div className='mt-5 flex justify-between mb-16'>
          <div>
            <button 
              className='bg-cyan-800 hover:bg-cyan-900 text-white text-xl font-bold w-32 h-12 rounded-full mr-3'
              onClick={handlePost}
            >
              Post
            </button>
            <button 
              className='bg-sky-600 hover:bg-sky-700 text-white text-xl font-bold w-32 h-12 rounded-full mr-3'
              onClick={handleDraft}
            >
              Draft
            </button>
          </div>
          <button 
            className='bg-red-400 hover:bg-red-500 text-white text-xl font-bold w-32 h-12 rounded-full mr-3'
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </div> 
    </Layout>
  )
}

export default Writeidea