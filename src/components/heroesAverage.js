import React from 'react';

import { Table } from 'antd';

const HeroesTable = ({ heroesAverage, loading, error }) => {

  const columns = [
    {
      title: 'Hero Name',
      dataIndex: 'heroName',
      key: 'heroId',
      sorter: (a, b) => a.heroName.localeCompare(b.heroName),
      ellipsis: true,
    },
    {
      title: 'Matches',
      dataIndex: 'heroMatches',
      key: 'heroMatches',
      sorter: (a, b) => a.heroMatches - b.heroMatches,
    },
    {
      title: 'Score Average',
      dataIndex: 'averageScore',
      key: 'averageScore',
      sorter: (a, b) => a.averageScore - b.averageScore,
    }
  ];

  const data = heroesAverage?.map((hero) => ({
    averageScore: (hero.matchesScore / hero.heroMatches).toFixed(3),
    ...hero,
  }));

  return (
    <div className='heroes-table' style={{ borderRadius: '5px', paddingLeft: '30px', paddingRight: '30px' }}>
      <h4>Heroes K+D Average</h4>
      {loading && <p>Loading...</p>}

      <Table
        loading={loading}
        dataSource={data}
        columns={columns}
        pagination={false}
        size="small"
        scroll={{ y: 240 }}
        bordered/>
      {error && <p>{error}</p>}
    </div>
  );
}
export default HeroesTable;
