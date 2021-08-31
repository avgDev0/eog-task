import React from 'react';
import {
  useQuery,
  gql,
} from '@apollo/client';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Typography } from '@material-ui/core';
import Chip from '../../components/Chip';
// import MultiSelector from '../../components/MultiSelect';
import CheckboxGroup from '../../components/CheckboxGroup';

const query = gql`
  query getMetrics {
    getMetrics
  }
`;

type MetricsDataResponse = {
  getMetrics: string[];
};

export default function MetricsSelector() {
  const { loading, error, data } = useQuery<MetricsDataResponse>(query);

  if (loading) return <LinearProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!data) return <Chip label="No metrics found" />;

  const { getMetrics: metrics } = data;

  return <CheckboxGroup options={metrics} />;
}
