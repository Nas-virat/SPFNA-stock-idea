import React from 'react'

interface CurrencyProps{
  currency: string;
  amount: number;
}

const OneCurrency:React.FC<CurrencyProps> = ({currency,amount}) => {
  return (
    <div className='ml-2 w-11/12 flex flex-row mt-6 rounded-2xl bg-slate-50 shadow-lg justify-between p-1'>
        <div className='flex flex-row'>
            <p className='self-center font-bold px-1'>{currency}</p>
        </div>
        <div className='flex flex-row px-2 py-3'>
            <p className='mr-3 self-center text-right'>{amount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
            <p className='mr-4 self-center text-right font-medium'>{currency}</p>
        </div>
    </div>
  )
}

export default OneCurrency