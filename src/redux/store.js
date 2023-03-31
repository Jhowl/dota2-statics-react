import { configureStore } from "@reduxjs/toolkit";
import leagguesReducer from '../features/leagues/leaguesSlice';
import teamsReducer from '../features/teams/teamsSlice';
import matchesReducer from '../features/matches/matchesSlice';

export const store = configureStore({
  reducer: {
    leagues: leagguesReducer,
    teams: teamsReducer,
    matches: matchesReducer
  }
})
