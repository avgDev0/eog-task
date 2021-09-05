import React from 'react';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
} from '@material-ui/core';
import moment from 'moment';
import { useLazyQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import { useAppDispatch } from '../redux/hooks';
import { setMetricData, removeMetricData } from '../Features/MetricsSelector/metricsSlice';
import { QUERY_GET_MEASUREMENTS } from '../Features/MetricsSelector/queries';
import type { IWithDataProps, CheckboxItemProps } from '../Types/CheckboxItem';
import type { Measurement } from '../Types/Measurements';

const useStyles = makeStyles({
  listItem: {
    paddingTop: 0,
    paddingBottom: 0,
  },
});

const metricTimestamp = moment().subtract(0.5, 'hour').valueOf();

function CheckboxItem(props: CheckboxItemProps) {
  const {
    checked, value, onSelect,
  } = props;
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const handleToggle = (option: string) => {
    if (checked) {
      dispatch(removeMetricData(option));

      return;
    }

    onSelect();
  };

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

export default function withData(props: IWithDataProps) {
  const { value, checked } = props;
  const dispatch = useAppDispatch();

  const [
    getMeasurements,
  ] = useLazyQuery<{ getMeasurements: Measurement[] }>(
    QUERY_GET_MEASUREMENTS,
    {
      variables: {
        metric: {
          metricName: value,
          after: metricTimestamp,
        },
      },
      fetchPolicy: 'cache-and-network',
      onCompleted: ({ getMeasurements: measurements }) => {
        const [{ unit }] = measurements;
        const values = measurements.map(m => ({
          value: m.value,
          at: m.at,
        }));

        dispatch(setMetricData(value, values, unit));
      },
    },
  );

  return (
    <CheckboxItem
      value={value}
      checked={checked}
      onSelect={getMeasurements}
    />
  );
}
