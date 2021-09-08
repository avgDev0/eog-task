import React from 'react';
import {
  Typography, AppBar, Toolbar, Grid, withWidth, WithWidth,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Weather from '../Features/Weather/Weather';

const useStyles = makeStyles({
  grow: {
    flexGrow: 1,
  },
  flexCenter: {
    display: 'flex',
    justifyContent: 'center',
    margin: '5px 0',
  },
});

export default withWidth()((props: WithWidth) => {
  const classes = useStyles();
  const { width } = props;
  const isXs = width === 'xs';

  const name = "Luis's";
  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container justifyContent="space-between">
          <Grid item xs={12} md={6}>
            <Typography className={`${classes.grow} ${isXs ? classes.flexCenter : ''}`} variant={isXs ? 'body1' : 'h6'} color="inherit">
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
});
