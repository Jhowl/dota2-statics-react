import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Select } from 'antd';

import { selectAllHeroes, fetchHeroes } from "../redux/heroesSlice";

const HeroesSelect = ({ onHeroChange }) => {
  const dispatch = useDispatch();
  const { heroes, loading, error } = useSelector(selectAllHeroes);

  useEffect(() => {
      dispatch(fetchHeroes());
  }, [dispatch]);

  return (
    <div style={{ marginLeft: 60}}>
      <h1>Heroes</h1>
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
          onChange={onHeroChange}
          placeholder="Select a hero"
          options={heroes.map((hero) => ({ value: hero.id, label: hero.localized_name }))}
          >
        </Select>
      </div>

      {error && <p>{error}</p>}
    </div>
  );
}

export default HeroesSelect
