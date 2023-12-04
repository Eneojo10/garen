import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Legend, Tooltip);

function LineChart({ paymentData }) {
  // console.log(paymentData);
  const labels = paymentData?.labels || [];
  const amounts = paymentData?.data || [];


  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Monthly dues payment performance 2024',
        data: amounts,
        backgroundColor: '#669906',
        borderColor: 'aqua',
        pointBordercolor: 'aqua',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    plugins: {
      legend: true,
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  };
  return (
    <div>
      <div
        style={{
          // width: '650px',
          height: '200px',
        }}
      >
        <Bar data={data} options={options}></Bar>
      </div>

      
    </div>
  );
}

export default LineChart;
