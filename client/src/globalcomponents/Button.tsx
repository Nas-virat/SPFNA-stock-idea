import React from 'react'


interface ButtonProps{
    text: string;
    color: string;
    fn : () => void;
}



const Button = ({text,color,fn}:ButtonProps) => {
  return (
    <button onClick={fn} 
    style={{backgroundColor: `${color}`}}
    className={`inline-block m-3 px-5 py-2 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md`}>
       {text} 
    </button>
  )
}

export default Button