import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { Card, Col, Row } from 'antd';
import calculateStatistics from '../utils/statistics'
import { selectAllMatches } from '../redux/matchesSlice';

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
          <Card title="Duration Statistics">
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
                  <li> 30m :{durationStatistics.standardDeviationbyTime?.thirty} %</li>
                  <li> 32m: {durationStatistics.standardDeviationbyTime?.thirtyTwo} %</li>
                  <li> 34m: {durationStatistics.standardDeviationbyTime?.thirtyFour} %</li>
                  <li> 36m: {durationStatistics.standardDeviationbyTime?.thirtySix} %</li>
                  <li> 38m: {durationStatistics.standardDeviationbyTime?.thirtyEight} %</li>
                  <li> 40m: {durationStatistics.standardDeviationbyTime?.forty} %</li>
                  <li> 42m: {durationStatistics.standardDeviationbyTime?.fortyTwo} %</li>
                  <li> 44m: {durationStatistics.standardDeviationbyTime?.fortyFour} %</li>
                  <li>
                    <span>
                      The formula for the time is "time &lt; 1800" for 30m
                    </span>
                  </li>
                </ul>
              </li>
              <li>
                <a href={durationStatistics.generateLinkWolfram} target="_blank" rel="noreferrer noopener">
                  View on Wolfram Alpha</a>
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
                  <li> Less 30.5: {scoreStatistics.standardDeviationbyScore?.thirty} %</li>
                  <li> Less 32.5: {scoreStatistics.standardDeviationbyScore?.thirtyTwo} %</li>
                  <li> Less 34.5: {scoreStatistics.standardDeviationbyScore?.thirtyFour} %</li>
                  <li> Less 36.5: {scoreStatistics.standardDeviationbyScore?.thirtySix} %</li>
                  <li> Less 38.5: {scoreStatistics.standardDeviationbyScore?.thirtyEight} %</li>
                  <li> Less 40.5: {scoreStatistics.standardDeviationbyScore?.forty} %</li>
                  <li> Less 42.5: {scoreStatistics.standardDeviationbyScore?.fortyTwo} %</li>
                  <li> Less 44.5: {scoreStatistics.standardDeviationbyScore?.fortyFour} %</li>
                  <li> Less 46.5: {scoreStatistics.standardDeviationbyScore?.fortySix} %</li>
                  <li> Less 48.5: {scoreStatistics.standardDeviationbyScore?.fortyEight} %</li>
                  <li> Less 50.5: {scoreStatistics.standardDeviationbyScore?.fifty} %</li>
                  <li> Less 52.5: {scoreStatistics.standardDeviationbyScore?.fiftyTwo} %</li>
                  <li> Less 54.5: {scoreStatistics.standardDeviationbyScore?.fiftyFour} %</li>
                  <li> Less 56.5: {scoreStatistics.standardDeviationbyScore?.fiftySix} %</li>
                  <li> Less 58.5: {scoreStatistics.standardDeviationbyScore?.fiftyEight} %</li>
                  <li> Less 60.5: {scoreStatistics.standardDeviationbyScore?.sixty} %</li>
                  <li> Less 62.5: {scoreStatistics.standardDeviationbyScore?.sixtyTwo} %</li>
                  <li> Less 64.5: {scoreStatistics.standardDeviationbyScore?.sixtyFour} %</li>
                  <li> Less 66.5: {scoreStatistics.standardDeviationbyScore?.sixtySix} %</li>
                  <li> Less 68.5: {scoreStatistics.standardDeviationbyScore?.sixtyEight} %</li>
                  <li> Less 70.5: {scoreStatistics.standardDeviationbyScore?.seventy} %</li>
                </ul>
              </li>
              <li>
                <a href={scoreStatistics.generateLinkWolfram} target="_blank" rel="noreferrer noopener">
                  View on Wolfram Alpha</a>
              </li>
            </ul>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Statistics;
