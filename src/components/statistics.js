import { Card, Col, Row, Statistic, Typography, Collapse } from 'antd';

const { Title, Text } = Typography;
// const { Panel } = Collapse; // Panel will no longer be used directly

const Statistics = ({ statistics }) => {
  const convertSecondsToTime = (seconds) => {
    if (typeof seconds !== 'number' || isNaN(seconds)) {
      return 'N/A';
    }
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = (seconds % 60).toFixed(0); // Using toFixed(0) for whole seconds
    return `${minutes}m ${secondsLeft}s`;
  };

  const formatNumber = (num) => {
    if (typeof num !== 'number' || isNaN(num)) {
      return 'N/A';
    }
    return num.toFixed(2);
  };
  
  const formatPercentage = (num) => {
    if (typeof num !== 'number' || isNaN(num)) {
      return 'N/A';
    }
    return `${num.toFixed(2)}%`;
  }

  const renderConfidenceInterval = (ci) => {
    if (Array.isArray(ci) && ci.length === 2 && typeof ci[0] === 'number' && typeof ci[1] === 'number') {
      return `[${ci[0].toFixed(2)}, ${ci[1].toFixed(2)}]`;
    }
    return 'N/A';
  };

  const renderRegression = (reg) => {
    if (reg && typeof reg.slope === 'number' && typeof reg.intercept === 'number' && typeof reg.rSquared === 'number') {
      return `Slope: ${reg.slope.toFixed(2)}, Intercept: ${reg.intercept.toFixed(2)}, R²: ${reg.rSquared.toFixed(2)}`;
    }
    return 'N/A';
  }


  const advancedStatsItems = [
    {
      key: '1',
      label: 'Advanced Statistical Details (Duration)',
      children: (
        <Card title="Duration Confidence Interval & Regression">
          <Text strong>Confidence Interval: </Text>
          <Text>{renderConfidenceInterval(statistics?.duration?.confidenceInterval)}</Text>
          <br />
          <Text strong>Regression Analysis: </Text>
          <Text>{renderRegression(statistics?.duration?.regression)}</Text>
        </Card>
      ),
    },
    {
      key: '2',
      label: 'Advanced Statistical Details (Score)',
      children: (
        <Card title="Score Confidence Interval & Regression">
          <Text strong>Confidence Interval: </Text>
          <Text>{renderConfidenceInterval(statistics?.score?.confidenceInterval)}</Text>
          <br />
          <Text strong>Regression Analysis: </Text>
          <Text>{renderRegression(statistics?.score?.regression)}</Text>
        </Card>
      ),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="Match Duration Statistics">
            <Row gutter={[16, 16]}>
              <Col xs={12} sm={8}>
                <Statistic title="Min Duration" value={convertSecondsToTime(statistics?.duration?.min)} />
              </Col>
              <Col xs={12} sm={8}>
                <Statistic title="Max Duration" value={convertSecondsToTime(statistics?.duration?.max)} />
              </Col>
              <Col xs={12} sm={8}>
                <Statistic title="Avg Duration" value={convertSecondsToTime(statistics?.duration?.average)} />
              </Col>
              <Col xs={12} sm={8}>
                <Statistic title="Median Duration" value={convertSecondsToTime(statistics?.duration?.median)} />
              </Col>
              <Col xs={12} sm={8}>
                <Statistic title="Mode Duration" value={convertSecondsToTime(statistics?.duration?.mode)} />
              </Col>
              <Col xs={12} sm={8}>
                <Statistic title="Variance (seconds²)" value={formatNumber(statistics?.duration?.variance)} />
                 <Text type="secondary" style={{fontSize: '12px'}}>(Variance is in seconds squared)</Text>
              </Col>
            </Row>
            <Card title="Match Duration Distribution (Completed Before)" style={{ marginTop: '20px' }}>
              <Row gutter={[8, 8]}>
                <Col xs={12} sm={8} md={6}><Statistic title="< 30m" value={formatPercentage(statistics?.duration?.standardDeviationbyTime?.thirty)} /></Col>
                <Col xs={12} sm={8} md={6}><Statistic title="< 32m" value={formatPercentage(statistics?.duration?.standardDeviationbyTime?.thirtyTwo)} /></Col>
                <Col xs={12} sm={8} md={6}><Statistic title="< 34m" value={formatPercentage(statistics?.duration?.standardDeviationbyTime?.thirtyFour)} /></Col>
                <Col xs={12} sm={8} md={6}><Statistic title="< 36m" value={formatPercentage(statistics?.duration?.standardDeviationbyTime?.thirtySix)} /></Col>
                <Col xs={12} sm={8} md={6}><Statistic title="< 38m" value={formatPercentage(statistics?.duration?.standardDeviationbyTime?.thirtyEight)} /></Col>
                <Col xs={12} sm={8} md={6}><Statistic title="< 40m" value={formatPercentage(statistics?.duration?.standardDeviationbyTime?.forty)} /></Col>
                <Col xs={12} sm={8} md={6}><Statistic title="< 42m" value={formatPercentage(statistics?.duration?.standardDeviationbyTime?.fortyTwo)} /></Col>
                <Col xs={12} sm={8} md={6}><Statistic title="< 44m" value={formatPercentage(statistics?.duration?.standardDeviationbyTime?.fortyFour)} /></Col>
              </Row>
              <Text type="secondary" style={{ fontSize: '12px', display: 'block', marginTop: '10px' }}>
                Percentages indicate matches completed before the specified duration.
              </Text>
            </Card>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title="Match Score Statistics">
            <Row gutter={[16, 16]}>
              <Col xs={12} sm={8}>
                <Statistic title="Min Score" value={formatNumber(statistics?.score?.min)} />
              </Col>
              <Col xs={12} sm={8}>
                <Statistic title="Max Score" value={formatNumber(statistics?.score?.max)} />
              </Col>
              <Col xs={12} sm={8}>
                <Statistic title="Avg Score" value={formatNumber(statistics?.score?.average)} />
              </Col>
              <Col xs={12} sm={8}>
                <Statistic title="Median Score" value={formatNumber(statistics?.score?.median)} />
              </Col>
              <Col xs={12} sm={8}>
                <Statistic title="Mode Score" value={formatNumber(statistics?.score?.mode)} />
              </Col>
              <Col xs={12} sm={8}>
                <Statistic title="Variance" value={formatNumber(statistics?.score?.variance)} />
              </Col>
            </Row>
            <Card title="Score Distribution (Percentage of Matches with Score Less Than)" style={{ marginTop: '20px' }}>
              <Row gutter={[8, 8]}>
                <Col xs={8} sm={6} md={4}><Statistic title="<30.5" value={formatPercentage(statistics?.score?.standardDeviationbyScore?.thirty)} /></Col>
                <Col xs={8} sm={6} md={4}><Statistic title="<32.5" value={formatPercentage(statistics?.score?.standardDeviationbyScore?.thirtyTwo)} /></Col>
                <Col xs={8} sm={6} md={4}><Statistic title="<34.5" value={formatPercentage(statistics?.score?.standardDeviationbyScore?.thirtyFour)} /></Col>
                <Col xs={8} sm={6} md={4}><Statistic title="<36.5" value={formatPercentage(statistics?.score?.standardDeviationbyScore?.thirtySix)} /></Col>
                <Col xs={8} sm={6} md={4}><Statistic title="<38.5" value={formatPercentage(statistics?.score?.standardDeviationbyScore?.thirtyEight)} /></Col>
                <Col xs={8} sm={6} md={4}><Statistic title="<40.5" value={formatPercentage(statistics?.score?.standardDeviationbyScore?.forty)} /></Col>
                <Col xs={8} sm={6} md={4}><Statistic title="<42.5" value={formatPercentage(statistics?.score?.standardDeviationbyScore?.fortyTwo)} /></Col>
                <Col xs={8} sm={6} md={4}><Statistic title="<44.5" value={formatPercentage(statistics?.score?.standardDeviationbyScore?.fortyFour)} /></Col>
                <Col xs={8} sm={6} md={4}><Statistic title="<46.5" value={formatPercentage(statistics?.score?.standardDeviationbyScore?.fortySix)} /></Col>
                <Col xs={8} sm={6} md={4}><Statistic title="<48.5" value={formatPercentage(statistics?.score?.standardDeviationbyScore?.fortyEight)} /></Col>
                <Col xs={8} sm={6} md={4}><Statistic title="<50.5" value={formatPercentage(statistics?.score?.standardDeviationbyScore?.fifty)} /></Col>
                <Col xs={8} sm={6} md={4}><Statistic title="<52.5" value={formatPercentage(statistics?.score?.standardDeviationbyScore?.fiftyTwo)} /></Col>
                <Col xs={8} sm={6} md={4}><Statistic title="<54.5" value={formatPercentage(statistics?.score?.standardDeviationbyScore?.fiftyFour)} /></Col>
                <Col xs={8} sm={6} md={4}><Statistic title="<56.5" value={formatPercentage(statistics?.score?.standardDeviationbyScore?.fiftySix)} /></Col>
                <Col xs={8} sm={6} md={4}><Statistic title="<58.5" value={formatPercentage(statistics?.score?.standardDeviationbyScore?.fiftyEight)} /></Col>
                <Col xs={8} sm={6} md={4}><Statistic title="<60.5" value={formatPercentage(statistics?.score?.standardDeviationbyScore?.sixty)} /></Col>
                <Col xs={8} sm={6} md={4}><Statistic title="<62.5" value={formatPercentage(statistics?.score?.standardDeviationbyScore?.sixtyTwo)} /></Col>
                <Col xs={8} sm={6} md={4}><Statistic title="<64.5" value={formatPercentage(statistics?.score?.standardDeviationbyScore?.sixtyFour)} /></Col>
                <Col xs={8} sm={6} md={4}><Statistic title="<66.5" value={formatPercentage(statistics?.score?.standardDeviationbyScore?.sixtySix)} /></Col>
                <Col xs={8} sm={6} md={4}><Statistic title="<68.5" value={formatPercentage(statistics?.score?.standardDeviationbyScore?.sixtyEight)} /></Col>
                <Col xs={8} sm={6} md={4}><Statistic title="<70.5" value={formatPercentage(statistics?.score?.standardDeviationbyScore?.seventy)} /></Col>
              </Row>
               <Text type="secondary" style={{ fontSize: '12px', display: 'block', marginTop: '10px' }}>
                Percentages indicate matches with a total score less than the specified value.
              </Text>
            </Card>
          </Card>
        </Col>
      </Row>
      <Collapse items={advancedStatsItems} style={{ marginTop: '20px' }} />
    </div>
  );
};

export default Statistics;
