import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { selectAllMatches } from '../redux/matchesSlice';

import heroesStatistics from '../utils/heroesStatistics'

import { Table } from 'antd';

const HeroesTable = () => {
  const { matches, loading, error } = useSelector(selectAllMatches);
  const [heroesData, setHeroesData] = useState([]);


  useEffect(() => {
    if (!matches.length) {
      return;
    }

    const heroesData = heroesStatistics(matches.map(match => ({
      score: match.radiant_score + match.dire_score,
      heroes: match.players.map(player => player.hero_id)
    })))

    setHeroesData(heroesData);
  }, [matches]);

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

  const data = heroesData.map((hero) => ({
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
