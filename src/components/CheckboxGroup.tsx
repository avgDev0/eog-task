import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Button,
  Grid,
} from '@material-ui/core';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { setSelected } from '../Features/MetricsSelector/metricsSlice';

type CheckboxListProps = {
  options: string[];
};

const useStyles = makeStyles((theme: Theme) => createStyles({
  list: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function CheckboxList(props: CheckboxListProps) {
  const classes = useStyles();
  const { options } = props;
  const { selected } = useAppSelector(state => state.metrics);
  const dispatch = useAppDispatch();

  const handleToggle = (option: string) => () => dispatch(
    setSelected(
      selected.includes(option)
        ? selected.filter(s => s !== option)
        : [...selected, option],
    ),
  );

  // TODO: move the grid container def a level higer so we can play with widths
  return (
    <Grid container xs={12} md={4}>
      {(selected.length > 1) && (
        <Grid item xs={12} justifyContent="center">
          <Button variant='outlined' color='primary' onClick={() => dispatch(setSelected([]))}>
            Clear selection
          </Button>
        </Grid>
      )}
      <Grid item xs={12}>
        <List className={classes.list}>
          {options.map((value) => {
            const labelId = `checkbox-list-label-${value}`;

            return (
              <ListItem key={value} role={undefined} dense button onClick={handleToggle(value)}>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={selected.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={value} />
              </ListItem>
            );
          })}
        </List>
      </Grid>
    </Grid>
  );
}
