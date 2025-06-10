// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="custom-navbar">
      <div className="nav-brand">
        📊 Economic Analysis and Decision-Making Tool for Software Projects
      </div>
      <ul className="nav-links">

        <li><Link to="/cost-estimation">Cost Estimation</Link></li>
        <li><Link to="/budget-tracking/test">Budgeting and Cost Management</Link></li>
        <li><Link to="/economic-metrics/test">Risk Management Module</Link></li>
      </ul>
    </nav>
  );
}
