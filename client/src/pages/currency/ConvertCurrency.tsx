import React from 'react'
import Layout from '../../globalcomponents/Layout'
import myphoto from '../../assets/handsomeboy.jpg';
import OneCurrency from './Component/OneCurrency';
import updownarrow from './Component/updownarrow.png';

const ConvertCurrency = () => {
  return (
    <Layout>
      <div className="flex items-center">
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
          <OneCurrency/>
          <OneCurrency/>
          <OneCurrency/>
          <OneCurrency/>
          <OneCurrency/>
          <OneCurrency/>
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
              <input className='h-10 bg-slate-50 pr-8 text-right shadow-lg w-3/5 rounded-2xl' placeholder='Input amount' />
              <div className='h-10 bg-slate-50 text-right shadow-lg w-1/6 rounded-2xl ml-12 flex place-content-center'>
                <img className='w-10 h-10 ' src='https://cdn-icons-png.flaticon.com/512/555/555526.png' alt='profile-pic'></img>
              </div>
            </div>
            <img className='ml-auto mr-28 w-10 h-12 ' src={updownarrow} alt='profile-pic'></img>
            <div className='flex flex-row my-6'>
              <div className='h-10 bg-slate-50 pr-8 text-right shadow-lg w-3/5 rounded-2xl'>

              </div>
              <div className='h-10 bg-slate-50 text-right shadow-lg w-1/6 rounded-2xl ml-12 flex place-content-center'>
                <img className='w-10 h-10 ' src='https://cdn-icons-png.flaticon.com/512/555/555526.png' alt='profile-pic'></img>
              </div>
            </div>
            <button className='mt-6 bg-[#856dab] hover:bg-[#4a366b] text-white font-bold h-8 w-1/5 rounded-3xl'>Convert</button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ConvertCurrency