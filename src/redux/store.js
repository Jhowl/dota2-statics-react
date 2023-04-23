import { configureStore } from "@reduxjs/toolkit";
import leagguesReducer from './leaguesSlice';
import teamsReducer from './teamsSlice';
import matchesReducer from './matchesSlice';
import heroesReducer from './heroesSlice';
import teamsApiReducer from './teamsApiSlice';
import teamReducer from './teamSlice';

export const store = configureStore({
  reducer: {
    leagues: leagguesReducer,
    teams: teamsReducer,
    matches: matchesReducer,
    heroes: heroesReducer,
    teamsApi: teamsApiReducer,
    team: teamReducer
  }
})
