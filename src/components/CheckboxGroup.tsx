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
  Typography,
} from '@material-ui/core';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { setSelected } from '../Features/MetricsSelector/metricsSlice';

type CheckboxListProps = {
  options: string[];
};

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
  listItem: {
    paddingTop: 0,
    paddingBottom: 0,
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

  return (
    <Grid className={classes.metricsMenu} container xs={12}>
      <Grid container xs={12}>
        <Grid className={classes.title} item xs={6}>
          <Typography variant="h6">
            Select metrics
          </Typography>
        </Grid>
        {(selected.length > 1) && (
          <Grid item xs={4} md={6} alignItems="center">
            <Button className={classes.clear} variant='outlined' color='primary' onClick={() => dispatch(setSelected([]))}>
              Clear selection
            </Button>
          </Grid>
        )}
      </Grid>
      <Grid item xs={12}>
        <List disablePadding>
          {options.map((value) => {
            const labelId = `checkbox-list-label-${value}`;

            return (
              <ListItem
                className={classes.listItem}
                key={value}
                button
                onClick={handleToggle(value)}
              >
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
