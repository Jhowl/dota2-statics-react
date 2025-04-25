import React from "react";
import { Table } from "antd";
import { heroes } from "dotaconstants";

//Nees return
// const fomartData = (standardDeviationHeroes) => {
//   return Object.values(heroes).map((hero) => ({
//     heroName: hero.localized_name,
//     heroId: hero.id,
//     ...Object.keys(standardDeviationHeroes).reduce((acc, deviation) => {
//       acc[deviation] = standardDeviationHeroes[deviation][hero.id];
//       return acc;
//     }, {}),
//   }));
// }

const StandartDeviationScore = ({ title, standardDeviation, loading, error }) => {

  console.log('teste', title)
  if (!standardDeviation) {
    return (
      <div className="Statistics">
        <p>There is no data</p>
      </div>
    );
  }

  const columns = [
    {
      title: "Hero Name 2",
      dataIndex: "heroName",
      key: "heroId",
      filterSearch: true,
      filters: Object.values(heroes).map((hero) => ({ text: hero.localized_name, value: hero.localized_name })),
      // ellipsis: true,
      onFilter: (value, record) => record.heroName.indexOf(value) === 0,
      sorter: (a, b) => a.heroName.localeCompare(b.heroName),
      // width: '30%'
    },
    ...standardDeviation.thresholds.map((deviation) => ({ title: deviation, dataIndex: deviation, key: deviation, sorter: (a, b) => a[deviation].localeCompare(b[deviation]) })),
  ];

  console.log(standardDeviation.heroesDeviation);

  return (
    <div className="heroes-table" style={{ borderRadius: "5px", paddingLeft: "30px", paddingRight: "30px" }}>
      <h4>{title}</h4>
      {loading && <p>Loading...</p>}

      <Table loading={loading} dataSource={standardDeviation.heroesDeviation} columns={columns} pagination={false} size="small" scroll={{ y: 240 }} bordered />
      {error && <p>{error}</p>}
    </div>
  );
}

export default StandartDeviationScore;
