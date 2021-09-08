import React from 'react';
import {
  Typography, AppBar, Toolbar, Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Weather from '../Features/Weather/Weather';

const useStyles = makeStyles({
  grow: {
    flexGrow: 1,
  },
});

export default () => {
  const classes = useStyles();

  const name = "Luis's";
  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container justifyContent="space-between">
          <Grid item xs={12} md={6}>
            <Typography color="inherit" className={classes.grow}>
              {name} EOG React Visualization Assessment
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Weather />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
