import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MetricsState {
  selected: string[];
}

const initialState: MetricsState = {
  selected: [],
};

export const metricsSlice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {
    setSelected: (state, action: PayloadAction<string[]>) => {
      state.selected = action.payload;
    },
    clearSelected: (state) => {
      state.selected = [];
    },
  },
});

export const { setSelected, clearSelected } = metricsSlice.actions;

export default metricsSlice.reducer;
