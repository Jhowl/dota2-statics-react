import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Select } from 'antd';

import { selectAllLeagues, fetchLeagues } from "../redux/leaguesSlice";

const LeaguesSelect = ({ onLeagueChange }) => {
  const dispatch = useDispatch();
  const { leagues, loading, error } = useSelector(selectAllLeagues);

  useEffect(() => {
      dispatch(fetchLeagues());
  }, [dispatch]);

  return (
    <div style={{ marginLeft: 60, width: '50%'}}>
      <h4>Leagues</h4>
      {loading && <p>Loading...</p>}
      <div>
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
