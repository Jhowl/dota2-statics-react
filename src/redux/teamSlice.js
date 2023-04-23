import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { matchesByTeam } from '../requests/matchesByTeam';

const initialState = {
  team: {},
  loading: false,
  error: null
};

export const fetchMatches = createAsyncThunk('dota2/fetchMatches', async (teamId, filters) => {
  const response = await matchesByTeam(teamId, filters);
  return response.rows;
});

const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMatches.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMatches.fulfilled, (state, action) => {
        state.loading = false;
        state.team = action.payload;
      })
      .addCase(fetchMatches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const selectAllMatches = (state) => state.team;
export const selectMatchesLoading = (state) => state.team.loading;
export const selectMatchesError = (state) => state.team.error;

export default teamSlice.reducer
