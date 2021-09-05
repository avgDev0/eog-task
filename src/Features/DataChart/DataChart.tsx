import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import moment from 'moment';
import type { MetricData } from '../../Types/Metrics';
import { useAppSelector } from '../../redux/hooks';

export default function DataChart() {
  const { data } = useAppSelector(s => s.metrics);

  if (!data.length) {
    return null;
  }

  const units: string[] = data.reduce<string[]>((acc, item: MetricData) => {
    if (!acc.includes(item.unit)) {
      acc.push(item.unit);
    }

    return acc;
  }, []);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        margin={{
          right: 10,
          left: 10,
          bottom: 20,
          top: 10,
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
        {units.map((unit: string) => (
          <YAxis key={unit} yAxisId={`label-${unit}`} label={{ value: unit, angle: -90, position: 'insideBottom' }} />
        ))}
        <Tooltip labelFormatter={(label: number) => moment(label).format('MMM Do, h:mm:ss A')} />
        <Legend />
        {data.map((metricInfo: MetricData) => (
          <Line
            type="monotone"
            dataKey="value"
            yAxisId={`label-${metricInfo.unit}`}
            data={metricInfo.values}
            name={metricInfo.metricName}
            key={metricInfo.metricName}
            stroke={metricInfo.color}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
