import React from 'react';

const ResultDisplay2 = ({ results }) => {
  return (
    <div className="result-container">
      <h2 className="result-title">Analysis Results</h2>
      <div className="result-content">
        <div className="result-item">
          <div className="result-label">Total Costs:</div>
          <div className="result-value">${results.totalCosts.toFixed(2)}</div>
        </div>
        <div className="result-item">
          <div className="result-label">Total Revenue:</div>
          <div className="result-value">${results.totalRevenue.toFixed(2)}</div>
        </div>
        <div className="result-item">
          <div className="result-label">Net Benefit:</div>
          <div className="result-value" style={{ color: results.netBenefit >= 0 ? '#27ae60' : '#e74c3c' }}>
            ${results.netBenefit.toFixed(2)}
          </div>
        </div>
        <div className="result-item">
          <div className="result-label">Return on Investment (ROI):</div>
          <div className="result-value" style={{ color: results.roi >= 0 ? '#27ae60' : '#e74c3c' }}>
            {results.roi.toFixed(2)}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay2;