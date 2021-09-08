import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import LineChart from '../../components/MetricsLineChart';
import { MetricData } from '../../Types/Metrics';

type MultiChartsProps = {
  metrics: MetricData[];
};

export default function DataSyncedCharts(props: MultiChartsProps) {
  const { metrics } = props;

  return (
    <Grid container>
      {metrics.map((metricInfo: MetricData) => {
        const line = {
          yAxisValue: metricInfo.unit,
          data: metricInfo.values,
          name: metricInfo.metricName,
          stroke: metricInfo.color,
        };

        return (
          <Grid container key={metricInfo.metricName}>
            <Grid item xs={12}>
              <Typography variant="subtitle1">
                {metricInfo.metricName}: {metricInfo.latestEntry.value} {metricInfo.unit}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <LineChart yAxisValues={[metricInfo.unit]} syncId="multi-line-chart" lines={[line]} />
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
}
