import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { useAppSelector } from '../../redux/hooks';

export default function Datachart() {
  const { data } = useAppSelector(s => s.metrics);

  if (!data.length) {
    return (<></>);
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="at" />
        {data.map(m => (
          <YAxis label={m.unit} />
        ))}
        <Tooltip />
        <Legend />
        {data.map((m) => (
          <Line dataKey="value" data={m.values} name={m.metricName} key={m.metricName} />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
