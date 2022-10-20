import React from 'react'

import StockProps from '../interface/StockProps';

import Swal from 'sweetalert2';


const Tableport: React.FC<StockProps> = ({data}) => {


  const handleSell = () => {
    console.log("sell");
    Swal.fire({
      title: 'Sell Stock',
      html: `Do you want to sell this stock?`,
      icon: 'warning',
      confirmButtonText: 'OK',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Successfully Sell!',
          html: `You have successfully sell this stock!`,
          icon: 'success',
          confirmButtonText: 'OK',
        });
      }
    });
  }
  return (
    <table className="mx-4 mt-7 border-collapse min-w-[70%] text-xl rounded-xl overflow-hidden">
      <thead>
        <tr className="text-left bg-purple-500 text-white">
          <th className="px-6 py-4">Symbol</th>
          <th className="px-6 py-4">Price</th>
          <th className="px-6 py-4">Cost Price</th>
          <th className="px-6 py-4">Volume</th>
          <th className="px-6 py-4">Market Value</th>
          <th className="px-6 py-4">P/L</th>
          <th className="px-6 py-4">P/L%</th>
          <th className="px-6 py-4"></th>
        </tr>
      </thead>
      <tbody>  
        {data.map((item, index) => (
          <tr className="border-b-4 font-medium" key={index}>
            <td className="px-6 py-4">{item.symbol}</td>
            <td className="px-6 py-4">{330.7}</td>
            <td className="px-6 py-4">{item.cost}</td>
            <td className="px-6 py-4">{item.volume}</td>
            <td className="px-6 py-4">{(330.7*item.volume).toLocaleString(undefined,{maximumFractionDigits:2})}</td>
            <td className={`px-6 py-4 ${(330.7-item.cost) > 0 ? `text-green-700` : `text-rose-700`}`}>{((330.7-item.cost)*item.volume).toLocaleString(undefined,{maximumFractionDigits:2})}</td>
            <td className={`px-6 py-4 ${(330.7-item.cost) > 0 ? `text-green-700` : `text-rose-700`}`}>{((330.7-item.cost)*100/item.cost).toLocaleString(undefined,{maximumFractionDigits:2})} %</td>
            <td className="px-6 py-4">
              <button onClick={handleSell} className='bg-[#0E0741] hover:bg-[#2614ac] text-white font-bold h-9 w-20 rounded-2xl'>Sell</button>
            </td>
          </tr>
        ))}
          <tr className="border-b-4 font-medium" >
            <td className="px-6 py-4 font-semibold text-2xl">Total</td>
            <td className="px-6 py-4"></td>
            <td className="px-6 py-4"></td>
            <td className="px-6 py-4"></td>
            <td className="px-6 py-4">
              {(data.reduce((accumulator, object) => {return accumulator + 330.7*object.volume;},0)).toLocaleString(undefined,{maximumFractionDigits:2})}
            </td>
            <td className="px-6 py-4">
              {data.reduce((accumulator, object) => {return accumulator +(330.7 - object.cost)*object.volume;},0)}
              </td>
            <td className="px-6 py-4">{-30}%</td>
          </tr>
      </tbody>
    </table>
  )
}

export default Tableport
