import { gql } from '@apollo/client';

export const QUERY_GET_METRICS = gql`
  query GetMetrics {
    getMetrics
  }
`;

export const QUERY_GET_MEASUREMENTS = gql`
  query GetMeasurements($metric: MeasurementQuery) {
    getMeasurements(input: $metric) {
      value
      unit
      at
    }
  }
`;

export const SUBSCRIPTION_NEW_MEASUREMENTS = gql`
  subscription OnNewMeasurement {
    newMeasurement {
      metric
      value
      at
    }
  }
`;
