import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSubscription } from '@apollo/client';
import { useAppDispatch } from '../../redux/hooks';
import { SUBSCRIPTION_NEW_MEASUREMENTS } from '../MetricsSelector/queries';
import { addMetricDataEntry } from '../MetricsSelector/metricsSlice';

const useStyles = makeStyles({
  cardContainer: {
    height: '100%',
    display: 'grid',
    gridTemplateRows: 'repeat(2, 50%)',
    gridTemplateColumns: 'repeat(3, 33%)',
  },
  card: {
    width: '100%',
  },
});

// TODO: keep it dry
type Measurements = {
  metric: string;
  value: number;
  at: number;
};

type DataCardsProps = {
  metrics: any[]; // TODO: fix this
};

export default function DataCards(props: DataCardsProps) {
  const { metrics } = props;
  const dispatch = useAppDispatch();

  useSubscription<{ newMeasurement: Measurements }>(SUBSCRIPTION_NEW_MEASUREMENTS, {
    onSubscriptionData: ({ subscriptionData: { data } }) => {
      if (data && metrics.some(m => m.metricName === data.newMeasurement.metric)) {
        const { newMeasurement } = data;
        dispatch(addMetricDataEntry({
          metric: newMeasurement.metric,
          value: {
            value: newMeasurement.value,
            at: newMeasurement.at,
          },
        }));
      }
    },
  });

  const classes = useStyles();
  return (
    <Grid className={classes.cardContainer} container spacing={1}>
      {metrics.map(metricData => (
        <Grid key={metricData.metricName} item xs={12}>
          <Card className={classes.card}>
            <CardContent>
              <Typography color="textPrimary" variant="h6" gutterBottom>
                {metricData.metricName}
              </Typography>
              <Typography color="textPrimary" variant="h4" gutterBottom>
                {metricData.latestEntry.value} {metricData.unit}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
