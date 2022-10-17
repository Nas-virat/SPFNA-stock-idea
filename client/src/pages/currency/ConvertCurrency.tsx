import React from 'react'
import Layout from '../../globalcomponents/Layout'
import myphoto from '../../assets/handsomeboy.jpg';
import OneCurrency from './components/OneCurrency';
import updownarrow from './components/updownarrow.png';
import Swal from 'sweetalert2';
import { useState, useEffect } from 'react'
import CurrencyInput from './components/CurrencyInput';

const currency = [
  '🇺🇸 USD',
  '🇭🇰 HKD',
  '🇹🇭 THB',
  '🇪🇺 EUR',
  '🇨🇳 CNY',
  '🇯🇵 JPY',
  '🇰🇷 KRW',
  '🇸🇬 SGD',
  '🇳🇿 AUD',
  '🇨🇦 CAD',
  '🇬🇧 GBP'
];

const ConvertCurrency = () => {

  const [amount1, setAmount1] = useState(1);
  const [amount2, setAmount2] = useState(1);
  const [currency1, setCurrency1] = useState("USA");
  const [currency2, setCurrency2] = useState("USA");

  const handleAmountChange1 = (amount1:number) => {
    setAmount2(amount1 * 123);
    setAmount1(amount1);
  }

  const handleAmountChange2 = (amount2:number) => {
    setAmount1(amount2 * 0.007);
    setAmount2(amount2);
  }

  const handleCurrencyChange1 = (currency1:string) => {
    setCurrency1(currency1);
  }

  const handleCurrencyChange2 = (currency2:string) => {
    setCurrency2(currency2);
  }

  const swapAmount = () => {
    setAmount1(amount2);
    setCurrency1(currency2);
    setAmount2(amount1);
    setCurrency2(currency1);
  }

  const [convert, setConvert] = useState({ 
    amount1: '', 
    currency1: '',
    amount2: '', 
    currency2: '',
  });

  const handleSubmit = () => {
    console.log(convert);
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
          <img className="rounded-full" src={myphoto} alt='myphoto' width="150" height="200"></img>
        </div>
        <div className="m-14">
          <h1 className="mt-3 font-semibold text-3xl">Nasvirat</h1>
          <h3 className="mt-3 font-normal text-xl">Rank #30</h3>
        </div>
      </div>
      <div className="flex flex-row w-full">
        <div className='w-1/2'>
          <p className="my-3 font-semibold text-2xl">My Currency</p>
          <div className='flex flex-col w-11/12 overflow-y-auto h-80'>
          <OneCurrency currency=" USD" amount={1000}/>
          <OneCurrency currency=" CNY" amount={200}/>
          <OneCurrency currency=" HKD" amount={300}/>
          <OneCurrency currency=" EUR" amount={400}/>
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
              <p className='font-semibold'>USD</p>
              <p className='mx-2'>=</p>
              <p className='mr-1'>37.78</p>
              <p className='font-semibold'>THB</p>
            </div>
            <div className='flex flex-row my-6'>
              <CurrencyInput 
                amount={amount1} 
                onAmountChange={handleAmountChange1} 
                onCurrencyChange={handleCurrencyChange1} 
                currencies={currency} 
                currency={currency1} 
              />
            </div>
            <img className='mx-auto w-10 h-12 ' src={updownarrow} alt='profile-pic' onClick={swapAmount}></img>
            <div className='flex flex-row my-6'>
              <CurrencyInput 
                amount={amount2} 
                onAmountChange={handleAmountChange2} 
                onCurrencyChange={handleCurrencyChange2} 
                currencies={currency} 
                currency={currency2} 
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