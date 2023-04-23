import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// const data = [
//   { name: '30m', percentage: 15.00 },
//   { name: '32m', percentage: 20.00 },
//   { name: '34m', percentage: 20.00 },
//   { name: '36m', percentage: 30.00 },
//   { name: '38m', percentage: 45.00 },
//   { name: '40m', percentage: 47.50 },
//   { name: '42m', percentage: 52.50 },
//   { name: '44m', percentage: 60.00 },
// ];

function Chart({ data }) {
  if (!data || Object.keys(data).length === 0) {
    return null;
  }

  const chartData = []
  // eslint-disable-next-line array-callback-return
  Object.keys(data).map((key) => {
    chartData.push({ name: key, percentage: data[key] })
  })

  return (
    <BarChart width={500} height={400} data={chartData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="percentage" fill="#C56400" />
    </BarChart>
  );
}

export default Chart;
