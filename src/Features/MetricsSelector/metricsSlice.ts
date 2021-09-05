import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import randomColor from 'randomcolor';
import type {
  MetricValue, MetricData, NewMetricEntry, MetricsState,
} from '../../Types/Metrics';

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
          color: randomColor({
            hue: 'random',
            luminosity: 'dark',
          }),
        },
      }),
    },
    removeMetricData: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter((m) => m.metricName !== action.payload);
    },
    addMetricDataEntry: (state, action: PayloadAction<NewMetricEntry>) => {
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

export const {
  setMetricData, removeMetricData, addMetricDataEntry, clearAll,
} = metricsSlice.actions;

export default metricsSlice.reducer;
