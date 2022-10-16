/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Layout from '../../globalcomponents/Layout'

const is_admin = true;

const Admincontrol = () => {
  const navigate = useNavigate();
  const [announment, setAnnounment] = useState({ 
    title: '', 
    content: '',
    date: Date.now(), 
  });
  const [competitionstate, setCompetitionstate] = useState(false);

  const handleSubmit = () => {
    console.log(announment);
    Swal.fire({
      title: 'Successfully Announce!',
      html: `You have successfully announce the news!<br>TOPIC: <b>${announment.title}</b>`,
      icon: 'success',
      confirmButtonText: 'OK',
    });
  }

  const handleCompetitionstate = () => {
    Swal.fire({
      title: 'Change Competition State',
      html: `Do you want to change the competition state to <b>${competitionstate ? 'Close Competition' : 'Start new Competition'}</b>, <br>this action cannot be undone! This will reset all user balance, and Start new Competition.`,
      icon: 'warning',
      confirmButtonText: 'OK',
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

  useEffect(() => {
    if (!is_admin) navigate('/home', { replace: true });
    setCompetitionstate(true);
  }, [])

  return (
    <Layout>
      <div className='pt-4 pr-20'>
        <p className='font-bold text-3xl pb-7'>Announcement</p>
        <div className='w-full rounded-lg border h-60 shadow-md p-6'>
          <input 
            className='w-[50%] h-10 rounded-lg border shadow-md p-4 border-black'
            placeholder='Enter your Topic'
            onChange={(e) => setAnnounment({ ...announment, title: e.target.value })}
          />
          <textarea 
            className='w-full h-28 rounded-lg border shadow-md p-4 mt-4 resize-none border-black'
            placeholder='Say something...'
            onChange={(e) => setAnnounment({ ...announment, content: e.target.value })}
          />
        </div>
        <div className='mt-5 flex justify-end mb-16'>
          <button 
            className='bg-[#E56B6F] hover:bg-[#D75B5F] text-white font-bold w-28 h-10 rounded-full mr-3'
            onClick={handleSubmit}
          >
            Publish
          </button>
        </div>

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
                onClick={handleCompetitionstate}
              >
                ONGOING
              </button>
            ) : (
              <button 
                className='text-sm text-center text-white font-bold bg-red-600 py-3 px-6 rounded-full mt-3'
                onClick={handleCompetitionstate}
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