/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import Layout from '../../globalcomponents/Layout'
import axios from 'axios'; 
import LoadingPage from '../../globalcomponents/waiting';
import config from '../../config/config.json';
import TextEditor from '../../globalcomponents/RichtextComponents/TextEditor';

const Writeidea = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [postidea, setPostidea] = useState({ 
    title: '', 
    details: '',
  });
  const [loading, setLoading] = useState(false);

  const getDraft = () => {
    axios.get(config.API_URL + '/idea/post/' + id, { withCredentials: true })
    .then(res => {
      setPostidea({
        title: res.data.idea.title,
        details: res.data.idea.details,
      });
      setTimeout(() => {
        setLoading(false);
      }, 500);
    })
    .catch(err => {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        html: err.response.data,
      })
    })
  }

  useEffect(() => {
    if(id !== undefined){
      setLoading(true);
      getDraft();
    }
  }, []);

  const handleIdeaUpdate = async (status : string) => {
    if (postidea.title === '' || postidea.details === '') {
      Swal.fire({
        title: 'Error!',
        text: 'Please fill in all the fields',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    } else {
      try {
        const res = await axios.put(config.API_URL + '/idea/update', {
          title: postidea.title,
          details: postidea.details,
          status: status,
          ideaId: id,
        }, { withCredentials: true })
        if (res.data.success) {
          Swal.fire({
            title: 'Success!',
            text: `You have successfully ${status} Idea`,
            icon: 'success',
            timer: 1000,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading()
            },
          }).then(res => {
            if(status === 'publish'){
              navigate('/idea');
            } else {
            navigate('/profile');
            }
          })
        } else {
          Swal.fire({
            title: 'Error!',
            text: res.data.message,
            icon: 'error',
            confirmButtonText: 'OK'
          })
        }
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        })
      }
    }
  }

  const handlePost = async (status : string) => { 
    if (postidea.title === '' || postidea.details === '') {
      Swal.fire({
        title: 'Error!',
        text: 'Please fill in all the fields',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    } else {
      try {
        const res = await axios.post(config.API_URL +'/idea/add', {
          title: postidea.title,
          details: postidea.details,
          status:  status
        }, { withCredentials: true });
        if (res.data.success) {
          Swal.fire({
            title: 'Success!',
            text: `You have successfully ${status} Idea`,
            icon: 'success',
            timer: 1000,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading()
            },
          }).then(() => {
            if(status === 'publish'){
              navigate('/idea');
            } else {
            navigate('/profile');
            }
          })
        } else {
          Swal.fire({
            title: 'Error!',
            text: res.data.message,
            icon: 'error',
            confirmButtonText: 'OK'
          })
        }
      } catch(err){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        })
      }
    }
  }

  const handleButton = (status : string) => {
    if (id !== undefined){
      handleIdeaUpdate(status);
    }
    else {
      handlePost(status);
    }
  }

  const handleCancel = () => {
    if(id !== undefined){
      navigate('/profile', { replace: true });;
    }
    else {
    navigate('/idea', { replace: true });
    }
  }

  return (
    <Layout>
      <div className='pt-4 pr-20'>
        <p className='font-bold text-3xl pb-7'>Write Your Idea</p>
        {loading ? <LoadingPage /> 
        :
          <form className='w-full h-[36rem] rounded-lg border shadow-md p-6'>
            <input 
              className='w-[50%] h-10 rounded-lg border shadow-md p-4 border-black mb-5 outline-none'
              placeholder='What is your Topic'
              required
              value={postidea.title}
              onChange={(e) => setPostidea({ ...postidea, title: e.target.value })}
            />
            <TextEditor placeholder='Say something...' value={postidea.details} onChange ={(e) => setPostidea({ ...postidea, details: e })} />
          </form>
        }
        <div className='mt-5 flex justify-between mb-16'>
          <div>
            <button 
              className='bg-cyan-800 hover:bg-cyan-900 text-white text-xl font-bold w-32 h-12 rounded-full mr-3'
              onClick={() => handleButton('publish')}
            >
              Post
            </button>
            <button 
              className='bg-sky-600 hover:bg-sky-700 text-white text-xl font-bold w-32 h-12 rounded-full mr-3'
              onClick={() => handleButton('draft')}
            >
              Draft
            </button>
          </div>
          <button 
            className='bg-red-400 hover:bg-red-500 text-white text-xl font-bold w-32 h-12 rounded-full mr-3'
            onClick={() => handleCancel()}
          >
            Cancel
          </button>
        </div>
      </div> 
    </Layout>
  )
}

export default Writeidea