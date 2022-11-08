import React from 'react'
import StockProps from "../../../interface/StockProps";





const Tableport: React.FC<StockProps> = ({data,totalvalue,pl,plpercent}) => {

  return (
    <table className="mx-4 mt-7 border-collapse min-w-[70%] text-xl rounded-xl overflow-hidden">
      <thead>
        <tr className="text-left bg-purple-500 text-white">
          <th className="px-6 py-4">Symbol</th>
          <th className="px-6 py-4">Price</th>
          <th className="px-6 py-4">Cost Price</th>
          <th className="px-6 py-4">Quantity</th>
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
            <td className="px-6 py-4">{item.price.toLocaleString(undefined,{maximumFractionDigits:2})}</td>
            <td className="px-6 py-4">{item.cost_price.toLocaleString(undefined,{maximumFractionDigits:2})}</td>
            <td className="px-6 py-4">{item.quantity}</td>
            <td className="px-6 py-4">{(item.price*item.quantity).toLocaleString(undefined,{maximumFractionDigits:2})}</td>
            <td className={`px-6 py-4 ${(item.price-item.cost_price) > 0 ? `text-green-700` : `text-rose-700`}`}>{((item.price-item.cost_price)*item.quantity).toLocaleString(undefined,{maximumFractionDigits:2})}</td>
            <td className={`px-6 py-4 ${(item.price-item.cost_price) > 0 ? `text-green-700` : `text-rose-700`}`}>{((item.price-item.cost_price)*100/item.cost_price).toLocaleString(undefined,{maximumFractionDigits:2})} %</td>
          </tr>
        ))}
          <tr className="border-b-4 font-medium" >
            <td className="px-6 py-4 font-semibold text-2xl">Total</td>
            <td className="px-6 py-4"></td>
            <td className="px-6 py-4"></td>
            <td className="px-6 py-4"></td>
            <td className="px-6 py-4">
              {totalvalue.toLocaleString(undefined,{maximumFractionDigits:2})}
            </td>
            <td className={`px-6 py-4 ${pl > 0 ? 'text-green-700' : 'text-rose-700'}`}>
              {pl.toLocaleString(undefined,{maximumFractionDigits:2})}
            </td>
            <td className={`px-6 py-4 ${plpercent > 0 ? 'text-green-700' : 'text-rose-700'}`}>
              {plpercent.toLocaleString(undefined,{maximumFractionDigits:2})}%
            </td>
          </tr>
      </tbody>
    </table>
  )
}

export default Tableport
