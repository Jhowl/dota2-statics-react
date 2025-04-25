import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { matches } from '../requests/matches';

const initialState = {
  matches: [],
  loading: false,
  error: null
};

export const fetchMatches = createAsyncThunk('dota2/fetchMatches', async (filters) => {
  const response = await matches(filters);
  return response?.data;
});

const matchesSlice = createSlice({
  name: 'matches',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMatches.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMatches.fulfilled, (state, action) => {
        state.loading = false;
        state.matches = action.payload;
      })
      .addCase(fetchMatches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const selectAllMatches = (state) => state.matches;
export const selectMatchesLoading = (state) => state.matches.loading;
export const selectMatchesError = (state) => state.matches.error;

export default matchesSlice.reducer
