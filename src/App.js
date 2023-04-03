import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Space, Spin, ConfigProvider, theme } from 'antd';


import LeaguesSelect from './components/leagues';
import TeamsSelect from './components/teams';
import HeroesSelect from './components/heroes';
import MatchesTable from './components/matches';
import Statistics from './components/statistics';

import { fetchMatches } from './redux/matchesSlice';
import { fetchTeams } from './features/teams/teamsSlice';

const App = () => {
  const dispatch = useDispatch();
  const [selectedLeagues, setSelectedLeagues] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState([]);
  const [selectedHeros, setSelectedHero] = useState([]);

  useEffect(() => {
    if (selectedLeagues.length || selectedTeam.length || selectedHeros.length) {
      dispatch(fetchMatches({leaguesIds: selectedLeagues, teamsIds: selectedTeam, heroesIds: selectedHeros}));
    }
  }, [dispatch, selectedLeagues, selectedTeam, selectedHeros]);

  const handleLeagueChange = (value) => {
    setSelectedLeagues(value);
    dispatch(fetchTeams({leaguesIds: value}));
  };

  const handleTeamChange = (value) => {
    setSelectedTeam(value);
    // dispatch(fetchMatches({leaguesIds: selectedLeagues, teamsIds: value, heroesIds: selectedHeros}));
  };

  const handleHeroChange = (value) => {
    setSelectedHero(value);
    console.log(value);
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
      algorithm: theme.darkAlgorithm,
    }}
  >
    <div className="Statistics">
       <Space
        style={{
          width: '100%',
        }}
        direction="vertical"
        >
          <LeaguesSelect onLeagueChange={handleLeagueChange} />
          <TeamsSelect onTeamChange={handleTeamChange} />
          <HeroesSelect onHeroChange={handleHeroChange} />
      </Space>
      <Statistics />
      <MatchesTable />
    </div>
    </ConfigProvider>
  )
};

export default App;
