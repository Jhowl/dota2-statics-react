import React from 'react';
import { Table, Typography, Tag, Spin, Alert, Card, Empty } from 'antd';

const { Text } = Typography;

// Helper function for time conversion
const convertSecondsToMinutesSeconds = (totalSeconds) => {
  if (isNaN(totalSeconds) || totalSeconds === null || typeof totalSeconds === 'undefined') return 'N/A';
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(1, '0')}m ${String(seconds).padStart(2, '0')}s`; // Pad seconds to ensure two digits
};

const MatchesTable = ({ matches, loading, error }) => {
  if (loading) {
    return (
      <Card title="Recent Matches" style={{ marginTop: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <Spin size="large" />
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card title="Recent Matches" style={{ marginTop: '20px' }}>
        <Alert
          message="Error loading matches"
          description={typeof error === 'string' ? error : JSON.stringify(error)}
          type="error"
          showIcon
        />
      </Card>
    );
  }

  if (!matches || matches.length === 0) {
    return (
      <Card title="Recent Matches" style={{ marginTop: '20px' }}>
        <Empty description="No match data available." />
      </Card>
    );
  }

  const columns = [
    {
      title: 'League',
      dataIndex: 'league_name',
      key: 'league_name',
      sorter: (a, b) => (a.league_name || '').localeCompare(b.league_name || ''),
      render: (text) => text || 'N/A',
      ellipsis: true,
    },
    {
      title: 'Winning Team',
      dataIndex: 'team_win',
      key: 'team_win',
      sorter: (a, b) => (a.team_win || '').localeCompare(b.team_win || ''),
      render: (text, record) => {
        if (text) {
          let color = 'default';
          if (text === record.radiant_name) color = 'green';
          if (text === record.dire_name) color = 'red'; // Assuming dire might be red, adjust as needed
          return <Tag color={color}>{text}</Tag>;
        }
        return 'N/A'; // Or "Draw" if that's a possibility
      },
      align: 'center',
    },
    {
      title: 'Radiant',
      dataIndex: 'radiant_name',
      key: 'radiant_name',
      // No direct sorter as it's combined data; could sort by name or score if needed
      render: (text, record) => (
        <Text strong={record.team_win === record.radiant_name}>
          {text || 'N/A'} ({record.radiant_score})
        </Text>
      ),
    },
    {
      title: 'Dire',
      dataIndex: 'dire_name',
      key: 'dire_name',
      // No direct sorter as it's combined data
      render: (text, record) => (
        <Text strong={record.team_win === record.dire_name}>
          {text || 'N/A'} ({record.dire_score})
        </Text>
      ),
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
      sorter: (a, b) => a.duration - b.duration,
      render: (seconds) => convertSecondsToMinutesSeconds(seconds),
      defaultSortOrder: 'descend',
      align: 'right',
    },
    {
      title: 'Start Time',
      dataIndex: 'start_time',
      key: 'start_time',
      sorter: (a, b) => a.start_time - b.start_time,
      render: (timestamp) => new Date(timestamp * 1000).toLocaleString([], { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      align: 'right',
    },
     {
      title: 'Match ID',
      dataIndex: 'key',
      key: 'match_id_link', // Changed key to avoid conflict if 'key' is used as rowKey literally
      render: (matchId) => (
        <a href={`https://www.dotabuff.com/matches/${matchId}`} target="_blank" rel="noopener noreferrer">
          {matchId}
        </a>
      ),
      align: 'center',
    },
  ];

  // Data source is directly the matches prop, assuming 'key' field is present for rowKey
  return (
    <Card title="Recent Matches" style={{ marginTop: '20px' }}>
      <Table
        columns={columns}
        dataSource={matches}
        rowKey="key"
        bordered
        pagination={{ pageSize: 15, showSizeChanger: true, pageSizeOptions: ['15', '30', '50', '100'] }}
        size="small"
        scroll={{ x: 'max-content' }}
      />
    </Card>
  );
};

export default MatchesTable;
