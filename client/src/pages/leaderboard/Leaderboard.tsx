import React, { useState, useEffect } from 'react'
import Layout from '../../globalcomponents/Layout'
import Topleader from './components/Topleader'
import Ranklist from './components/Ranklist'
import myphoto from '../../assets/handsomeboy.jpg'

const rankingData = [
  {
    rank: 1,
    username: 'james123',
    totalpl: 10.21,
    image: myphoto,
  },
  {
    rank: 2,
    username: 'nasvirat',
    totalpl: 5.52,
    image: myphoto,
  },
  {
    rank: 3,
    username: 'meaw_sean',
    totalpl: 0.52,
    image: myphoto,
  },
  {
    rank: 4,
    username: 'tunwa_satian',
    totalpl: -5.63,
    image: myphoto,
  },
  {
    rank: 5,
    username: 'petdanayGolet',
    totalpl: -10.21,
    image: myphoto,
  },
  {
    rank: 6,
    username: 'chanon.joh',
    totalpl: -14.84,
    image: myphoto,
  },
  {
    rank: 7,
    username: 'eiei',
    totalpl: -15.55,
    image: myphoto,
  }
]

const Leaderboard = () => {
  const [topRank, setTopRank] = useState([] as any)
  const [rankList, setRankList] = useState([] as any)

  const getRanking = async () => {
    await setTopRank(rankingData.slice(0, 3))
    await setRankList(rankingData.slice(3))
  }

  useEffect(() => {
    getRanking();
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
                rank={item.rank}
                username={item.username}
                totalpl={item.totalpl}
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
                rank={item.rank}
                username={item.username}
                totalpl={item.totalpl}
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