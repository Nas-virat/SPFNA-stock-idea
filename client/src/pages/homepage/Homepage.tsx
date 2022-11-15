import React, { useState, useEffect } from 'react'
import 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import Layout from '../../globalcomponents/Layout'
import axios from 'axios';
import config from '../../config/config.json';
import Announcement from './components/Announcement';

const Homepage = () => {
  const [counter, setCounter] = useState(0)
  const [announcementData, setAnnouncementData] = useState([] as any)

  const previousClick = () => {
    if (counter > 0) {
      setCounter(counter - 1)
    }
  }

  const nextClick = () => {
    if (counter < announcementData.length - 1) {
      setCounter(counter + 1)
    }
  }

  const getAnnouncement = async () => {
    try {
      const res = await axios.get(config.API_URL + '/admin/all', { withCredentials: true })
      if (res.data.success) {
        console.log(res.data)
        setAnnouncementData(res.data.announces)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getAnnouncement();
  }, [])

  return (
    <Layout>
      <div className='pt-4 pr-20'>
        <p className='font-bold text-3xl pb-7'>Admin Announcement</p>
        <div className='w-full rounded-lg border h-44 shadow-md p-6'>
          {
            announcementData.length > 0 ? (
              <Announcement data={announcementData[counter]} />
            ) : (
              <p className='text-base'>No announcement</p>
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
            className={`${counter === announcementData.length - 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#E56B6F] hover:bg-[#D75B5F]' } text-white font-bold w-24 h-10 rounded-full mr-3`}
            onClick={nextClick}
          >
            Next
          </button>
        </div>

        <p className='font-bold text-3xl pb-7'>P&L Distribution</p>
        <div className='w-full rounded-lg border h-auto shadow-md p-6 mb-7 bg-[#FFE1E1]'>
          {/* HISTOGRAM - NEED ADJUSTMENT + OPTIONS */}
          <Bar 
            data={{
              labels: [-5,-4.5,-4,-3.5,-3,-2.5,-2,-1.5,-1,-0.5,0,0.5,1,1.5,2,2.5,3,3.5,4,4.5,5],
              datasets: [{
                label: 'Number of participants',
                data: [19,28,20,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0,0],
                backgroundColor: 'rgb(54, 162, 235)',
                borderColor: 'white',
                barPercentage: 1,
                categoryPercentage: 1,
              }]
            }}
            height={400}
            width={600}
            options={{
              maintainAspectRatio: false,
              scales: {
                x: {
                  offset: false,
                  grid: {
                    offset: false,
                    display: false,
                  },
                },
              }
            }}
          />
        </div>
      </div> 
    </Layout>
  )
}

export default Homepage