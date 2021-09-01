import { gql } from '@apollo/client';

export const QUERY_GET_METRICS = gql`
  query GetMetrics {
    getMetrics
  }
`;
