import React from 'react';
import { useQuery } from '@apollo/client';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Typography } from '@material-ui/core';
import Chip from '../../components/Chip';
import CheckboxGroup from '../../components/CheckboxGroup';
import { QUERY_GET_METRICS } from './queries';

type MetricsDataResponse = {
  getMetrics: string[];
};

export default function MetricsSelector() {
  const {
    loading,
    error,
    data: metricsData,
  } = useQuery<MetricsDataResponse>(QUERY_GET_METRICS);

  if (loading) return <LinearProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!metricsData) return <Chip label="No metrics found" />;

  const { getMetrics: metrics } = metricsData;

  return <CheckboxGroup options={metrics} />;
}
