import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getHeroes } from '../requests/heroesRequests';

const initialState = {
  heroes: [],
  loading: false,
  error: null
};

export const fetchHeroes = createAsyncThunk('dota2/fetchHeroes', async () => {
  const response = await getHeroes();
  return response
});

const heroesSlice = createSlice({
  name: 'heroes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeroes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHeroes.fulfilled, (state, action) => {
        state.loading = false;
        state.heroes = action.payload;
      })
      .addCase(fetchHeroes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const selectAllHeroes = (state) => state.heroes;

export default heroesSlice.reducer
