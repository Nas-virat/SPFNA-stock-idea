import React, { useState, useEffect } from 'react'

import { AuthContext } from '../../context/AuthProvider'
import Tableport from './components/Tableport'
import Layout from '../../globalcomponents/Layout'
import Chartport from './components/Chartport'

import Select from 'react-select'
import Swal from 'sweetalert2';
import axios from 'axios';

import chartFunction from '../../function/chartfunction'
import backgroundColor from '../../config/chartconfig'
import profileImage from '../../function/profileImage'

import config from '../../config/config.json'

interface stock{
  symbol: string;
  price : number;
  cost_price : number;
  quantity : number;
  rate : number;
}

interface selectOption {
  value: {
    prefix: string;
    currency: string;
  };
  label: string;
}


const options = [
  { value: {prefix:'',currency:'USD'}, label: 'US' },
  { value: {prefix:'.HK',currency:'HKD'}, label: 'HK' },
  { value: {prefix:'.BK',currency:'THB'}, label: 'Thailand' },
  { value: {prefix:'.SS', currency:'CNY'}, label: 'Shanghai' },
  { value: {prefix:'.L', currency:'GBP'}, label: 'LSE' },
  { value: {prefix:'.IL', currency:'USD'}, label: 'LSEIOB' },
  { value: {prefix:'.AS', currency:'EUR'}, label: 'Amsterdam' },
  { value: {prefix:'.PA', currency:'EUR'}, label: 'Paris' },
  { value: {prefix:'.DE', currency:'EUR'}, label: 'German' },
  { value: {prefix:'.T', currency:'JPY'}, label: 'Japan' },
  { value: {prefix:'.SI', currency:'SG'}, label: 'Singapore' },
  { value: {prefix:'.AX', currency:'AUD'}, label: 'Austrlia' },
  { value: {prefix:'.NZ', currency:'NZD'}, label: 'New Zealand' },];


const Portfolio : React.FC = () => {
  const { username, img } = React.useContext(AuthContext)
  const [buy,setBuy] = useState(false);
  const [sell,setSell] = useState(false);
  
  const [stockList, setStockList] = useState<stock[]>([]);
  const [symbol, setSymbol] = useState<String>('');
  const [quantity, setQuantity] = useState<number>(0);

  const [datachart , setDatachart] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);

  const [selectedOption, setSelectedOption] = useState<selectOption | null>(options[0]);

  const getPortfolio = () => {
    axios.get(config.API_URL +'/port/me', { withCredentials: true })
    .then(res => {
      console.log(res.data.stocklist);
      setStockList(res.data.stocklist);
      const {labels,data} = chartFunction(res.data.stocklist);
      setLabels(labels);
      setDatachart(data);
    })
    .catch(err => {
      console.log(err);
    });
  }
  
  useEffect(() => {
    getPortfolio();
  },[]);


  const BuyStock = (cost:number) => {
    console.log("Buystock",symbol,cost,quantity,);
    axios.post(config.API_URL + '/port/buy', {
      symbol: symbol.toLocaleUpperCase(),
      cost: cost,
      quantity: quantity,
      country: selectedOption?.value.prefix,
      currency: selectedOption?.value.currency 
    },
    { withCredentials: true })
    .then(res => {
      console.log(res.data);
      Swal.fire(
        'Buy',
        'Your stock has been bought.',
        'success'
      )
      getPortfolio();
    })
    .catch(err => {
      console.log(err);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      })
    });
  }

  const SellStock = (cost:number) => {
    console.log("Buystock",symbol,cost,quantity,);
    axios.post(config.API_URL + '/port/sell', {
      symbol: symbol.toLocaleUpperCase(),
      cost: cost,
      quantity: quantity,
      country: selectedOption?.value.prefix,
      currency: selectedOption?.value.currency 
    },
    { withCredentials: true })
    .then(res => {
      console.log(res.data);
      Swal.fire(
        'Sell',
        'Your stock has been Sold',
        'success'
      )
      getPortfolio();
    })
    .catch(err => {
      console.log(err);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        html : err.response.data.message,
      })
    });
  }



  const handleBuy = async () => {
    try{
      const res = await axios.post(config.API_URL + '/port/price', {
        symbol: symbol,
        country: selectedOption?.value.prefix,
    },
    { withCredentials: true });
    const cost = res.data;
      Swal.fire({
        title: 'Are you sure?',
        text: `You are going to buy ${symbol} at ${cost} ${selectedOption?.value.currency} per share`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Buy'
      }).then((result) => {
        if (result.isConfirmed) { 
          BuyStock(cost);
        }
      })
    }catch(err){
      console.log(err);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please check input',
      })
    }
  }

  const handleSell = async () => {
    try{
      const res = await axios.post(config.API_URL +'/port/price', {
          symbol: symbol,
          country: selectedOption?.value.prefix,
      },
      { withCredentials: true });
      const cost = res.data;
        Swal.fire({
          title: 'Are you sure?',
          text: `You are going to Sell ${symbol} at ${cost} ${selectedOption?.value.currency} per share`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sell'
        }).then((result) => {
          if (result.isConfirmed) { 
            SellStock(cost);
          }
        })
      }catch(err){
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please check input',
        })
      }
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
          <Chartport labels={labels} data ={datachart} backgroundColor={backgroundColor}/>
        </div>
		  </div>

      <div className="ml-16">
        <div className="flex items-center">
          <h3 className="font-semibold text-2xl">Holding</h3>
          <button
            onClick={() => {
              setBuy(!buy);
              setSell(false);
            }}
            className={`m-3 ${buy ? 'bg-[#0E0741]' : 'bg-[#2614ac]'} text-white font-bold h-9 w-20 rounded-3xl`}
          >
            Buy
          </button>
          <button 
            onClick = {() => {
              setSell(!sell);
              setBuy(false);
            }} 
            className={`m-3 ${sell ? 'bg-[#0E0741]' : 'bg-[#2614ac]'} text-white font-bold h-9 w-20 rounded-3xl`}
          >
            Sell
          </button>
        </div>
        { (buy || sell) &&
          <div className="flex items-center mx-9">
            <div className="flex items-center">
              <h4 className="text-xl">Country</h4>
              <Select
                className="w-40 ml-3"
                options={options}
                defaultValue={options[0]}
                onChange={setSelectedOption}
              />
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
                aria-describedby="input-num" placeholder="Share" onChange={(e)=> setQuantity(parseInt(e.target.value))}></input>
            </div>
            <button 
              onClick={() => {
                if(buy)
                {
                  handleBuy();
                }
                else if(sell)
                {
                  handleSell();
                }
              }}
              className='m-3 bg-[#008631] hover:bg-[#009c39] text-white font-bold h-9 w-20 rounded-3xl'>
                Confirm
            </button>
          </div> 
        }
        
        <Tableport data={stockList}/>
      </div>
    </Layout>
  )
}

export default Portfolio
