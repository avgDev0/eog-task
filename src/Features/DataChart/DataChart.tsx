import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { useAppSelector } from '../../redux/hooks';
// import { MetricData } from '../../Types/MetricsSelector';

export default function Datachart() {
  const { data } = useAppSelector(s => s.metrics);

  // const units = data.map((m: MetricData) => ({
  //   unit: m.unit,
  //   metric: m.metricName,
  // }));

  const chartData = data[0]; //! For testing

  return chartData ? (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={chartData?.values.map(v => ({ at: v.at, [chartData.metricName]: v.value }))}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="at" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey={chartData.metricName} stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  ) : null;
}
