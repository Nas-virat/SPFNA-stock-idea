import React from 'react'
import PropTypes from 'prop-types';

const CurrencyInput = (props:any) => {
  return (
    <div className='flex flex-row w-full'>
        <input 
            className='h-10 bg-slate-50 pr-8 text-right shadow-lg w-3/5 rounded-2xl' 
            placeholder='Input amount' 
            value={props.amount.toLocaleString(undefined,{maximumFractionDigits:2})}
            onChange={(e) => props.onAmountChange(e.target.value)}
        />
        <select
            className='h-10 bg-slate-50 text-right shadow-lg w-1/5 rounded-2xl ml-12 flex place-content-center'
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

CurrencyInput.propTypes = {
    amount: PropTypes.number,
    currency: PropTypes.string,
    currencies: PropTypes.array,
    onAmountChange: PropTypes.func,
    onCurrencyChange: PropTypes.func,
};

export default CurrencyInput