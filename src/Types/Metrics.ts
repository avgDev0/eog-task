type MetricsDataResponse = {
  getMetrics: string[];
};

type MetricValue = {
  value: number;
  at: number;
};

type MetricData = {
  metricName: string;
  values: MetricValue[];
  unit: string;
  latestEntry: MetricValue;
  color: string;
};

type NewMetricEntry = {
  metric: string;
  value: MetricValue;
};

type MetricsState = {
  data: MetricData[];
};

export type {
  MetricsDataResponse, MetricData, MetricValue, NewMetricEntry, MetricsState,
};
