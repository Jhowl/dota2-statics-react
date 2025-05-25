import React, { useState, useRef } from 'react';
import { Table, Typography, Card, Empty, Input, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

// const { Text } = Typography; // Not strictly needed if render just returns text

const StandartDeviationScore = ({ title, standardDeviation }) => {
  const searchInput = useRef(null);

  // Simplified handleSearch and handleReset as component-level state for searchText/searchedColumn is not strictly required by the provided snippet
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
  };

  const handleReset = (clearFilters) => {
    if (clearFilters) {
      clearFilters();
    }
  };

  const getColumnSearchProps = (dataIndex, columnTitle, searchInputRef) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInputRef}
          placeholder={`Search ${columnTitle}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />, // AntD 5 primary color
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInputRef.current?.select(), 100);
      }
    },
  });

  if (
    !standardDeviation ||
    !standardDeviation.thresholds ||
    !Array.isArray(standardDeviation.thresholds) ||
    !standardDeviation.heroesDeviation ||
    !Array.isArray(standardDeviation.heroesDeviation) ||
    standardDeviation.heroesDeviation.length === 0
  ) {
    return (
      <Card title={`Hero ${title || 'Score'} Deviation Analysis`} style={{ marginTop: '20px' }}>
        <Empty description={`No ${title || 'score'} deviation data available for the current selection.`} />
      </Card>
    );
  }

  const { thresholds, heroesDeviation } = standardDeviation;

  const columns = [
    {
      title: 'Hero',
      dataIndex: 'heroName',
      key: 'heroName', // Using heroName as key for the column itself
      fixed: 'left',
      sorter: (a, b) => a.heroName.localeCompare(b.heroName),
      width: 180, // Adjusted width for hero names
      ellipsis: true,
      ...getColumnSearchProps('heroName', 'Hero', searchInput),
    },
    ...thresholds.map(threshold => {
      const thresholdStr = String(threshold); // Ensure threshold is a string for dataIndex
      return {
        title: `More than ${thresholdStr} ${title || 'Score'}`,
        dataIndex: thresholdStr,
        key: thresholdStr,
        sorter: (a, b) => {
          const valA = parseFloat(a[thresholdStr]?.replace('%', '')) || 0;
          const valB = parseFloat(b[thresholdStr]?.replace('%', '')) || 0;
          return valA - valB;
        },
        render: (text) => text || 'N/A',
        width: 150, // Give a default width to threshold columns
        align: 'right',
      };
    }),
  ];

  const dataSource = heroesDeviation.map(hero => ({
    ...hero,
    key: hero.heroId || hero.heroName, // Ensure unique row key
  }));

  return (
    <Card title={`Hero ${title || 'Score'} Deviation Analysis`} style={{ marginTop: '20px' }}>
      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey="key"
        bordered
        size="small"
        scroll={{ x: 'max-content', y: 400 }}
        pagination={{ pageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '50'] }}
      />
    </Card>
  );
};

export default StandartDeviationScore;
