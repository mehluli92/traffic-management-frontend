// components/ChartCard.js
import React, { useState } from 'react';
import DoughnutChart from './DoughnutChart';
import PieChart from './PieChart';

const ChartCard = ({title}) => {
  const [timeFrame, setTimeFrame] = useState('Daily'); // Default value for dropdown

  const handleTimeFrameChange = (event) => {
    setTimeFrame(event.target.value);
  };

  return (
    <div className="w-[210px] h-[275px] bg-white border-gray-150 rounded-lg p-4 relative">
      <div className="flex justify-between items-center mb-3">
        <h2 className="uppercase">{title}</h2>
        <select
          value={timeFrame}
          onChange={handleTimeFrameChange}
          className="border border-gray-300 font-medium rounded-md px-2 py-1"
        >
          <option value="Daily">Daily</option>
          <option value="Hourly">Hourly</option>
          <option value="Monthly">Monthly</option>
        </select>
      </div>

      <div className="flex justify-center items-center h-full">
        <DoughnutChart/>
      </div>
    </div>
  );
};

export default ChartCard;
