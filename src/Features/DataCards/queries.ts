import { gql } from '@apollo/client';

export const QUERY_GET_MEASUREMENTS = gql`
  query GetMeasurements($metrics: [MeasurementQuery]) {
    getMultipleMeasurements(input: $metrics) {
      metric
      measurements {
        value
        unit
        at
      }
    }
  }
`;

export const SUBSCRIPTION_NEW_MEASUREMENT = gql`
  subscription OnNewMeasurement {
    newMeasurement {
      metric
      value
      at
      unit
    }
  }
`;
