// components/DoughnutChart.js
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
  const data = {
    labels: ['Light Gray', 'Blue'],
    datasets: [
      {
        label: 'Data',
        data: [70, 30], // Adjust the values as needed
        backgroundColor: [
          'rgba(211, 211, 211, 0.5)', // Light gray
          'rgba(37, 99, 235, 0.5)',    // Darker blue corresponding to bg-blue-600
        ],
        borderColor: [
          'rgba(211, 211, 211, 1)',    // Light gray
          'rgba(37, 99, 235, 1)',      // Darker blue corresponding to bg-blue-600
        ],
        borderWidth: 0, // Set the border width to 4px
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
      tooltip: {
        enabled: false, // Disable tooltips if you don't want any numbers to show on hover
      },
    },
    cutout: '85%', // Makes the doughnut thinner; adjust as necessary
  };

  return (
    <div className="relative w-full max-w-xs mx-auto">
      <Doughnut data={data} options={options} />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-semibold text-black">50</span> {/* Centered number */}
      </div>
    </div>
  );
};

export default DoughnutChart;
