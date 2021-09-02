import React from 'react';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useAppDispatch } from '../redux/hooks';
import { removeSelected, addSelected } from '../Features/MetricsSelector/metricsSlice';

type CheckboxItemProps = {
  value: string;
  checked: boolean;
};

const useStyles = makeStyles({
  listItem: {
    paddingTop: 0,
    paddingBottom: 0,
  },
});

export default function CheckboxItem(props: CheckboxItemProps) {
  const { checked, value } = props;
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const handleToggle = (option: string) => dispatch(
    checked ? removeSelected(option) : addSelected(option),
  );

  const labelId = `checkbox-list-label-${value}`;

  return (
    <ListItem
      className={classes.listItem}
      key={value}
      button
      onClick={() => handleToggle(value)}
    >
      <ListItemIcon>
        <Checkbox
          edge="start"
          checked={checked}
          tabIndex={-1}
          disableRipple
          inputProps={{ 'aria-labelledby': labelId }}
        />
      </ListItemIcon>
      <ListItemText id={labelId} primary={value} />
    </ListItem>
  );
}
