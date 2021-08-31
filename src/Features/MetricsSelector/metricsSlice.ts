import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MetricsState {
  available: string[];
  selected: string[];
}

const initialState: MetricsState = {
  available: [],
  selected: [],
};

export const metricsSlice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {
    setAvailable: (state, action: PayloadAction<string[]>) => {
      state.available = action.payload;
    },
    setSelected: (state, action: PayloadAction<string[]>) => {
      state.selected = action.payload;
    },
    clearSelected: (state) => {
      state.selected = [];
    },
  },
});

export const { setAvailable, setSelected, clearSelected } = metricsSlice.actions;

export default metricsSlice.reducer;
