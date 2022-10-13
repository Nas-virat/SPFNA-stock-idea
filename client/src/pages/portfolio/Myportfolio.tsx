import React from 'react'

import myphoto from '../../assets/handsomeboy.jpg'

import Tableport from './components/Tableport'

import Layout from '../../globalcomponents/Layout'
import Chartport from './components/Chartport'
const Myportfolio = () => {

  return (
    <Layout>
      <div className="m-4 flex items-center">
        <div className="w-60 m-7">
          <img className="rounded-full" src={myphoto} alt='myphoto' width="150" height="200"></img>
        </div>
        <div className="m-14">
          <h1 className="mt-3 font-semibold text-3xl">Nasvirat</h1>
          <h3 className="mt-3 font-normal text-xl">Rank #30</h3>
          <h3 className="mt-3 font-nomral text-xl">Total Balance: 3000 USD</h3>
          <div className="flex">
          </div>
        </div>
        <div className="mt-9 ml-36">
        <Chartport />
        </div>
		  </div>

      <div className="ml-16">
        <div className="flex items-center">
          <h3 className="font-semibold text-2xl">Holding</h3>
          <button className='m-3 bg-[#0E0741] hover:bg-[#2614ac] text-white font-bold h-9 w-20 rounded-3xl'>Add</button>
        </div>
        <Tableport/>
      </div>
    </Layout>
  )
}

export default Myportfolio