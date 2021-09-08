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
      {metrics.map(({
        metricName, unit, values, color, latestEntry,
      }: MetricData) => {
        const line = {
          yAxisValue: unit,
          data: values,
          name: metricName,
          stroke: color,
        };

        return (
          <Card className={classes.card} key={metricName}>
            <CardContent>
              <Grid container key={metricName}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">
                    {metricName}: {latestEntry.value} {unit}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <LineChart
                    yAxisValues={[unit]}
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
