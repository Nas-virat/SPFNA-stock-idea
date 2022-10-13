import React from 'react'

import myphoto from '../../assets/handsomeboy.jpg'

import Button from '../../globalcomponents/Button'
import Tableport from './components/Tableport'

import Layout from '../../globalcomponents/Layout'
import { useNavigate } from "react-router-dom";
import Chartport from './components/Chartport'
const Myportfolio = () => {

  const navigate = useNavigate();

  const test= () =>{
      navigate('/profile');
  }
  const test2= () =>{
    console.log("t");
    }


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
            <Button fn={test} text="mypost" color="#8236FD"/>
            <Button fn={test2} text="cash report" color="#8236FD"/>
          </div>
        </div>
        <div>
        <Chartport />
        </div>
		  </div>

      <div className="ml-16">
        <div className="flex items-center">
          <h3 className="font-semibold text-2xl">Holding</h3>
          <Button fn={test}  text="add" color="#0E0741"/>
        </div>
        <Tableport/>
      </div>
    </Layout>
  )
}

export default Myportfolio