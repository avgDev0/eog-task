import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import moment from 'moment';
import { useAppSelector } from '../../redux/hooks';

export default function DataChart() {
  const { data } = useAppSelector(s => s.metrics);

  if (!data.length) {
    return null;
  }

  /**
   * TODO:
   *  try to fix domain
   *  random color lines, seems like we need to store that on redux
   */

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
        <XAxis
          dataKey="at"
          tickFormatter={(value: number) => moment(value).format('HH:mm')}
          minTickGap={20}
          type="number"
          domain={[moment().subtract(0.5, 'hour').valueOf(), moment().valueOf()]}
        />
        {data.map(m => (
          <YAxis yAxisId={`label-${m.metricName}`} label={{ value: m.unit, angle: -90, position: 'insideBottom' }} />
        ))}
        <Tooltip labelFormatter={(label: number) => moment(label).format('MMM Do, h:mm:ss A')} />
        <Legend />
        {data.map((m) => (
          <Line
            type="monotone"
            dataKey="value"
            yAxisId={`label-${m.metricName}`}
            data={m.values}
            name={m.metricName}
            key={m.metricName}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
