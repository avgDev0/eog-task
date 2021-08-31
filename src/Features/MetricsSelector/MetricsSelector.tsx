import React, { FC } from 'react';
import {
  ApolloClient,
  ApolloProvider,
  useQuery,
  gql,
  InMemoryCache,
} from '@apollo/client';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Typography } from '@material-ui/core';
import Chip from '../../components/Chip';
// import MultiSelector from '../../components/MultiSelect';
import CheckboxGroup from '../../components/CheckboxGroup';

const client = new ApolloClient({
  uri: 'https://react.eogresources.com/graphql',
  cache: new InMemoryCache(),
});

const query = gql`
  query getMetrics {
    getMetrics
  }
`;

type MetricsDataResponse = {
  getMetrics: string[];
};

const MetricsSelector: FC = () => {
  const { loading, error, data } = useQuery<MetricsDataResponse>(query);

  if (loading) return <LinearProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!data) return <Chip label="No metrics found" />;

  const { getMetrics: metrics } = data;

  return <CheckboxGroup options={metrics} />;
};

export default () => (
  <ApolloProvider client={client}>
    <MetricsSelector />
  </ApolloProvider>
);
