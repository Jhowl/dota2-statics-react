import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {  Spin, ConfigProvider, theme } from 'antd';

import { fetchMatches } from './redux/matchesSlice';
import { fetchTeams } from './features/teams/teamsSlice';
import { selectAllMatches } from './redux/matchesSlice';

import LeaguesSelect from './components/leagues';
import TeamsSelect from './components/teams';
import HeroesSelect from './components/heroes';
import MatchesTable from './components/matches';
import HeroesAverage from './components/heroesAverage';
import Statistics from './components/statistics';

const Home = () => {
  const dispatch = useDispatch();
  const [selectedLeagues, setSelectedLeagues] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState([]);
  const [selectedHeros, setSelectedHero] = useState([]);
  const { matches } = useSelector(selectAllMatches);

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
        <LeaguesSelect onLeagueChange={handleLeagueChange} />
        <TeamsSelect onTeamChange={handleTeamChange} />
        <HeroesSelect onHeroChange={handleHeroChange} />
      </div>
      <div className="MatchesTotal" style={{ textAlign: 'center', marginTop: '20px' }}>
        <span style={{ fontSize: '20px' }}>
          Total matches: {matches.length}
        </span>
      </div>
      <Statistics />
      <HeroesAverage />
      <MatchesTable />
    </div>
    <footer style={{ textAlign: 'center', marginTop: '20px' }}>
      <span style={{ fontSize: '12px' }}>
        Made with ❤️ by Jhowl
      </span>
    </footer>
    </ConfigProvider>
  )
};

export default Home;
