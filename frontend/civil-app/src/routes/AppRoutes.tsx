import React from 'react';
import { Routes, Route, Router } from 'react-router-dom';
import DashboardReadings from '../components/dashboard-components/DashboardReadings';


const AppRoutes: React.FC = () => {
  return (
      <Routes>
        <Route path="/dashboard" element={<DashboardReadings />} />
        <Route path="/" element={<DashboardReadings />} />
      </Routes>
  );
};


export const API_URL = 'http://localhost:5000';
export default AppRoutes;