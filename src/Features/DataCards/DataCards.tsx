import React from 'react';
import {
  Grid, Card, CardContent, Typography,
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
  const { selected } = useAppSelector((state) => state.metrics);
  const classes = useStyles();
  return (
    <Grid className={classes.cardContainer} container spacing={1} xs={12}>
      {selected.map((metric) => (
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
      ))}
    </Grid>
  );
}
