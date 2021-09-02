import React, { useEffect } from 'react';
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
import { QUERY_GET_MEASUREMENTS, SUBSCRIPTION_NEW_MEASUREMENT } from '../Features/MetricsSelector/queries';

interface WithDataProps {
  value: string;
  checked: boolean;
}

interface CheckboxItemProps extends WithDataProps {
  subscribeToNewMeasurements: null | (() => () => void);
  onSelect: Function;
}

type Measurements = {
  value: number;
  unit: string;
  at: number;
};

const useStyles = makeStyles({
  listItem: {
    paddingTop: 0,
    paddingBottom: 0,
  },
});

const metricTimestamp = moment().subtract(0.5, 'hour').valueOf();

function CheckboxItem(props: CheckboxItemProps) {
  const {
    checked, value, subscribeToNewMeasurements, onSelect,
  } = props;
  const classes = useStyles();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (typeof subscribeToNewMeasurements === 'function') {
      subscribeToNewMeasurements();

      return () => subscribeToNewMeasurements();
    }

    return () => { };
  });

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

export default function withData(props: WithDataProps) {
  const { value, checked } = props;
  const dispatch = useAppDispatch();

  const [
    getMeasurements,
    {
      subscribeToMore,
    },
  ] = useLazyQuery<{ getMeasurements: Measurements[] }>(
    QUERY_GET_MEASUREMENTS,
    {
      variables: {
        metric: {
          metricName: value,
          after: metricTimestamp,
        },
      },
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

  const susbscribeToNewMeasurements = !subscribeToMore ? null : () => subscribeToMore({
    document: SUBSCRIPTION_NEW_MEASUREMENT,
    updateQuery: (prev, { subscriptionData }) => {
      console.log({ prev, subscriptionData });

      return prev;
    },
  });

  return (
    <CheckboxItem
      subscribeToNewMeasurements={susbscribeToNewMeasurements}
      value={value}
      checked={checked}
      onSelect={getMeasurements}
    />
  );
}
