import React from 'react';
import { withWidth, WithWidth } from '@material-ui/core';
import SingleChart from '../Features/Charts/SingleChart';
import MultiCharts from '../Features/Charts/MultiCharts';
import { useAppSelector } from '../redux/hooks';

function ChartSection(props: WithWidth) {
  const { width } = props;
  const { data } = useAppSelector((s) => s.metrics);

  if (!data.length) {
    return null;
  }

  return width === 'xs'
    ? <MultiCharts metrics={data} />
    : <SingleChart metrics={data} />;
}

export default withWidth()(ChartSection);
