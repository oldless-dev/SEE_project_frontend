// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">经济分析工具</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">项目</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cost-estimation">成本估算</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}