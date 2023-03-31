import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { teams } from './requests';

const initialState = {
  teams: [],
  loading: false,
  error: null
};

export const fetchTeams = createAsyncThunk('dota2/fetchTeams', async (filters) => {
  const response = await teams(filters);
  return response.data.rows;
});

const teamsSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeams.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTeams.fulfilled, (state, action) => {
        state.loading = false;
        state.teams = action.payload;
      })
      .addCase(fetchTeams.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const selectAllTeams = (state) => state.teams;

export default teamsSlice.reducer
