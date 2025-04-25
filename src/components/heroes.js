import React from 'react';
import { Select } from 'antd';
// import { selectAllHeroes, fetchHeroes } from "../redux/heroesSlice";
import { heroes } from 'dotaconstants'

const HeroesSelect = ({ onHeroChange }) => {

  return (
    <div style={{ width: '50%'}}>
      <h4>Heroes</h4>

      <div>
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
          options={Object.values(heroes).map((hero) => ({ value: hero.id, label: hero.localized_name }))}
          >
        </Select>
      </div>

    </div>
  );
}

export default HeroesSelect
