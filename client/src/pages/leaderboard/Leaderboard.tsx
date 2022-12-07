import React, { useState, useEffect } from 'react'
import LoadingPage from '../../globalcomponents/waiting'
import Layout from '../../globalcomponents/Layout'
import Topleader from './components/Topleader'
import Ranklist from './components/Ranklist'
import axios from 'axios'
import config from '../../config/config.json';

const Leaderboard = () => {
  const [loading, setLoading] = useState(true)
  const [topRank, setTopRank] = useState([] as any)
  const [rankList, setRankList] = useState([] as any)

  const getAllUser = () => {
    axios.get(config.API_URL + '/users', { withCredentials: true })
    .then(res => {
      console.log(res.data);
      setTopRank(res.data.users.slice(0, 3));
      setRankList(res.data.users.slice(3));
      setLoading(false);
    })
    .catch(err => {
      console.log(err);
    })
  }

  useEffect(() => {
    setLoading(true);
    getAllUser()
  }, [])


  return (
    <Layout>
        <div className='pt-4 pr-20'>
          <p className='font-bold text-3xl pb-7'>Leaderboard</p>
          { loading ? <LoadingPage /> : 
          <>
            <div className='flex flex-row justify-between pb-7'>
              {
                topRank.map((item: any, idx: number) => (
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