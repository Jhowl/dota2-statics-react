import React, { useEffect, useState } from 'react';
import { List, Spin, Input, Image } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTeamsApi, selectAllTeamsApi } from '../redux/teamsApiSlice';

const { Search } = Input;

const TeamsListPage = () => {
  const dispatch = useDispatch();
  const { teamsApi, loading } = useSelector(selectAllTeamsApi);

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchTeamsApi());
  }, [dispatch]);

  const filteredTeams = teamsApi.filter(
    (team) =>
      team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.tag.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <div>
      <h1>Teams List</h1>
      <Search
        placeholder="Filter teams"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: 20 }}
      />

      {loading === 'loading' && <Spin />}
      {loading === 'success' && (
        <List
          grid={{ gutter: 16, column: 6 }}
          // itemLayout="horizontal"
          dataSource={filteredTeams}
          renderItem={(team) => (
            <List.Item
              key={team.team_id}
            >
              <a href={`https://www.opendota.com/teams/${team.team_id}`}>
                <Image
                  src={team.logo_url}
                  alt={team.name}
                  width={100}
                  height={100}
                  style={{ objectFit: 'cover' }}
                  preview={false}
                />
              </a>
              <List.Item.Meta
                title={<a href={`https://www.opendota.com/teams/${team.team_id}`}>{team.name}</a>}
                description={`Wins: ${team.wins}, Losses: ${team.losses}`}
              />

            </List.Item>
          )}
        />
      )}
      {loading === 'failed' && <div>Failed to load teams.</div>}
    </div>
  );
};

export default TeamsListPage;
