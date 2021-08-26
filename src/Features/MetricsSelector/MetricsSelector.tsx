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
  // TODO: Implement multiple select with the obtained data

  const { loading, error, data } = useQuery<MetricsDataResponse>(query);

  if (loading) return <LinearProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!data) return <Chip label="No metrics found" />;

  const { getMetrics: metrics } = data;

  return (
    <div>
      {metrics.map(m => <span>{m}</span>)}
    </div>
  );
};

export default () => (
  <ApolloProvider client={client}>
    <MetricsSelector />
  </ApolloProvider>
);
