import React from 'react'
import 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';

import { ChartProps } from '../../../interface/ChartProps';

const Chartport : React.FC<ChartProps>= ({labels,data,backgroundColor}) => {
  return (
    <Doughnut
      data={{
        labels: labels,
        datasets: [{ 
          label: 'stock', 
          data: data,
          backgroundColor: backgroundColor
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
