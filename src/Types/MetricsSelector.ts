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
};

type NewEntry = {
  metric: string;
  value: MetricValue;
};

type MetricsState = {
  data: MetricData[];
};

// eslint-disable-next-line object-curly-newline
export type { MetricsDataResponse, MetricData, MetricValue, NewEntry, MetricsState };
