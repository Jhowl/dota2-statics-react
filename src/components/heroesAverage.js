import React, { useState, useRef } from 'react';
import { Table, Typography, Spin, Alert, Card, Input, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Text } = Typography;

const HeroesAverage = ({ heroesAverage, loading, error }) => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
    // Also reset searchedColumn if you want the highlight to go away
    // setSearchedColumn(''); 
  };

  const getColumnSearchProps = (dataIndex, columnTitle) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${columnTitle}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
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
            onClick={() => clearFilters && handleReset(clearFilters)}
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
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
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
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    // Not using render for highlighting in this case, but could be added if needed
  });


  if (loading) {
    return (
      <Card title="Hero Performance Statistics" style={{ marginTop: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <Spin size="large" />
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card title="Hero Performance Statistics" style={{ marginTop: '20px' }}>
        <Alert
          message="Error loading hero statistics"
          description={typeof error === 'string' ? error : JSON.stringify(error)}
          type="error"
          showIcon
        />
      </Card>
    );
  }

  if (!heroesAverage || heroesAverage.length === 0) {
    return (
      <Card title="Hero Performance Statistics" style={{ marginTop: '20px' }}>
        <Text>No hero data available for the current selection.</Text>
      </Card>
    );
  }

  const columns = [
    {
      title: 'Hero',
      dataIndex: 'heroName',
      key: 'heroName',
      sorter: (a, b) => a.heroName.localeCompare(b.heroName),
      ellipsis: true,
      ...getColumnSearchProps('heroName', 'Hero'),
    },
    {
      title: 'Matches Played',
      dataIndex: 'heroMatches',
      key: 'heroMatches',
      sorter: (a, b) => a.heroMatches - b.heroMatches,
      defaultSortOrder: 'descend',
    },
    {
      title: 'Total Score',
      dataIndex: 'matchesScore',
      key: 'matchesScore',
      sorter: (a, b) => a.matchesScore - b.matchesScore,
    },
    {
      title: 'Avg Score/Match',
      key: 'avgScorePerMatch',
      sorter: (a, b) => (a.matchesScore / a.heroMatches) - (b.matchesScore / b.heroMatches),
      render: (_, record) => {
        const avgScore = record.heroMatches > 0 ? (record.matchesScore / record.heroMatches).toFixed(2) : 0;
        return <Text>{avgScore}</Text>;
      },
    },
  ];

  // Ensure unique key for each record in dataSource
  const dataSource = heroesAverage.map((hero, index) => ({
    ...hero,
    key: hero.heroId || hero.heroName || index, // Use heroId, fallback to heroName, then index
  }));

  return (
    <Card title="Hero Performance Statistics" style={{ marginTop: '20px' }}>
      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey="key"
        bordered
        loading={loading} // Table has its own loading state, but Spin above handles initial load
        pagination={{ pageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '50'] }} // Added pagination
        size="small" // Retained size from original
        scroll={{ y: 400 }} // Adjusted scroll height slightly
      />
    </Card>
  );
};

export default HeroesAverage;
