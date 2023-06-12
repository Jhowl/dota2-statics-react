import React from 'react';
import { Select } from 'antd';

const PatchesSelect = ({ onPatchChange }) => {
  const patches = [
    { value: '7.32', label: '7.32' },
    { value: '7.33', label: '7.33' }
  ];

  return (
    <div style={{ width: '50%'}}>
      <h4>patches</h4>
      <div>
        <Select
          // mode='multiple'
          allowClear={true}
          showSearch
          filterOption={(inputValue, option) =>
            option.label.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
          }
          style={{ width: '50%' }}
          onChange={onPatchChange}
          placeholder="Select patch"
          options={patches}
          >
        </Select>
      </div>

    </div>
  );
}

export default PatchesSelect
