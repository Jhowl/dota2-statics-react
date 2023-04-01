import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { selectAllMatches, fetchMatches } from "../features/matches/matchesSlice";
import { Table, Tag } from 'antd';

const MatchesTable = () => {
  const dispatch = useDispatch();
  const { matches, loading, error } = useSelector(selectAllMatches);

  useEffect(() => {
      dispatch(fetchMatches());
  }, [dispatch]);

  const columns = [
    {
      title: 'Match ID',
      dataIndex: 'match_id',
      key: 'match_id',
      render: (match_id) => (
        <><span> {match_id}</span><a href={"https://www.dotabuff.com/matches/" + match_id} target="_blank" rel="noopener noreferrer">
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
      dataIndex: 'radiant_win',
      key: 'radiant_win',
      render: (radiant_win) => (
        <span>
          <Tag color={radiant_win ? 'green' : 'red'}>
            {radiant_win ? 'Radiant' : 'Dire'}
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

  const data = matches.map((match) => ({ ...match, key: match.match_id }));

  return (
    <div>
      <h1>Matches</h1>
      {loading && <p>Loading...</p>}

      <span>
        Total matches: {data.length}
      </span>
      <Table
      // style={{ backgroundColor: 'orange' }}
      loading={loading} dataSource={data} columns={columns} bordered/>
      {error && <p>{error}</p>}
    </div>
  );
}
export default MatchesTable;
