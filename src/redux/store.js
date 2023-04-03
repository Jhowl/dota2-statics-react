import { configureStore } from "@reduxjs/toolkit";
import leagguesReducer from './leaguesSlice';
import teamsReducer from '../features/teams/teamsSlice';
import matchesReducer from './matchesSlice';
import heroesReducer from './heroesSlice';

export const store = configureStore({
  reducer: {
    leagues: leagguesReducer,
    teams: teamsReducer,
    matches: matchesReducer,
    heroes: heroesReducer
  }
})
