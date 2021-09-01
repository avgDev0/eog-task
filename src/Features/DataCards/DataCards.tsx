import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useAppSelector } from '../../redux/hooks';
import DataCard from '../../components/DataCard';

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
  const { selected } = useAppSelector((state) => state.metrics);

  const classes = useStyles();
  return (
    <Grid className={classes.cardContainer} container spacing={1}>
      {selected.map((metric) => <DataCard metric={metric} key={metric} />)}
    </Grid>
  );
}
