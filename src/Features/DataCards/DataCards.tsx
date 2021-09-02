import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useAppSelector } from '../../redux/hooks';

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

export default function DataCards() {
  const { data } = useAppSelector((state) => state.metrics);

  const classes = useStyles();
  return (
    <Grid className={classes.cardContainer} container spacing={1}>
      {data.map(metricData => (
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
