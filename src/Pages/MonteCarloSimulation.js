import React, { useState } from 'react';
import api from '../services/api';
import './BudgetTracking.css';

export default function MonteCarloSimulation() {
  const [costMin, setCostMin] = useState('');
  const [costMax, setCostMax] = useState('');
  const [revenueMean, setRevenueMean] = useState('');
  const [revenueStd, setRevenueStd] = useState('');
  const [discountMin, setDiscountMin] = useState('');
  const [discountMax, setDiscountMax] = useState('');
  const [duration, setDuration] = useState('');
  const [simulations, setSimulations] = useState('');

  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleCalculate = async () => {
    try {
      const response = await api.post('/riskmanagement/monteCarlo', {
        cost_range: [parseFloat(costMin), parseFloat(costMax)],
        revenue_mean: parseFloat(revenueMean),
        revenue_std: parseFloat(revenueStd),
        discount_rate_range: [parseFloat(discountMin), parseFloat(discountMax)],
        duration: parseInt(duration),
        num_simulations: parseInt(simulations)
      });
      setResult(response.data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Simulation failed. Please check your input.');
      setResult(null);
    }
  };

  const handleReset = () => {
    setCostMin('');
    setCostMax('');
    setRevenueMean('');
    setRevenueStd('');
    setDiscountMin('');
    setDiscountMax('');
    setDuration('');
    setSimulations('');
    setResult(null);
    setError(null);
  };

  return (
    <div className="budget-page">
      <h1 className="section-title">🎲 Monte Carlo Simulation</h1>
      <div className="form-section">
        {/* Form Inputs */}
        <div className="form-group"><label>Min Cost</label><input value={costMin} onChange={e => setCostMin(e.target.value)} /></div>
        <div className="form-group"><label>Max Cost</label><input value={costMax} onChange={e => setCostMax(e.target.value)} /></div>
        <div className="form-group"><label>Revenue Mean</label><input value={revenueMean} onChange={e => setRevenueMean(e.target.value)} /></div>
        <div className="form-group"><label>Revenue Std Dev</label><input value={revenueStd} onChange={e => setRevenueStd(e.target.value)} /></div>
        <div className="form-group"><label>Discount Rate Min</label><input value={discountMin} onChange={e => setDiscountMin(e.target.value)} /></div>
        <div className="form-group"><label>Discount Rate Max</label><input value={discountMax} onChange={e => setDiscountMax(e.target.value)} /></div>
        <div className="form-group"><label>Project Duration (years)</label><input value={duration} onChange={e => setDuration(e.target.value)} /></div>
        <div className="form-group"><label>Number of Simulations</label><input value={simulations} onChange={e => setSimulations(e.target.value)} /></div>
        <div className="button-group">
          <button className="btn primary" onClick={handleCalculate}>Calculate</button>
          <button className="btn secondary" onClick={handleReset}>Reset</button>
        </div>
      </div>

      {error && <p className="error-message">{error}</p>}

      {result && (
        <div className="result-section">
          <h3>📈 Simulation Result</h3>
          <p><strong>Mean NPV:</strong> {result.mean_npv.toFixed(2)}</p>
          <p><strong>First 5 NPV values:</strong> {result.npv_values.slice(0, 5).map(v => v.toFixed(2)).join(', ')}...</p>
        </div>
      )}
    </div>
  );
}
