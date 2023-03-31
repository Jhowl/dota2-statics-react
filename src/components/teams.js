import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Select } from 'antd';

import { selectAllTeams, fetchTeams } from "../features/teams/teamsSlice";

const TeamsSelect = ({ onTeamChange }) => {
  const dispatch = useDispatch();
  const { teams, loading, error } = useSelector(selectAllTeams);

  useEffect(() => {
      dispatch(fetchTeams());
  }, [dispatch]);

  return (
    <div style={{ marginLeft: 60}}>
      <h2>Teams</h2>
      {loading && <p>Loading...</p>}
      <div>
        <Select
        style={{ width: '50%' }}
        mode='multiple'
        allowClear
        showSearch
        filterOption={(inputValue, option) =>
          option.label.toLowerCase().indexOf(inputValue?.toLowerCase()) !== -1
        }
        onChange={onTeamChange}
        placeholder="Select a team"
        options={teams.map((team) => ({ value: team.team_id, label: team.name }))}
        >
        </Select>

      </div>

      {error && <p>{error}</p>}
    </div>
  );
}
export default TeamsSelect
