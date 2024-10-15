// components/RevenueChart.js
import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const RevenueChart = () => {
  const [timeframe, setTimeframe] = useState('daily'); // Default to daily

  // Sample data for demonstration purposes
  const revenueData = {
    daily: [100, 200, 150, 300, 250, 400, 300],
    weekly: [700, 1200, 1500, 2000, 2500],
    monthly: [3000, 4000, 5000, 6000],
  };

  const labels = {
    daily: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    weekly: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    monthly: ['Jan', 'Feb', 'Mar', 'Apr'],
  };

  const data = {
    labels: labels[timeframe],
    datasets: [
      {
        label: 'Revenue Generated',
        data: revenueData[timeframe],
        borderColor: 'rgba(37, 99, 235, 0.5)', // Main line color
        backgroundColor: 'rgba(37, 99, 235, 0.2)', // Lighter background color
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  const handleTimeframeChange = (event) => {
    setTimeframe(event.target.value);
  };

  return (
    <div className="p-4 w-[638px] bg-white my-4 rounded-lg">
      <div className="flex justify-between mb-4">
        <h4 className='uppercase'>Revenue</h4>
        <select onChange={handleTimeframeChange} value={timeframe} className="p-2 border border-gray-300 rounded">
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>
      <Line data={data} options={options} />
    </div>
  );
};

export default RevenueChart;
