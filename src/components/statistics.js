import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { Card, Col, Row } from 'antd';
import calculateStatistics from '../utils/statistics'
import { selectAllMatches } from '../features/matches/matchesSlice';


const Statistics = () => {
  const [durationStatistics, setDurationStatistics] = useState({});
  const [scoreStatistics, setScoreStatistics] = useState({});
  const { matches } = useSelector(selectAllMatches);

  useEffect(() => {
    if (!matches.length) {
      return;
    }

    const durationStatistics = calculateStatistics(matches.map(match => match.duration));
    const scoreStatistics = calculateStatistics(matches.map(match => match.radiant_score + match.dire_score));
    setDurationStatistics(durationStatistics);
    setScoreStatistics(scoreStatistics);
  }, [matches]);

  const convertSecondsToTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = (seconds % 60).toFixed(3);
    return `${minutes}m ${secondsLeft}s`;
  };

  return (
    <div style={{ padding: '20px' }}>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card title="Duration Statistics"
            colorBgContainer="#f0f2f5"
          >
            <ul>
              <li>Min: {convertSecondsToTime(durationStatistics.min)}</li>
              <li>Max: {convertSecondsToTime(durationStatistics.max)}</li>
              <li>Average: {convertSecondsToTime(durationStatistics.average)}</li>
              <li>Median: {convertSecondsToTime(durationStatistics.median)}</li>
              <li>Mode: {convertSecondsToTime(durationStatistics.mode)}</li>
              <li>Variance: {convertSecondsToTime(durationStatistics.variance)}</li>
              <li>Confidence Interval: {durationStatistics.confidenceInterval}</li>
              <li>Regression: {durationStatistics.regression}</li>
              <li>
                standardDeviation:
                <ul>
                  <li> 30m: {durationStatistics.standardDeviationbyTime?.thirty} %</li>
                  <li> 32m: {durationStatistics.standardDeviationbyTime?.thirtyTwo} %</li>
                  <li> 34m: {durationStatistics.standardDeviationbyTime?.thirtyFour} %</li>
                  <li> 36m: {durationStatistics.standardDeviationbyTime?.thirtySix} %</li>
                  <li> 38m: {durationStatistics.standardDeviationbyTime?.thirtyEight} %</li>
                  <li> 40m: {durationStatistics.standardDeviationbyTime?.forty} %</li>
                  <li> 42m: {durationStatistics.standardDeviationbyTime?.fortyTwo} %</li>
                  <li> 44m: {durationStatistics.standardDeviationbyTime?.fortyFour} %</li>
                  </ul>
              </li>
            </ul>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Score Statistics">
            <ul>
              <li>Min: {scoreStatistics.min}</li>
              <li>Max: {scoreStatistics.max}</li>
              <li>Average: {scoreStatistics.average}</li>
              <li>Median: {scoreStatistics.median}</li>
              <li>Mode: {scoreStatistics.mode}</li>
              <li>Variance: {scoreStatistics.variance}</li>
              <li>Confidence Interval: {scoreStatistics.confidenceInterval}</li>
              <li>Regression: {scoreStatistics.regression}</li>
              <li>
                standardDeviation:
                <ul>
                  <li> 30: {scoreStatistics.standardDeviationbyScore?.thirty} %</li>
                  <li> 32: {scoreStatistics.standardDeviationbyScore?.thirtyTwo} %</li>
                  <li> 34: {scoreStatistics.standardDeviationbyScore?.thirtyFour} %</li>
                  <li> 36: {scoreStatistics.standardDeviationbyScore?.thirtySix} %</li>
                  <li> 38: {scoreStatistics.standardDeviationbyScore?.thirtyEight} %</li>
                  <li> 40: {scoreStatistics.standardDeviationbyScore?.forty} %</li>
                  <li> 42: {scoreStatistics.standardDeviationbyScore?.fortyTwo} %</li>
                  <li> 44: {scoreStatistics.standardDeviationbyScore?.fortyFour} %</li>
                  <li> 46: {scoreStatistics.standardDeviationbyScore?.fortySix} %</li>
                  <li> 48: {scoreStatistics.standardDeviationbyScore?.fortyEight} %</li>
                  <li> 50: {scoreStatistics.standardDeviationbyScore?.fifty} %</li>
                  <li> 52: {scoreStatistics.standardDeviationbyScore?.fiftyTwo} %</li>
                  <li> 54: {scoreStatistics.standardDeviationbyScore?.fiftyFour} %</li>
                  <li> 56: {scoreStatistics.standardDeviationbyScore?.fiftySix} %</li>
                  <li> 58: {scoreStatistics.standardDeviationbyScore?.fiftyEight} %</li>
                  <li> 60: {scoreStatistics.standardDeviationbyScore?.sixty} %</li>
                  <li> 62: {scoreStatistics.standardDeviationbyScore?.sixtyTwo} %</li>
                  <li> 64: {scoreStatistics.standardDeviationbyScore?.sixtyFour} %</li>
                  <li> 66: {scoreStatistics.standardDeviationbyScore?.sixtySix} %</li>
                  <li> 68: {scoreStatistics.standardDeviationbyScore?.sixtyEight} %</li>
                  <li> 70: {scoreStatistics.standardDeviationbyScore?.seventy} %</li>
                </ul>
              </li>
            </ul>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Statistics;
