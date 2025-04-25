import { Card, Col, Row } from 'antd';

const Statistics = ({ statistics }) => {
  const convertSecondsToTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = (seconds % 60).toFixed(3);
    return `${minutes}m ${secondsLeft}s`;
  };

  return (
    <div style={{ padding: '20px' }}>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card title="Duration Statistics?">
            <ul>
              <li>Min: {convertSecondsToTime(statistics?.duration?.min)}</li>
              <li>Max: {convertSecondsToTime(statistics?.duration?.max)}</li>
              <li>Average: {convertSecondsToTime(statistics?.duration?.average)}</li>
              <li>Median: {convertSecondsToTime(statistics?.duration?.median)}</li>
              <li>Mode: {convertSecondsToTime(statistics?.duration?.mode)}</li>
              <li>Variance: {convertSecondsToTime(statistics?.duration?.variance)}</li>
              <li>Confidence Interval: {statistics?.duration?.confidenceInterval}</li>
              <li>Regression: {statistics?.duration?.regression}</li>
              <li>
                standardDeviation:
                <ul>
                  <li> 30m :{statistics?.duration?.standardDeviationbyTime?.thirty} %</li>
                  <li> 32m: {statistics?.duration?.standardDeviationbyTime?.thirtyTwo} %</li>
                  <li> 34m: {statistics?.duration?.standardDeviationbyTime?.thirtyFour} %</li>
                  <li> 36m: {statistics?.duration?.standardDeviationbyTime?.thirtySix} %</li>
                  <li> 38m: {statistics?.duration?.standardDeviationbyTime?.thirtyEight} %</li>
                  <li> 40m: {statistics?.duration?.standardDeviationbyTime?.forty} %</li>
                  <li> 42m: {statistics?.duration?.standardDeviationbyTime?.fortyTwo} %</li>
                  <li> 44m: {statistics?.duration?.standardDeviationbyTime?.fortyFour} %</li>
                  <li>
                    <span>
                      The formula for the time is "time &lt; 1800" for 30m
                    </span>
                  </li>
                </ul>
              </li>
            </ul>
            {/* <Charts data={durationStatistics?.standardDeviationbyTime} /> */}
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Score Statistics?">
            <ul>
              <li>Min: {statistics?.score?.min}</li>
              <li>Max: {statistics?.score?.max}</li>
              <li>Average: {statistics?.score?.average}</li>
              <li>Median: {statistics?.score?.median}</li>
              <li>Mode: {statistics?.score?.mode}</li>
              <li>Variance: {statistics?.score?.variance}</li>
              <li>Confidence Interval: {statistics?.score?.confidenceInterval}</li>
              <li>Regression: {statistics?.score?.regression}</li>
              <li>
                standardDeviation:
                <ul>
                  <li> Less 30.5: {statistics?.score?.standardDeviationbyScore?.thirty} %</li>
                  <li> Less 32.5: {statistics?.score?.standardDeviationbyScore?.thirtyTwo} %</li>
                  <li> Less 34.5: {statistics?.score?.standardDeviationbyScore?.thirtyFour} %</li>
                  <li> Less 36.5: {statistics?.score?.standardDeviationbyScore?.thirtySix} %</li>
                  <li> Less 38.5: {statistics?.score?.standardDeviationbyScore?.thirtyEight} %</li>
                  <li> Less 40.5: {statistics?.score?.standardDeviationbyScore?.forty} %</li>
                  <li> Less 42.5: {statistics?.score?.standardDeviationbyScore?.fortyTwo} %</li>
                  <li> Less 44.5: {statistics?.score?.standardDeviationbyScore?.fortyFour} %</li>
                  <li> Less 46.5: {statistics?.score?.standardDeviationbyScore?.fortySix} %</li>
                  <li> Less 48.5: {statistics?.score?.standardDeviationbyScore?.fortyEight} %</li>
                  <li> Less 50.5: {statistics?.score?.standardDeviationbyScore?.fifty} %</li>
                  <li> Less 52.5: {statistics?.score?.standardDeviationbyScore?.fiftyTwo} %</li>
                  <li> Less 54.5: {statistics?.score?.standardDeviationbyScore?.fiftyFour} %</li>
                  <li> Less 56.5: {statistics?.score?.standardDeviationbyScore?.fiftySix} %</li>
                  <li> Less 58.5: {statistics?.score?.standardDeviationbyScore?.fiftyEight} %</li>
                  <li> Less 60.5: {statistics?.score?.standardDeviationbyScore?.sixty} %</li>
                  <li> Less 62.5: {statistics?.score?.standardDeviationbyScore?.sixtyTwo} %</li>
                  <li> Less 64.5: {statistics?.score?.standardDeviationbyScore?.sixtyFour} %</li>
                  <li> Less 66.5: {statistics?.score?.standardDeviationbyScore?.sixtySix} %</li>
                  <li> Less 68.5: {statistics?.score?.standardDeviationbyScore?.sixtyEight} %</li>
                  <li> Less 70.5: {statistics?.score?.standardDeviationbyScore?.seventy} %</li>
                </ul>
              </li>
            </ul>
            {/* <Charts data={statistics?.score?.standardDeviationbyScore}/> */}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Statistics;
