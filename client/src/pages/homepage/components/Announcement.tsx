import React from 'react'

const announcement = (data:any) => {

    const date = new Date(data.data.date);

  return (
    <div>
        <p className='font-bold text-lg'>{data.data.title} <span className='text-sm font-normal text-slate-600 ml-2'>{date.toLocaleString()}</span></p>
        <p className='text-base mt-3'>{data.data.details}</p>
    </div>
  )
}

export default announcement