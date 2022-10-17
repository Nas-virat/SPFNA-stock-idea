import React from 'react'

import myphoto from '../../assets/handsomeboy.jpg'
import Tableport from './components/Tableport'
import Layout from '../../globalcomponents/Layout'
import Chartport from './components/Chartport'

import Select from 'react-select'

import {useState} from 'react'


interface stock{
  symbol: string;
  cost : number;
  volume : number;
}

const temp : stock[] = [{
  symbol: 'AAPL',
  cost : 340.9,
  volume : 4
},
{
  symbol: 'GOOG',
  cost : 100,
  volume : 3
},
{
  symbol: 'MSFT',
  cost : 250,
  volume : 5
}];

const options = [
  { value: '', label: '🇺🇸 US' },
  { value: '.HK', label: '🇭🇰 HK' },
  { value: '.BK', label: '🇹🇭Thailand' },
  { value: '.SS', label: '🇨🇳 Shanghai' },
  { value: '.L', label: '🇬🇧 LSE' },
  { value: '.IL', label: '󠁧󠁢󠁥󠁮🇬🇧 LSEIOB' },
  { value: '.AS', label: '🇳🇱Amsterdam' },
  { value: '.PA', label: '🇫🇷 Paris' },
  { value: '.DE', label: '🇩🇪German' },
  { value: '.T', label: '🇯🇵 Japan' },
  { value: '.SI', label: '🇸🇬Singapore' },
  { value: '.AX', label: '🇦🇺Austrlia' },
  { value: '.NZ', label: '🇳🇿 NZ'},
  { value: '.CN', label: '🇨🇦Canada' },
  { value: '.KQ', label: '🇰🇷KOSDAQ' },
];


const Portfolio : React.FC = () => {

  const [buy,setBuy] = useState(false);
  const [isMyAccount,setIsMyAccount] = useState(true);

  return (
    <Layout>
      <div className="flex items-center h-56">
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
        <div className="ml-36 h-56 w-56">
        <Chartport />
        </div>
		  </div>

      <div className="ml-16">
        <div className="flex items-center">
          <h3 className="font-semibold text-2xl">Holding</h3>
          {isMyAccount && <button onClick ={() => setBuy(!buy)} className='m-3 bg-[#0E0741] hover:bg-[#2614ac] text-white font-bold h-9 w-20 rounded-3xl'>Buy</button>}
        </div>
        { buy &&
          <div className="flex items-center mx-9">
            <div className="flex items-center">
              <h4 className="text-xl">Country</h4>
              <Select className="w-40 ml-3" options={options} />
            </div>
            <div className="flex items-center mx-9">
              <h4 className="text-xl">Symbol</h4>
              <input type="text" className="form-control
                ml-3
                block
                w-32
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput123"
                aria-describedby="emailHelp123" placeholder="Symbol"></input>
            </div>
            <div className="flex items-center mx-9">
             <h4 className="text-xl">Number of Share</h4>
             <input type="text" className="form-control
                ml-3
                block
                w-32
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput123"
                aria-describedby="emailHelp123" placeholder="Share"></input>
            </div>
            <button className='m-3 bg-[#008631] hover:bg-[#009c39] text-white font-bold h-9 w-20 rounded-3xl'>Confirm</button>
          </div> 
        }
        <Tableport data={temp}/>
      </div>
    </Layout>
  )
}

export default Portfolio