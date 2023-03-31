import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Select } from 'antd';

import { selectAllLeagues, fetchLeagues } from "../features/leagues/leaguesSlice";

const LeaguesSelect = ({ onLeagueChange }) => {
  const dispatch = useDispatch();
  const { leagues, loading, error } = useSelector(selectAllLeagues);

  useEffect(() => {
      dispatch(fetchLeagues());
  }, [dispatch]);

  return (
    <div style={{ marginLeft: 60}}>
      <h1>Leagues</h1>
      {loading && <p>Loading...</p>}
      <div style={{ marginBottom: 16, marginTop: 16 }}>
        <Select
          mode='multiple'
          allowClear={true}
          showSearch
          filterOption={(inputValue, option) =>
            option.label.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
          }
          style={{ width: '50%' }}
          onChange={onLeagueChange}
          placeholder="Select a league"
          options={leagues.map((league) => ({ value: league.leagueid, label: league.name }))}
          >
        </Select>
      </div>

      {error && <p>{error}</p>}
    </div>
  );
}

export default LeaguesSelect
