import React from 'react';
import { TooltipProps } from 'recharts';
import { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent';
import moment from 'moment';
import { Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    padding: 5,
  },
});

const ChartToolTip = ({ label, payload }: TooltipProps<ValueType, NameType>) => {
  // TODO: handle multiple measurements, each payload entry is one
  if (!payload || !payload[0]) {
    return null;
  }

  const classes = useStyles();
  const { value = '', name = '' } = payload[0];
  return (
    <Card className={classes.root}>
      <span>{name} at {moment(label).format('HH:mm:ss')}</span>
      <p>{value}</p>
    </Card>
  );
};

export default ChartToolTip;
