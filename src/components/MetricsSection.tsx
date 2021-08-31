import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import MetricsSelector from '../Features/MetricsSelector/MetricsSelector';
import DataCards from '../Features/DataCards/DataCards';

const useStyles = makeStyles({
  sectionContainer: {
    height: '100%',
  },
});

export default function MetricsSection() {
  const classes = useStyles();
  return (
    <Grid container className={classes.sectionContainer} xs={12}>
      <Grid item xs={8}>
        <DataCards />
      </Grid>
      <Grid item xs={4}>
        <MetricsSelector />
      </Grid>
    </Grid>
  );
}
