import React, { useState, useEffect } from 'react'

import { AuthContext } from '../../context/AuthProvider'
import Tableport from './components/Tableport'
import Layout from '../../globalcomponents/Layout'
import Chartport from './components/Chartport'
import avatarImage from '../../assets/profile_image.json';

import Select from 'react-select'
import Swal from 'sweetalert2';
import axios from 'axios';

interface stock{
  symbol: string;
  cost : number;
  quantity : number;
}

const temp : stock[] = [{
  symbol: 'AAPL',
  cost : 340.9,
  quantity : 4
},
{
  symbol: 'GOOG',
  cost : 100,
  quantity : 3
},
{
  symbol: 'MSFT',
  cost : 250,
  quantity : 5
}];

const options = [
  { value: '', label: 'US' },
  { value: '.HK', label: 'HK' },
  { value: '.BK', label: 'Thailand' },
  { value: '.SS', label: 'Shanghai' },
  { value: '.L', label: 'LSE' },
  { value: '.IL', label: '󠁧󠁢󠁥󠁮LSEIOB' },
  { value: '.AS', label: 'Amsterdam' },
  { value: '.PA', label: 'Paris' },
  { value: '.DE', label: 'German' },
  { value: '.T', label: 'Japan' },
  { value: '.SI', label: 'Singapore' },
  { value: '.AX', label: 'Austrlia' },
  { value: '.NZ', label: 'NZ'},
  { value: '.CN', label: 'Canada' },
  { value: '.KQ', label: 'KOSDAQ' },
];


const Portfolio : React.FC = () => {
  const { username, img } = React.useContext(AuthContext)
  const [buy,setBuy] = useState(false);
  const [isMyAccount, setIsMyAccount] = useState(true);
  
  const [stockList, setStockList] = useState<stock[]>([]);

  const [symbol, setSymbol] = useState('');
  const [cost, setCost] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState(options[0]);


  const profileImage = (image: string) => {
    const imageProfile = avatarImage.find((img) => img.alt === image);
    return imageProfile?.src;
  };

  const getPortfolio = () => {
    axios.get('http://localhost:5000/api/port/me', { withCredentials: true })
    .then(res => {
      console.log(res.data);
      setStockList(res.data);
    })
    .catch(err => {
      console.log(err);
    });
  }
  useEffect(() => {
    getPortfolio();
  },[]);

  const BuyStock = () => {
    axios.post('http://localhost:5000/api/port/buy', {
      symbol: symbol,
      cost: cost,
      quantity: quantity,
      country: selectedCountry
    },
    { withCredentials: true })
    .then(res => {
      console.log(res.data);
      getPortfolio();
    })
    .catch(err => {
      console.log(err);
    });
  }
  const handleConfirm = () => {
    
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Buy'
    }).then((result) => {
      if (result.isConfirmed) {
        setCost(0);
        cost > 0 && quantity > 0 && BuyStock();
        Swal.fire(
          'Buy',
          'Your stock has been bought.',
          'success'
        )
      }
    })
  }

  return (
    <Layout>
      <div className="flex items-center h-56">
        <div className="w-60 m-7">
          <img className="rounded-full" src={profileImage(img)} alt='myphoto' width="150" height="200"></img>
        </div>
        <div className="m-14">
          <h1 className="mt-3 font-semibold text-3xl">@{username}</h1>
          <h3 className="mt-3 font-normal text-xl">Rank #30</h3>
          <h3 className="mt-3 font-nomral text-xl">Total Balance: 3000 USD</h3>
          <div className="flex">
          </div>
        </div>
        <div className="ml-36 h-56 w-56">
        <Chartport labels={['red', 'blue','yellow']} data ={[300,50,100]} backgroundColor={['rgb(255, 99, 132)','rgb(54, 162, 235)','rgb(255, 205, 86)']}/>
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
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="input-symbol"
                aria-describedby="input-symbol" placeholder="Symbol" onChange={(e)=> setSymbol(e.target.value)} ></input>
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
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="input-num"
                aria-describedby="input-num" placeholder="Share"></input>
            </div>
            <button onClick={handleConfirm} className='m-3 bg-[#008631] hover:bg-[#009c39] text-white font-bold h-9 w-20 rounded-3xl'>Confirm</button>
          </div> 
        }
        <Tableport data={temp}/>
      </div>
    </Layout>
  )
}

export default Portfolio
