import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line object-curly-newline
import { MetricValue, MetricData, NewEntry, MetricsState } from '../../Types/MetricsSelector';

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
      const { metric: metricToUpdate, value: metricEntry } = action.payload;
      const entryIndex = state.data.findIndex((m) => m.metricName === metricToUpdate);

      if (entryIndex > -1) {
        const dataEntry = state.data[entryIndex];
        dataEntry.values = [...dataEntry.values, metricEntry];
        dataEntry.latestEntry = metricEntry;

        state.data[entryIndex] = dataEntry;
      }
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
