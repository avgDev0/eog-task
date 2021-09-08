import React from 'react';
import { withWidth, WithWidth, Grid } from '@material-ui/core';
import { useSubscription } from '@apollo/client';
import { MetricData } from '../../Types/Metrics';
import { useAppDispatch } from '../../redux/hooks';
import { SUBSCRIPTION_NEW_MEASUREMENTS } from '../MetricsSelector/queries';
import { addMetricDataEntry } from '../MetricsSelector/metricsSlice';
import DataCards from '../../components/DataCards';
import type { Measurement } from '../../Types/Measurements';

interface DataDashboardProps extends WithWidth {
  metrics: MetricData[];
}

function DataDashboard(props: DataDashboardProps) {
  const { metrics, width } = props;
  const dispatch = useAppDispatch();

  useSubscription<{ newMeasurement: Measurement }>(SUBSCRIPTION_NEW_MEASUREMENTS, {
    onSubscriptionData: ({ subscriptionData: { data } }) => {
      if (data && metrics.some((m) => m.metricName === data.newMeasurement.metric)) {
        const { newMeasurement } = data;
        dispatch(
          addMetricDataEntry({
            metric: newMeasurement.metric,
            value: {
              value: newMeasurement.value,
              at: newMeasurement.at,
            },
          }),
        );
      }
    },
  });

  return width === 'xs' ? null : (
    <Grid item xs={12} md={8} lg={9}>
      <DataCards metrics={metrics} />
    </Grid>
  );
}

export default withWidth()(DataDashboard);
