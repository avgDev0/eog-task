import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

interface MetricsState {
  data: MetricData[];
}

const initialState: MetricsState = {
  data: [],
};

export const metricsSlice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {
    setMetricData: {
      reducer: (state, action: PayloadAction<MetricData>) => {
        state.data = [...state.data, action.payload];
      },
      prepare: (metric: string, values: MetricValue[], unit: string) => ({
        payload: {
          metricName: metric,
          values,
          unit,
          latestEntry: values[values.length - 1],
        },
      }),
    },
    removeMetricData: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter((m) => m.metricName !== action.payload);
    },
    addMetricDataEntry: (state, action: PayloadAction<NewEntry>) => {
      state.data.map((metricData) => {
        const { metric: metricToUpdate, value: metricEntry } = action.payload;

        if (metricData.metricName !== metricToUpdate) {
          return metricData;
        }

        const { values } = metricData;
        return {
          ...metricData,
          values: values.push(metricEntry),
          latestEntry: metricEntry,
        };
      });
    },
    clearAll: (state) => {
      state.data = [];
    },
  },
});

// TODO: fix this...
/* eslint-disable */
export const { setMetricData, removeMetricData, addMetricDataEntry, clearAll } = metricsSlice.actions;
/* eslint-enable */

export default metricsSlice.reducer;
