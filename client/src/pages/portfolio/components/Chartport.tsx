import React from 'react'
import {Pie} from "react-chartjs-2"




const Chartport = () => {
  return (
    <Pie
    data={{
      labels: ['red', 'blue','yellow'],
      datasets: [{ 
        label: 'colors', 
        data: [300,50,100],
        backgroundColor:[
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
        ] 
    }],
    }}
    />
  )
}

export default Chartport