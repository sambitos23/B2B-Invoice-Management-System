import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Pie Chart for Currencies',
    },
  },
};

export default function PieChart(props) {
  const { chart } = props;
  const data= {
    labels: chart.invoice,
    datasets: [
      {
        label: 'No of Invoices',
        data: chart.count,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div style={{width:"40%", margin:"auto", marginTop:40}}>
      <Pie options={options} data={data} />
    </div> 
  );
}