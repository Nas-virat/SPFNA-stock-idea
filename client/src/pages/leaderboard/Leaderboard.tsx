import React, { useState, useEffect } from 'react'
import Layout from '../../globalcomponents/Layout'
import Topleader from './components/Topleader'
import Ranklist from './components/Ranklist'
import myphoto from '../../assets/handsomeboy.jpg'

const rankingData = [
  {
    rank: 1,
    firstname: 'Tunwa',
    lastname: 'Satianrapapong',
    totalpl: 10,
    image: myphoto,
  },
  {
    rank: 2,
    firstname: 'Meaw',
    lastname: 'Chanonkhan',
    totalpl: 5,
    image: myphoto,
  },
  {
    rank: 3,
    firstname: 'Napas',
    lastname: 'Vinitnantharat',
    totalpl: 0.5,
    image: myphoto,
  },
  {
    rank: 4,
    firstname: 'Petdanaya',
    lastname: 'Gongkham',
    totalpl: -5,
    image: myphoto,
  },
  {
    rank: 5,
    firstname: 'Aom',
    lastname: 'Srisawat',
    totalpl: -10,
    image: myphoto,
  },
  {
    rank: 6,
    firstname: 'Pattarapong',
    lastname: 'Srisawat',
    totalpl: -15,
    image: myphoto,
  },
  {
    rank: 7,
    firstname: 'Pattarapong',
    lastname: 'Srisawat',
    totalpl: -15,
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
                firstname={item.firstname}
                lastname={item.lastname}
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
                firstname={item.firstname}
                lastname={item.lastname}
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