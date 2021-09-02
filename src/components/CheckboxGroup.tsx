import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  List,
  Button,
  Grid,
  Typography,
} from '@material-ui/core';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { clearAll } from '../Features/MetricsSelector/metricsSlice';
import CheckboxItem from './CheckboxItem';
import type { CheckboxListProps } from '../Types/CheckboxGroup';

const useStyles = makeStyles((theme: Theme) => createStyles({
  metricsMenu: {
    maxHeight: '100%',
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 5,
  },
  clear: {
    width: '100%',
    paddingTop: 0,
    paddingBottom: 0,
  },
}));

export default function CheckboxList(props: CheckboxListProps) {
  const classes = useStyles();
  const { options } = props;
  const { data } = useAppSelector(state => state.metrics);
  const dispatch = useAppDispatch();

  return (
    <Grid className={classes.metricsMenu} container>
      <Grid container>
        <Grid className={classes.title} item xs={6}>
          <Typography variant="h6">
            Select metrics
          </Typography>
        </Grid>
        {(data.length > 1) && (
          <Grid item xs={4} md={6}>
            <Button className={classes.clear} variant='outlined' color='primary' onClick={() => dispatch(clearAll())}>
              Clear selection
            </Button>
          </Grid>
        )}
      </Grid>
      <Grid item xs={12}>
        <List disablePadding>
          {options.map((value) => (
            <CheckboxItem
              key={value}
              value={value}
              checked={data.some(m => m.metricName === value)}
            />
          ))}
        </List>
      </Grid>
    </Grid>
  );
}
