import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: { value: '' },
  reducers: {
    changeFilter(state, { payload }) {
      state.value = payload;
    },
  },
});
export const filterReducer = filterSlice.reducer;

export const { changeFilter } = filterSlice.actions;
