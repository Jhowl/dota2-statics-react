import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { leagues } from '../requests/leaguesRequests';

const initialState = {
  leagues: [],
  loading: false,
  error: null
};

export const fetchLeagues = createAsyncThunk('dota2/fetchLeagues', async () => {
  const response = await leagues();
  return response.data.rows;
});

const leaguesSlice = createSlice({
  name: 'leagues',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeagues.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLeagues.fulfilled, (state, action) => {
        state.loading = false;
        state.leagues = action.payload;
      })
      .addCase(fetchLeagues.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const selectAllLeagues = (state) => state.leagues;

export default leaguesSlice.reducer
