import React from 'react';
import { Route, Routes as Router } from "react-router-dom"
import { ConfigProvider, theme } from 'antd';

import App from './App';
import TeamsList from './pages/TeamsList';
import Team from './pages/Team';


function Routes() {
  return (
    <ConfigProvider
      theme={{
        algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
      }}
    >
      <Router>
        <Route path="/" element={<App />} />
        <Route path="/teams" element={<TeamsList />} />
        <Route path="/teams/:id" element={<Team />} />
      </Router>
    </ConfigProvider>
  );
}

export default Routes;
