/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import Layout from '../../globalcomponents/Layout'
import axios from 'axios';
import config from '../../config/config.json';
import LoadingPage from '../../globalcomponents/waiting';
import Draft from './components/Draft';

const is_admin = true;

const Admincontrol = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [counter, setCounter] = useState(0)
  const [announment, setAnnounment] = useState({ 
    title: '', 
    details: '',
    date: Date.now(), 
  });
  const [drafts, setDrafts] = useState([] as any);
  const [competitionstate, setCompetitionstate] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleAnnounceUpdate = async (status : string) => {
    if (announment.title === '' || announment.details === '') {
      Swal.fire({
        title: 'Error!',
        text: 'Please fill in all the fields',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    } else {
      try {
        const res = await axios.put(config.API_URL +'/admin/update', {
          title: announment.title,
          details: announment.details,
          status:  status,
          announceID: id
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
          })
          .then(() => {
            navigate('/admincontrol');
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
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        })
      }
    }
  }

  const handlePost = async (status : string) => {
    if (announment.title === '' || announment.details === '') {
      Swal.fire({
        title: 'Error!',
        text: 'Please fill in all the fields',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    } else {
      try {
        const res = await axios.post(config.API_URL +'/admin/add', {
          title: announment.title,
          details: announment.details,
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
          })
          .then(() => {
            navigate('/admincontrol');
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
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        })
      }
    }
  }

  const handleButton = (status : string) => {
    if (id !== undefined) {
      handleAnnounceUpdate(status);
    }
    else {
      handlePost(status);
    }
  }

  const getDraft = async () => {
    try {
      const res = await axios.get(config.API_URL + '/admin/alldraft', { withCredentials: true })
      if (res.data.success) {
        console.log(res.data)
        setDrafts(res.data.draft)
        setLoading(false)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const previousClick = () => {
    if (counter > 0) {
      setCounter(counter - 1)
    }
  }

  const nextClick = () => {
    if (counter < drafts.length - 1) {
      setCounter(counter + 1)
    }
  }

  const handleCompetitionstate = () => {
    Swal.fire({
      title: 'Change Competition State',
      html: `Do you want to change the competition state to <b>${competitionstate ? 'Close Competition' : 'Start new Competition'}</b>, <br>this action cannot be undone! This will reset all user balance, and Start new Competition.`,
      icon: 'warning',
      confirmButtonText: 'OK',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        setCompetitionstate(!competitionstate);
        Swal.fire({
          title: 'Competition State Changed!',
          html: `You have successfully change the competition state to <b>${competitionstate ? 'Close Competition' : 'Start new Competition'}</b>`,
          icon: 'success',
          confirmButtonText: 'OK',
        });
      }
    });
  }

  const getOneDraft = async () => {
    try {
      const res = await axios.get(config.API_URL + '/admin/draft/' + id, { withCredentials: true })
      if (res.data.success) {
        console.log(res.data)
        setAnnounment({
          title: res.data.draft.title,
          details: res.data.draft.details,
          date: Date.now(),
        })
        setTimeout(() => {
        }, 500);
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (!is_admin) navigate('/home', { replace: true });
    setCompetitionstate(true);
    getDraft();

    if (id !== undefined) {
      getOneDraft();
    }
  }, [])

  return (
    <Layout>
      <div className='pt-4 pr-20'>
        <p className='font-bold text-3xl pb-7'>Announcement</p>
        <form className='w-full rounded-lg border h-60 shadow-md p-6'>
          <input 
            className='w-[50%] h-10 rounded-lg border shadow-md p-4 border-black'
            placeholder='Enter your Topic'
            required
            value={announment.title}
            onChange={(e) => setAnnounment({ ...announment, title: e.target.value })}
          />
          <textarea 
            className='w-full h-28 rounded-lg border shadow-md p-4 mt-4 resize-none border-black'
            placeholder='Say something...'
            required
            value={announment.details}
            onChange={(e) => setAnnounment({ ...announment, details: e.target.value })}
          />
        </form>
        <div className='mt-5 flex justify-end mb-16'>
          <button 
            className='bg-sky-600 hover:bg-sky-700 text-white font-bold w-28 h-10 rounded-full mr-3'
            onClick={() => handleButton('draft')}
          >
            Draft
          </button>
          <button 
            className='bg-[#E56B6F] hover:bg-[#D75B5F] text-white font-bold w-28 h-10 rounded-full mr-3'
            onClick={() => handleButton('publish')}
          >
            Publish
          </button>
        </div>
        <p className='font-bold text-3xl pb-7'>Draft</p>
        {loading ? <LoadingPage /> 
          :
          <>
          <div className='w-full rounded-lg border shadow-md p-6'>
            {
              drafts.length > 0 ? (
                <Draft data={drafts[counter]} />
              ) : (
                <p className='h-40 text-base'>No Draft</p>
              )
            }
            
          </div>
          <div className='mt-5 flex justify-center mb-16'>
            <button 
              className={`${counter === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#E56B6F] hover:bg-[#D75B5F]' } text-white font-bold w-24 h-10 rounded-full mr-3`}
              onClick={previousClick}
            >
              Previous
            </button>
            <button 
              className={`${counter === drafts.length - 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#E56B6F] hover:bg-[#D75B5F]' } text-white font-bold w-24 h-10 rounded-full mr-3`}
              onClick={nextClick}
            >
              Next
            </button>
          </div>
          </>
        }

        <p className='font-bold text-3xl pb-7'>Control</p>
        <div className='w-full rounded-lg border h-auto shadow-md p-6 mb-7 bg-[#FFE1E1] flex justify-between items-center'>
          <div>
            <p className='text-2xl font-semibold'>Restart Competition</p>
            <p className='text-sm text-gray-400'>This will reset all user balance, and Start new Competition.</p>
          </div>
          {
            competitionstate ? (
              <button 
                className='text-sm text-center text-white font-bold bg-green-600 py-3 px-6 rounded-full mt-3'
                onClick={() => handleCompetitionstate()}
              >
                ONGOING
              </button>
            ) : (
              <button 
                className='text-sm text-center text-white font-bold bg-red-600 py-3 px-6 rounded-full mt-3'
                onClick={() => handleCompetitionstate()}
              >
                CLOSED NOW
              </button>
            )
          }
          
        </div>
      </div> 
    </Layout>
  )
}

export default Admincontrol