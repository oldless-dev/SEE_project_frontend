import React from 'react';

const CostBenefitForm = ({
  formData,
  errors,
  handleInputChange,
  handleSubmit,
  handleReset
}) => {
  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-section">
        <h2 className="section-title">Initial Values</h2>

        <div className="form-group">
          <label htmlFor="initialCosts">Initial Costs ($):</label>
          <input
            type="number"
            id="initialCosts"
            name="initialCosts"
            value={formData.initialCosts}
            onChange={handleInputChange}
            className={errors.initialCosts ? 'error-input' : ''}
          />
          {errors.initialCosts && (
            <span className="error-message">{errors.initialCosts}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="initialBenefits">Initial Benefits ($):</label>
          <input
            type="number"
            id="initialBenefits"
            name="initialBenefits"
            value={formData.initialBenefits}
            onChange={handleInputChange}
            className={errors.initialBenefits ? 'error-input' : ''}
          />
          {errors.initialBenefits && (
            <span className="error-message">{errors.initialBenefits}</span>
          )}
        </div>
      </div>

      <div className="form-section">
        <h2 className="section-title">Change Values</h2>

        <div className="form-group">
          <label htmlFor="changeCosts">Change Costs ($):</label>
          <input
            type="number"
            id="changeCosts"
            name="changeCosts"
            value={formData.changeCosts}
            onChange={handleInputChange}
            className={errors.changeCosts ? 'error-input' : ''}
          />
          {errors.changeCosts && (
            <span className="error-message">{errors.changeCosts}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="changeRevenue">Change Revenue ($):</label>
          <input
            type="number"
            id="changeRevenue"
            name="changeRevenue"
            value={formData.changeRevenue}
            onChange={handleInputChange}
            className={errors.changeRevenue ? 'error-input' : ''}
          />
          {errors.changeRevenue && (
            <span className="error-message">{errors.changeRevenue}</span>
          )}
        </div>
      </div>

      <div className="form-section">
        <h2 className="section-title">Additional Adjustments</h2>

        <div className="form-group">
          <label htmlFor="devCostChange">Development Cost Change ($):</label>
          <input
            type="number"
            id="devCostChange"
            name="devCostChange"
            value={formData.devCostChange}
            onChange={handleInputChange}
            className={errors.devCostChange ? 'error-input' : ''}
          />
          {errors.devCostChange && (
            <span className="error-message">{errors.devCostChange}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="revenueChange">Revenue Change ($):</label>
          <input
            type="number"
            id="revenueChange"
            name="revenueChange"
            value={formData.revenueChange}
            onChange={handleInputChange}
            className={errors.revenueChange ? 'error-input' : ''}
          />
          {errors.revenueChange && (
            <span className="error-message">{errors.revenueChange}</span>
          )}
        </div>
      </div>

      <div className="form-actions">
        <button type="button" onClick={handleReset} className="reset-button">
          Reset
        </button>
        <button type="submit" className="submit-button">
          Calculate
        </button>
      </div>
    </form>
  );
};

export default CostBenefitForm;