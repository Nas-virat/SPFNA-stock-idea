import React from 'react'

interface stock{
  symbol: string;
  cost : number;
  volume : number;
}

const temp : stock[] = [{
  symbol: 'AAPL',
  cost : 340,
  volume : 4
},
{
  symbol: 'GOOG',
  cost : 100,
  volume : 3
}];


const Tableport = () => {
  return (
    <table className="mx-4 mt-7 border-collapse min-w-[70%] text-xl">
      <thead>
        <tr className="text-left bg-purple-500 text-white">
          <th className="px-12 py-6">Symbol</th>
          <th className="px-12 py-6">Price</th>
          <th className="px-12 py-6">Cost Price</th>
          <th className="px-12 py-6">Volume</th>
          <th className="px-12 py-6">Market Value</th>
          <th className="px-12 py-6">P/L</th>
          <th className="px-12 py-6">P/L%</th>
        </tr>
      </thead>
      <tbody>  
        {temp.map((item, index) => (
          <tr className="border-b-4 font-medium" key={index}>
            <td className="px-12 py-6">{item.symbol}</td>
            <td className="px-12 py-6">{330}</td>
            <td className="px-12 py-6">{item.cost}</td>
            <td className="px-12 py-6">{item.volume}</td>
            <td className="px-12 py-6">{(330*item.volume).toFixed(2)}</td>
            <td className={`px-12 py-6 ${(330-item.cost) > 0 ? `text-green-700` : `text-rose-700`}`}>{((330-item.cost)*item.volume).toFixed(2)}</td>
            <td className={`px-12 py-6 ${(330-item.cost) > 0 ? `text-green-700` : `text-rose-700`}`}>{((330-item.cost)*100/item.cost).toFixed(2)} %</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Tableport