import React, { useState, useEffect,useContext } from 'react'
import Swal from 'sweetalert2';
import { AuthContext } from '../../context/AuthProvider';
import Layout from '../../globalcomponents/Layout'

import OneCurrency from './components/OneCurrency';
import updownarrow from './components/updownarrow.png';
import CurrencyInput from './components/CurrencyInput';
import profileImage from '../../function/profileImage';

import axios from 'axios';

interface currencyProps {
  currency: string;
  amount: number;
}

const currency = [
  'USD',
  'HKD',
  'THB',
  'EUR',
  'CNY',
  'JPY',
  'KRW',
  'SGD',
  'AUD',
  'CAD',
  'GBP'
];

const ConvertCurrency = () => {
  const { username, img } = useContext(AuthContext);
  const [amountFrom, setAmountFrom] = useState(1);
  const [amountTo, setAmountTo] = useState(1);
  const [currencyFrom, setCurrencyFrom] = useState("USA");
  const [currencyTo, setCurrencyTo] = useState("USA");

  const [ListCash, setListCash] = useState<currencyProps[]>([]);
  
  useEffect(() => {
    const getBalance = () => {
      console.log('test');
      axios.get(`http://localhost:5000/api/port/cash`, { withCredentials: true })
        .then((res) => {
          setListCash(res.data);
        })
        .catch((err: any) => {
          Swal.fire({
            title: 'Error!',
            text: err.response.data.message,
            icon: 'error',
          })
        }) 
    }
    getBalance();
  },[]);

  const handleAmountChange1 = (amountFrom:number) => {
    setAmountTo(amountFrom * 123);
    setAmountFrom(amountFrom);
  }

  const handleAmountChange2 = (amountTo:number) => {
    setAmountFrom(amountTo * 0.007);
    setAmountTo(amountTo);
  }

  const handleCurrencyChange1 = (currencyFrom:string) => {
    setCurrencyFrom(currencyFrom);
  }

  const handleCurrencyChange2 = (currencyTo:string) => {
    setCurrencyTo(currencyTo);
  }

  const swapAmount = () => {
    setAmountFrom(amountTo);
    setCurrencyFrom(currencyTo);
    setAmountTo(amountFrom);
    setCurrencyTo(currencyFrom);
  }

  const handleSubmit = () => {
    Swal.fire({
      title: 'Successfully Convert!',
      html: `You have successfully announce the convert`,
      icon: 'success',
      confirmButtonText: 'OK',
    });
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
        </div>
      </div>
      <div className="flex flex-row w-full">
        <div className='w-1/2'>
          <p className="my-3 font-semibold text-2xl">My Currency</p>
          <div className='flex flex-col w-11/12 overflow-y-auto h-80'>

            {ListCash.map((cash,index) => (
              <OneCurrency
                key={index}
                currency={cash.currency}
                amount={cash.amount}
              />
            ))}
          <OneCurrency currency=" USD" amount={1000}/>
          <OneCurrency currency=" CNY" amount={200}/>
          <OneCurrency currency=" HKD" amount={300}/>
          <OneCurrency currency=" EUR" amount={400}/>
          <OneCurrency currency=" THB" amount={400}/>
          <OneCurrency currency=" AUD" amount={400}/>
          </div>
          <div className="flex flex-row w-11/12 mt-8 justify-between">
          <div>
            <p className='ml-8 text-xl font-semibold'>Total</p>
          </div>
          <div className='flex flex-row mr-[4.75rem]'>
            <p className='mr-3'>3000</p>
            <p className='font-semibold'>USD</p>
          </div>
          </div>
        </div>
        <div className='w-1/2'>
          <p className="my-3 font-semibold text-2xl">Convery Currency</p>
          <div className='ml-3 w-11/12'>
            <div className='flex flex-row my-6'>
              <p className='mr-1'>1</p>
              <p className='font-semibold'>{currencyFrom}</p>
              <p className='mx-2'>=</p>
              <p className='mr-1'>37.78</p>
              <p className='font-semibold'>{currencyTo}</p>
            </div>
            <div className='flex flex-row my-6'>
              <CurrencyInput 
                amount={amountFrom} 
                onAmountChange={handleAmountChange1} 
                onCurrencyChange={handleCurrencyChange1} 
                currencies={currency} 
                currency={currencyFrom} 
              />
            </div>
            <img className='mx-auto w-10 h-12 ' src={updownarrow} alt='profile-pic' onClick={swapAmount}></img>
            <div className='flex flex-row my-6'>
              <CurrencyInput 
                amount={amountTo} 
                onAmountChange={handleAmountChange2} 
                onCurrencyChange={handleCurrencyChange2} 
                currencies={currency} 
                currency={currencyTo} 
              />
            </div>
            <button 
              className='mt-6 bg-[#856dab] hover:bg-[#4a366b] text-white font-bold h-8 w-1/5 rounded-3xl'
              onClick={handleSubmit}
            >
              Convert
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ConvertCurrency