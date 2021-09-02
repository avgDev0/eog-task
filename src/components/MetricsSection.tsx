import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { useSubscription } from '@apollo/client';
import { SUBSCRIPTION_NEW_MEASUREMENTS } from '../Features/MetricsSelector/queries';
import { addMetricDataEntry } from '../Features/MetricsSelector/metricsSlice';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import MetricsSelector from '../Features/MetricsSelector/MetricsSelector';
import DataCards from '../Features/DataCards/DataCards';

const useStyles = makeStyles({
  sectionContainer: {
    height: '100%',
    paddingTop: 5,
  },
});

// TODO: keep it dry
type Measurements = {
  metric: string;
  value: number;
  at: number;
};

export default function MetricsSection() {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { data: metricsData } = useAppSelector(s => s.metrics);

  useSubscription<{ newMeasurement: Measurements }>(SUBSCRIPTION_NEW_MEASUREMENTS, {
    onSubscriptionData: ({ subscriptionData: { data } }) => {
      console.log({ data, nmm: data?.newMeasurement?.metric });
      if (data && metricsData.some(m => m.metricName === data.newMeasurement.metric)) {
        const { newMeasurement } = data;
        console.log({ data, newMeasurement });
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

  return (
    <Grid container className={classes.sectionContainer}>
      <Grid item xs={8}>
        <DataCards />
      </Grid>
      <Grid item xs={4}>
        <MetricsSelector />
      </Grid>
    </Grid>
  );
}
