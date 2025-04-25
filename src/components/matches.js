import React from 'react';
import { Table, Tag } from 'antd';

const MatchesTable = ({ matches, loading, error }) => {

  const columns = [
    {
      title: 'Match ID',
      dataIndex: 'key',
      key: 'key',
      render: (key) => (
        <><span> {key}</span><a href={"https://www.dotabuff.com/matches/" + key} target="_blank" rel="noopener noreferrer">
          <img src="dotabuff.png" alt="dotabuff" width="15" height="15">
          </img>
        </a></>
      )
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
      render: (duration) => {
        const minutes = Math.floor(duration / 60);
        const seconds = duration % 60;
        return `${minutes}m ${seconds}s`;
      },
    },
    {
      title: 'Start Time',
      dataIndex: 'start_time',
      key: 'start_time',
      render: (start_time) => new Date(start_time * 1000).toLocaleString(),
    },
    {
      title: 'Dire Score',
      dataIndex: 'dire_score',
      key: 'dire_score',
    },
    {
      title: 'Radiant Score',
      dataIndex: 'radiant_score',
      key: 'radiant_score',
    },
    {
      title: 'Winner',
      dataIndex: 'team_win',
      key: 'team_win',
      render: (team_win) => (
        <span>
          <Tag color='green'>
            {team_win}
          </Tag>
        </span>
      ),
    },
    {
      title: 'Radiant Name',
      dataIndex: 'radiant_name',
      key: 'radiant_name',
    },
    {
      title: 'Dire Name',
      dataIndex: 'dire_name',
      key: 'dire_name',
    },
    {
      title: 'League Name',
      dataIndex: 'league_name',
      key: 'league_name',
    },
  ];

  return (
    <div className='matches-table' style={{ borderRadius: '5px', paddingLeft: '30px', paddingRight: '30px' }}>
      <h4>Matches</h4>
      {loading && <p>Loading...</p>}

      <Table
        loading={loading}
        dataSource={matches}
        columns={columns}
        pagination={false}
        scroll={{ y: 600 }}
        size="small"
        bordered/>
      {error && <p>{error}</p>}
    </div>
  );
}
export default MatchesTable;
