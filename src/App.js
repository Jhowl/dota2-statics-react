import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Space, Spin, Statistic } from 'antd';

import LeaguesSelect from './components/leagues';
import TeamsSelect from './components/teams';
import MatchesTable from './components/matches';
import Statistics from './components/statistics';

import { fetchMatches } from './features/matches/matchesSlice';
import { fetchTeams } from './features/teams/teamsSlice';

const App = () => {
  const dispatch = useDispatch();
  const [selectedLeagues, setSelectedLeagues] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState([]);

  useEffect(() => {
    if (selectedLeagues.length || selectedTeam.length) {
      dispatch(fetchMatches({leaguesIds: selectedLeagues, teamsIds: selectedTeam }));
    }
  }, [dispatch, selectedLeagues, selectedTeam]);

  const handleLeagueChange = (value) => {
    setSelectedLeagues(value);
    dispatch(fetchTeams({leaguesIds: value}));
  };

  const handleTeamChange = (value) => {
    setSelectedTeam(value);
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
    <div className="Statistics">
       <Space
        style={{
          width: '100%',
        }}
        direction="vertical"
        >
          <LeaguesSelect onLeagueChange={handleLeagueChange} />
          <TeamsSelect onTeamChange={handleTeamChange} />
      </Space>
      <Statistics />
      <MatchesTable />
    </div>
  )
};

export default App;
