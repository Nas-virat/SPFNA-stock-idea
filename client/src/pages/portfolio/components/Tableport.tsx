import React from 'react'

interface stock{
  symbol?: string;
  cost ?: number;
  volume ?: number;
}

const temp : stock[] = [{
  symbol: 'appl',
  cost : 340,
  volume : 4
},
{
  symbol: 'appl',
  cost : 340,
  volume : 4
}];


const Tableport = ({symbol,cost,volume} : stock) => {
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
        <tr className="border-b-4">
          <td className="px-12 py-6">AAPL</td>
          <td className="px-12 py-6">330</td>
          <td className="px-12 py-6">340</td>
          <td className="px-12 py-6">4</td>
          <td className="px-12 py-6">{330*4}</td>
          <td className="px-12 py-6">{(330-340)*40}</td>
          <td className="px-12 py-6">{((330-340)*100/340).toFixed(2)}</td>
        </tr>
        <tr className="border-b-4">
          <td className="px-12 py-6">Apple</td>
          <td className="px-12 py-6">Apple</td>
          <td className="px-12 py-6">Apple</td>
          <td className="px-12 py-6">Apple</td>
          <td className="px-12 py-6">Apple</td>
          <td className="px-12 py-6">Apple</td>
          <td className="px-12 py-6">Apple</td>
        </tr>
      </tbody>
    </table>
  )
}

export default Tableport