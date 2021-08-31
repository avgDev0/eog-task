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
    addSelected: (state, action: PayloadAction<string>) => {
      state.selected = [...state.selected, action.payload];
    },
    removeSelected: (state, action: PayloadAction<string>) => {
      state.selected = state.selected.filter((s) => s !== action.payload);
    },
  },
});

export const { setAvailable, addSelected, removeSelected } = metricsSlice.actions;

export default metricsSlice.reducer;
