import React from 'react'
import 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';




const Chartport = () => {
  return (
    <Doughnut
      data={{
        labels: ['red', 'blue','yellow'],
        datasets: [{ 
          label: 'stock', 
          data: [300,50,100],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ] 
        }],
      }}
      options={{
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          legend: {
            position: 'right',
          },
        }
      }}
    />
  )
}

export default Chartport