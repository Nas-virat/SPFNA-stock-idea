import React from 'react'

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
}];


const Tableport = () => {
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
        {temp.map((item, index) => (
          <tr className="border-b-4 font-medium" key={index}>
            <td className="px-6 py-4">{item.symbol}</td>
            <td className="px-6 py-4">{330.7}</td>
            <td className="px-6 py-4">{item.cost}</td>
            <td className="px-6 py-4">{item.volume}</td>
            <td className="px-6 py-4">{(330.7*item.volume).toLocaleString(undefined,{maximumFractionDigits:2})}</td>
            <td className={`px-6 py-4 ${(330.7-item.cost) > 0 ? `text-green-700` : `text-rose-700`}`}>{((330-item.cost)*item.volume).toLocaleString(undefined,{maximumFractionDigits:2})}</td>
            <td className={`px-6 py-4 ${(330.7-item.cost) > 0 ? `text-green-700` : `text-rose-700`}`}>{((330-item.cost)*100/item.cost).toLocaleString(undefined,{maximumFractionDigits:2})} %</td>
            <td className="px-6 py-4">
              <button className='bg-[#0E0741] hover:bg-[#2614ac] text-white font-bold h-9 w-20 rounded-2xl'>Sell</button>
            </td>
          </tr>
        ))}
          <tr className="border-b-4 font-medium" >
            <td className="px-6 py-4 font-semibold text-2xl">Total</td>
            <td className="px-6 py-4"></td>
            <td className="px-6 py-4"></td>
            <td className="px-6 py-4"></td>
            <td className="px-6 py-4">2000</td>
            <td className={`px-6 py-4 `}>{-230}</td>
            <td className={`px-6 py-4 `}>{-30}%</td>
          </tr>
      </tbody>
    </table>
  )
}

export default Tableport