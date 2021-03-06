/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import moment from 'moment';
import {
  ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line, Legend,
} from 'recharts';
import { MetricValue } from '../Types/Metrics';

export type LineProps = {
  yAxisValue: string;
  data: MetricValue[];
  name: string;
  stroke: string;
};

type LineChartProps = {
  yAxisValues: string[];
  lines: LineProps[];
  heigth?: number | string;
  syncId?: string;
  displayLegend?: boolean;
};

export default function MetricsLineChart(props: LineChartProps) {
  const {
    yAxisValues, heigth = '100%', syncId, lines, displayLegend = true,
  } = props;

  return (
    <ResponsiveContainer width="100%" height={heigth}>
      <LineChart
        syncId={syncId}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
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
        {yAxisValues.map((value: string) => (
          <YAxis key={value} yAxisId={`label-${value}`} label={{ value, angle: -90, position: 'insideBottom' }} />
        ))}
        <Tooltip labelFormatter={(label: number) => moment(label).format('MMM Do, h:mm:ss A')} />
        {displayLegend ? <Legend /> : null}
        {lines.map(({
          yAxisValue, data, name, stroke,
        }: LineProps) => (
          <Line
            type="monotone"
            dataKey="value"
            yAxisId={`label-${yAxisValue}`}
            data={data}
            name={name}
            key={name}
            stroke={stroke}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
