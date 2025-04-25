import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {  Spin, ConfigProvider, theme } from 'antd';

import { fetchMatches } from './redux/matchesSlice';
// import { fetchTeams } from './redux/teamsSlice';
import { selectAllMatches } from './redux/matchesSlice';

import PatchesSelect from './components/patches';
import LeaguesSelect from './components/leagues';
import TeamsSelect from './components/teams';
import HeroesSelect from './components/heroes';
import MatchesTable from './components/matches';
import HeroesAverage from './components/heroesAverage';
import Statistics from './components/statistics';
import StandartDeviationScore from './components/standartDeviationScore';
import StandartDeviationDuration from './components/standartDeviationDuration'

const App = () => {
  const dispatch = useDispatch();
  const [selectedLeagues, setSelectedLeagues] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState([]);
  const [selectedHeros, setSelectedHero] = useState([]);
  const [selectedPatch, setSelectedPatch] = useState([]);

  const { matches, loading, error } = useSelector(selectAllMatches);

  useEffect(() => {
    if (selectedLeagues.length || selectedTeam.length || selectedHeros.length || selectedPatch) {
      dispatch(fetchMatches({leaguesIds: selectedLeagues, teamsIds: selectedTeam, heroesIds: selectedHeros, patch: selectedPatch}));
    } else {
      dispatch(fetchMatches());
    }
  }, [dispatch, selectedLeagues, selectedTeam, selectedHeros, selectedPatch]);

  const handleLeagueChange = (value) => {
    setSelectedLeagues(value);
    // dispatch(fetchTeams({leaguesIds: value}));
  };

  const handleTeamChange = (value) => {
    setSelectedTeam(value);
  };

  const handleHeroChange = (value) => {
    setSelectedHero(value);
  };

  const handlePatchChange = (value) => {
    setSelectedPatch(value);
  };

  const { isLoading } = useSelector((state) => state.matches);

  if (isLoading) {
    return (
      <div className="Statistics">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <ConfigProvider
    theme={{
      algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],

    }}
  >
    <div className="Statistics">
      <div className="Filter" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        }}>
        <PatchesSelect onPatchChange={handlePatchChange} />
        <LeaguesSelect onLeagueChange={handleLeagueChange} />
        <TeamsSelect onTeamChange={handleTeamChange} />
        <HeroesSelect onHeroChange={handleHeroChange} />
      </div>
      <div className="MatchesTotal" style={{ textAlign: 'center', marginTop: '20px' }}>
        <span style={{ fontSize: '20px' }}>
          Total matches: {matches.total}
        </span>
      </div>
      <Statistics statistics={matches.statistics} />
      <StandartDeviationDuration standardDeviation={matches.standardDeviationHeroesDuration} />
      <StandartDeviationScore title='KD' standardDeviation={matches.standardDeviationHeroes} />
      <HeroesAverage heroesAverage={matches.heroesAverage} loading={loading} error={error} />
      <MatchesTable matches={matches.table} loading={loading} error={error} />
    </div>
    <footer style={{ textAlign: 'center', marginTop: '20px' }}>
      <span style={{ fontSize: '12px' }}>
        Made with ❤️ by Jhowl
      </span>
    </footer>
    </ConfigProvider>
  )
};

export default App;
