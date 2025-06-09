import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import ProjectList from './pages/ProjectList';
import ProjectList from './Pages/ProjectList'
import CostEstimation from './Pages/CostEstimation';
import EconomicMetrics from './Pages/EconomicMetrics';
import BudgetTracking from './Pages/BudgetTracking';
import RiskManagement from './Pages/RiskManagement';
import ResourceAllocation from './Pages/ResourceAllocation';
import Navbar from './components/Navbar';

function App() {
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<ProjectList />} />
          <Route path="/cost-estimation/:projectId" element={<CostEstimation />} />
          <Route path="/economic-metrics/:projectId" element={<EconomicMetrics />} />
          <Route path="/budget-tracking/:projectId" element={<BudgetTracking />} />
          <Route path="/risk-management/:projectId" element={<RiskManagement />} />
          <Route path="/resource-allocation/:projectId" element={<ResourceAllocation />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
