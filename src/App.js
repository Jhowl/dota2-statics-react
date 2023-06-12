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

import filter from './utils/filter';

const App = () => {
  const dispatch = useDispatch();
  const [selectedLeagues, setSelectedLeagues] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState([]);
  const [selectedHeros, setSelectedHero] = useState([]);
  const [selectedPatch, setSelectedPatch] = useState([]);

  const { matches, loading, error } = useSelector(selectAllMatches);


  useEffect(() => {
      dispatch(fetchMatches());
  }, [dispatch]);

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

  const filteredMatches = filter(matches, {
    leagueIds: selectedLeagues,
    teamIds: selectedTeam,
    heroIds: selectedHeros,
    patches: selectedPatch,
  })

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
          Total matches: {filteredMatches.length}
        </span>
      </div>
      <Statistics matches={filteredMatches} />
      <HeroesAverage matches={filteredMatches} loading={loading} error={error} />
      <MatchesTable matches={filteredMatches} loading={loading} error={error} />
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
