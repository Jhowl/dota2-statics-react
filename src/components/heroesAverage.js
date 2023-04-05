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
      // sortOrder
    },
    {
      title: 'Score Average',
      dataIndex: 'averageScore',
      key: 'averageScore',
    }
  ];

    //average score
    // for (const hero of heroesGroup) {
    //   hero.averageScore = hero.matchesScore / hero.heroMatches
    // }

  const data = heroesData.map((hero) => ({
    averageScore: (hero.matchesScore / hero.heroMatches).toFixed(3),
    ...hero,
  }));

  return (
    <div>
      <h4>Matches</h4>
      {loading && <p>Loading...</p>}

      <Table
        loading={loading}
        dataSource={data}
        columns={columns}
        pagination={false}
        bordered/>
      {error && <p>{error}</p>}
    </div>
  );
}
export default HeroesTable;
