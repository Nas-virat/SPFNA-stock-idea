import React, { useState, useEffect } from 'react'
import Layout from '../../globalcomponents/Layout'
import Topleader from './components/Topleader'
import Ranklist from './components/Ranklist'
import axios from 'axios'
import config from '../../config/config.json';
/*
const rankingData = [
  {
    rank: 1,
    id: '143256',
    username: 'james123',
    totalpl: 10.21,
    image: myphoto,
  },
  {
    rank: 2,
    id: '143256',
    username: 'nasvirat',
    totalpl: 5.52,
    image: myphoto,
  },
  {
    rank: 3,
    id: '143256',
    username: 'meaw_sean',
    totalpl: 0.52,
    image: myphoto,
  },
  {
    rank: 4,
    id: '143256',
    username: 'tunwa_satian',
    totalpl: -5.63,
    image: myphoto,
  },
  {
    rank: 5,
    id: '143256',
    username: 'petdanayGolet',
    totalpl: -10.21,
    image: myphoto,
  },
  {
    rank: 6,
    id: '143256',
    username: 'chanon.joh',
    totalpl: -14.84,
    image: myphoto,
  },
  {
    rank: 7,
    id: '143256',
    username: 'eiei',
    totalpl: -15.55,
    image: myphoto,
  }
]
*/
const Leaderboard = () => {
  const [topRank, setTopRank] = useState([] as any)
  const [rankList, setRankList] = useState([] as any)

  const getAllUser = () => {
    axios.get(config.API_URL + '/users', { withCredentials: true })
    .then(res => {
      console.log(res.data);
      setTopRank(res.data.users.slice(0, 3))
      setRankList(res.data.users.slice(3))
    })
    .catch(err => {
      console.log(err);
    })
  }

  useEffect(() => {
    getAllUser();
  }, [])


  return (
    <Layout>
      <div className='pt-4 pr-20'>
        <p className='font-bold text-3xl pb-7'>Leaderboard Total P&L</p>
        <div className='flex flex-row justify-between pb-7'>
          {
            topRank.map((item: any) => (
              <Topleader
                key={item.rank}
                id={item._id}
                rank={item.rank}
                user={item.username}
                totalpl={11}
                image={item.image}
              />
            ))
          }
        </div>
        <div className='flex flex-col'>
          {
            rankList.map((item: any) => (
              <Ranklist
                key={item.rank}
                id={item._id}
                rank={item.rank}
                user={item.username}
                totalpl={1}
                image={item.image}
              />
            ))
          }
        </div>
      </div>
    </Layout>
  )
}

export default Leaderboard