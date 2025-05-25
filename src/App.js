import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Layout, Row, Col, Space, Typography, Card, Spin, ConfigProvider, theme } from 'antd';

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
import StandartDeviationDuration from './components/standartDeviationDuration';

const { Content, Footer } = Layout;
const { Title, Text } = Typography;

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
      <Layout>
        <Content style={{ padding: '20px' }}>
          <Title level={2} style={{ textAlign: 'center', marginBottom: '20px' }}>Dota 2 Match Statistics</Title>

          <Card title="Filters" style={{ marginBottom: '20px' }}>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} md={6}>
                <PatchesSelect onPatchChange={handlePatchChange} />
              </Col>
              <Col xs={24} sm={12} md={6}>
                <LeaguesSelect onLeagueChange={handleLeagueChange} />
              </Col>
              <Col xs={24} sm={12} md={6}>
                <TeamsSelect onTeamChange={handleTeamChange} />
              </Col>
              <Col xs={24} sm={12} md={6}>
                <HeroesSelect onHeroChange={handleHeroChange} />
              </Col>
            </Row>
          </Card>

          <Row justify="center" style={{ marginBottom: '20px' }}>
            <Col>
              <Text style={{ fontSize: '20px' }}>Total matches: {matches.total}</Text>
            </Col>
          </Row>

          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <Statistics statistics={matches.statistics} />
            <StandartDeviationDuration standardDeviation={matches.standardDeviationHeroesDuration} />
            <StandartDeviationScore title='KD' standardDeviation={matches.standardDeviationHeroes} />
            <HeroesAverage heroesAverage={matches.heroesAverage} loading={loading} error={error} />
            <MatchesTable matches={matches.table} loading={loading} error={error} />
          </Space>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Made with ❤️ by Jhowl
        </Footer>
      </Layout>
    </ConfigProvider>
  )
};

export default App;
