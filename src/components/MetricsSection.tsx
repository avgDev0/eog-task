import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import MetricsSelector from '../Features/MetricsSelector/MetricsSelector';
import DataDashboard from '../Features/DataDashboard/DataDashboard';
import { useAppSelector } from '../redux/hooks';

const useStyles = makeStyles({
  sectionContainer: {
    height: 'max-content',
  },
});

export default function MetricsSection() {
  const classes = useStyles();
  const { data: metricsData } = useAppSelector((state) => state.metrics);

  return (
    <Grid direction="row-reverse" container className={classes.sectionContainer}>
      <Grid item xs={12} md={4} lg={3}>
        <MetricsSelector />
      </Grid>
      {metricsData.length ? <DataDashboard metrics={metricsData} /> : null}
    </Grid>
  );
}
