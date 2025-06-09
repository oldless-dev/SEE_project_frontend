import React from 'react';

const ResultDisplay = ({ result }) => {
  return (
    <div className="result-container">
      <h2 className="result-title">计算结果</h2>
      <div className="result-content">
        {result.effort && (
          <div className="result-item">
            <span className="result-label">工作量 (人月):</span>
            <span className="result-value">{result.effort.toFixed(2)}</span>
          </div>
        )}
        {result.time && (
          <div className="result-item">
            <span className="result-label">开发时间 (月):</span>
            <span className="result-value">{result.time.toFixed(2)}</span>
          </div>
        )}
        {result.staff && (
          <div className="result-item">
            <span className="result-label">人员需求 (人):</span>
            <span className="result-value">{result.staff.toFixed(2)}</span>
          </div>
        )}
        {result.phaseDistribution && (
          <div className="phase-distribution">
            <h3 className="phase-title">阶段分布</h3>
            <div className="phase-items">
              {Object.entries(result.phaseDistribution).map(([phase, value]) => (
                <div key={phase} className="phase-item">
                  <span className="phase-label">{phase}:</span>
                  <span className="phase-value">{value.toFixed(2)}%</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultDisplay;