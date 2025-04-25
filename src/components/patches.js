import React from 'react';
import { Select } from 'antd';

const PatchesSelect = ({ onPatchChange }) => {
  const patches = [
    { value: '7.32', label: '7.32', years: [2023] },
    { value: '7.33', label: '7.33', years: [2023] },
    { value: '7.34', label: '7.34', years: [2023] },
    { value: '7.35', label: '7.35', years: [2023, 2024]  },
    { value: '7.36', label: '7.36', years: [2023, 2024]  },
    { value: '7.37', label: '7.37', years: [2023, 2024, 2025] },
    { value: '7.38', label: '7.38', years: [2025] },
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
