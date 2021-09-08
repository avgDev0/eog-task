import React from 'react';
import {
  Grid, Card, CardContent,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { MetricData } from '../Types/Metrics';

type DataGridProps = {
  metrics: MetricData[];
};

const useStyles = makeStyles({
  containerCard: {
    width: '100%',
    marginBottom: 5,
  },
});

export default function DataGrid(props: DataGridProps) {
  const { metrics } = props;
  const classes = useStyles();

  return (
    <Card className={classes.containerCard}>
      <CardContent>
        <Grid container>
          {metrics.map(({ metricName, unit, latestEntry: { value } }: MetricData) => (
            <Grid item xs={6}>
              {metricName}: {value} {unit}
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}
