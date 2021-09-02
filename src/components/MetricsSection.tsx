import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import MetricsSelector from '../Features/MetricsSelector/MetricsSelector';
import DataCards from '../Features/DataCards/DataCards';
import { useAppSelector } from '../redux/hooks';

const useStyles = makeStyles({
  sectionContainer: {
    height: '100%',
    paddingTop: 5,
  },
});

export default function MetricsSection() {
  const classes = useStyles();
  const { data: metricsData } = useAppSelector((state) => state.metrics);

  return (
    <Grid container className={classes.sectionContainer}>
      <Grid item xs={8}>
        {metricsData.length && <DataCards metrics={metricsData} />}
      </Grid>
      <Grid item xs={4}>
        <MetricsSelector />
      </Grid>
    </Grid>
  );
}
