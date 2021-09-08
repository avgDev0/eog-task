import React from 'react';
import {
  Grid, Typography, Card, CardContent,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LineChart from '../../components/MetricsLineChart';
import { MetricData } from '../../Types/Metrics';

type MultiChartsProps = {
  metrics: MetricData[];
};

const useStyles = makeStyles({
  card: {
    width: '100%',
    borderTop: '1px solid black',
    borderRadius: 0,
  },
});

export default function MultiCharts(props: MultiChartsProps) {
  const { metrics } = props;
  const classes = useStyles();

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
          <Card className={classes.card}>
            <CardContent>
              <Grid container key={metricInfo.metricName}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">
                    {metricInfo.metricName}: {metricInfo.latestEntry.value} {metricInfo.unit}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <LineChart
                    yAxisValues={[metricInfo.unit]}
                    syncId="multi-line-chart"
                    lines={[line]}
                    heigth={100}
                    displayLegend={false}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        );
      })}
    </Grid>
  );
}
