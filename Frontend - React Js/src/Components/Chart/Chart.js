import React from 'react'
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};

function Chart(props) {
  const { chart } = props; 
    
  // const labels = chart.businessCode;
  const labels = ["Unilever", "Johnson and Johnson", "Bose", "Kellog's", "Sony", "Puma"];

  const data = {
    labels,
    datasets: [
      {
        label: 'No of Customers',
        data: chart.customerNumber,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Total Open Amount',
        data: chart.totalAmount,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };  

  return (
    <div style={{width:"90%", margin:"auto"}}>
      <Bar options={options} data={data}/>
    </div>
  )
}

export default Chart