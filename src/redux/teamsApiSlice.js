import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getTeams } from '../requests/teamsApi';

const initialState = {
  teamsApi: [],
  loading: false,
  error: null
};

export const fetchTeamsApi = createAsyncThunk('dota2/fetchTeamsApi', async () => {
  const response = await getTeams();
  return response
});

const teamsApiSlice = createSlice({
  name: 'teamsApi',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeamsApi.pending, (state) => {
        state.loading = 'loading'
      })
      .addCase(fetchTeamsApi.fulfilled, (state, action) => {
        state.loading = 'success';
        state.teamsApi = action.payload;
      })
      .addCase(fetchTeamsApi.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectAllTeamsApi = (state) => state.teamsApi;

export default teamsApiSlice.reducer
