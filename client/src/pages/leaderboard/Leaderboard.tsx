import React, { useState, useEffect } from 'react'
import LoadingPage from '../../globalcomponents/waiting'
import Layout from '../../globalcomponents/Layout'
import Topleader from './components/Topleader'
import Ranklist from './components/Ranklist'
import axios from 'axios'
import config from '../../config/config.json';
import { useQuery } from '@tanstack/react-query'

const Leaderboard = () => {
  const [topRank, setTopRank] = useState([] as any)
  const [rankList, setRankList] = useState([] as any)

  const getAllUser = () => {
    return axios.get(config.API_URL + '/users/leaderboard', { withCredentials: true })
  }

  const leaderboard:any = useQuery(['leaderboard'], getAllUser)

  useEffect(() => {
    if (leaderboard.data) {
      setTopRank(leaderboard.data.data.users.slice(0, 3))
      setRankList(leaderboard.data.data.users.slice(3))
    }
  }, [leaderboard.data])

  return (
    <Layout>
        <div className='pt-4 pr-20'>
          <p className='font-bold text-3xl pb-7'>Leaderboard</p>
          {leaderboard.isLoading ? <LoadingPage /> : 
          <>
            <div className='flex flex-row justify-between pb-7'>
              {
                topRank.map((item:any, idx: number) => (
                  <Topleader
                    key={`topRank-${item._id}`}
                    id={item._id}
                    rank={idx + 1}
                    user={item.username}
                    dataChart={item.port.stock}
                    pl = {item.balance}
                    image={item.image}
                  />
                ))
              }
            </div>
            <div className='flex flex-col'>
              {
                rankList.map((item: any, idx: number) => (
                  <Ranklist
                    key={`rankList-${item._id}`}
                    id={item._id}
                    rank={idx + 4}
                    user={item.username}
                    dataChart={item.port.stock}
                    totalpl={item.balance}
                    image={item.image}
                  />
                ))
              }
            </div>
          </> 
        }
        </div>
    </Layout>
  )
}

export default Leaderboard