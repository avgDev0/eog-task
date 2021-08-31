import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles({
  sectionContainer: {
    height: '100%',
  },
});

export default function MetricsSection() {
  const classes = useStyles();
  return (
    <Grid container className={classes.sectionContainer} xs={12}>
      <Grid item xs={6}>
        Data
      </Grid>
      <Grid item xs={6}>
        Selector
      </Grid>
    </Grid>
  );
}
