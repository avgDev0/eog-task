import { configureStore } from '@reduxjs/toolkit';
import metricsReducer from '../Features/MetricsSelector/metricsSlice';

const store = configureStore({
  reducer: {
    metrics: metricsReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
