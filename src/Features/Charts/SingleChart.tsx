import React from 'react';
import LineChart, { LineProps } from '../../components/MetricsLineChart';
import type { MetricData } from '../../Types/Metrics';

type SingleChartProps = {
  metrics: MetricData[];
};

export default function DataChart(props: SingleChartProps) {
  const { metrics } = props;
  const units: string[] = metrics.reduce<string[]>((acc, item: MetricData) => {
    if (!acc.includes(item.unit)) {
      acc.push(item.unit);
    }

    return acc;
  }, []);

  const lines = metrics.reduce<LineProps[]>((acc, item: MetricData) => {
    acc.push({
      yAxisValue: item.unit,
      data: item.values,
      name: item.metricName,
      stroke: item.color,
    });

    return acc;
  }, []);

  return <LineChart yAxisValues={units} lines={lines} />;
}
