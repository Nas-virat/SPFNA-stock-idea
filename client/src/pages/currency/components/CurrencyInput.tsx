import React from 'react'
import './CurrencyInput.css'

interface currencyProps {
    amount: number;
    currency: string;
    currencies: string[];
    onAmountChange: Function;
    onCurrencyChange: Function;
}

const CurrencyInput = (props:currencyProps) => {
  return (
    <div className='flex flex-row w-full'>
        <input 
            className='h-10 bg-slate-50 pr-8 text-right shadow-lg w-3/5 rounded-2xl outline-none' 
            placeholder='Input amount' 
            value={Math.round(props.amount*100)/100}
            min='1'
            type='number'
            onChange={(e) => props.onAmountChange(e.target.value)}
        />
        <select
            className='h-10 bg-slate-50 text-right shadow-lg w-1/5 rounded-2xl ml-12 flex place-content-center outline-none'
            value={props.currency}
            onChange={(e) => props.onCurrencyChange(e.target.value)}
        >
            {props.currencies.map((currency:string) => (
                <option 
                    key={currency}
                    value={currency} 
                    className='bg-slate-100 h-56 overflow-y-auto'>
                    {currency}
                </option>
            ))}
        </select>
    </div>
  )
}

export default CurrencyInput