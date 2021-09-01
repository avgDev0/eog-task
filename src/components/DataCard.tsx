import React, { useEffect } from 'react';
import {
  Grid, Card, CardContent, Typography,
} from '@material-ui/core';
import moment from 'moment';
import { useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import { QUERY_GET_MEASUREMENTS, SUBSCRIPTION_NEW_MEASUREMENT } from '../Features/DataCards/queries';

type WithDataProps = {
  metric: string;
};

type DataCardProps = {
  subscribeToNewMeasurements: () => () => void;
  metric: string;
};

type Measurements = {
  value: string;
  unit: string;
  at: number;
};

type MeasurementsDataResponse = {
  metric: string;
  measurements: Measurements[];
};

const useStyles = makeStyles({
  card: {
    width: '100%',
  },
});

const metricTimestamp = moment().subtract(0.5, 'hour').valueOf();

export function DataCard(props: DataCardProps) {
  const { subscribeToNewMeasurements, metric } = props;
  useEffect(() => {
    subscribeToNewMeasurements();
  });

  const classes = useStyles();

  return (
    <Grid item xs={12}>
      <Card className={classes.card}>
        <CardContent>
          <Typography color="textPrimary" variant="h6" gutterBottom>
            {metric}
          </Typography>
          <Typography color="textPrimary" variant="h4" gutterBottom>
            Value
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default function withData(props: WithDataProps) {
  const { metric } = props;

  const { subscribeToMore, data, error } = useQuery<{ GetMeasurements: MeasurementsDataResponse }>(
    QUERY_GET_MEASUREMENTS,
    {
      variables: {
        // TODO: lots of requests bc how I'm using moment, fix it.
        metrics: {
          metricName: metric,
          after: metricTimestamp,
        },
      },
    },
  );
  console.log({ data, error });

  const susbscribeToNewMeasurements = () => subscribeToMore({
    document: SUBSCRIPTION_NEW_MEASUREMENT,
    updateQuery: (prev, { subscriptionData }) => {
      console.log(subscriptionData);

      return prev;
    },
  });

  return <DataCard subscribeToNewMeasurements={susbscribeToNewMeasurements} metric={metric} />;
}
