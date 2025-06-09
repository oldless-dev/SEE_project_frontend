import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

import CalculatorForm from './components/CalculatorForm';
import CostBenefitForm from './components/CostBenefitForm';
import ResultDisplay from './components/ResultDisplay';

import './App.css';

function App() {
    // COCOMO计算
    const [formData, setFormData] = useState({
    cocomoType: '',
    kloc: '',
    projectType: '',
    costDrivers: {
      RELY: 1.0,
      DATA: 1.0,
      CPLX: 1.0
    },
    phaseAdjustments: {
      Design: 0,
      Coding: 0,
      Testing: 0
    }
  });
  const [submittedData, setSubmittedData] = useState(null);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    validateField(name, value);
  };

  const handleCostDriverChange = (driverName, value) => {
    setFormData(prevData => ({
      ...prevData,
      costDrivers: {
        ...prevData.costDrivers,
        [driverName]: parseFloat(value)
      }
    }));
    validateField(`costDrivers.${driverName}`, value);
  };

  const handlePhaseAdjustmentChange = (phaseName, value) => {
    setFormData(prevData => ({
      ...prevData,
      phaseAdjustments: {
        ...prevData.phaseAdjustments,
        [phaseName]: parseFloat(value)
      }
    }));
    validateField(`phaseAdjustments.${phaseName}`, value);
  };

  const validateField = (name, value) => {
    let error = '';
    switch(name) {
      case 'cocomoType':
        if (!value) error = 'This field is required';
        else if (!['basic', 'intermediate', 'detailed'].includes(value))
          error = 'Must be one of basic, intermediate, detailed';
        break;
      case 'kloc':
        if (!value) error = 'This field is required';
        else if (isNaN(parseFloat(value)) || parseFloat(value) <= 0)
          error = 'Must be a number greater than 0';
        break;
      case 'projectType':
        if (!value) error = 'This field is required';
        else if (!['Organic', 'Semi-detached', 'Embedded'].includes(value))
          error = 'Must be one of Organic, Semi-detached, Embedded';
        break;
      case 'costDrivers.RELY':
      case 'costDrivers.DATA':
      case 'costDrivers.CPLX':
        const driverName = name.split('.')[1];
        if (isNaN(parseFloat(value))) error = 'Must be a number';
        else if (
          (driverName === 'RELY' && (parseFloat(value) < 0.75 || parseFloat(value) > 1.40)) ||
          (driverName === 'DATA' && (parseFloat(value) < 0.94 || parseFloat(value) > 1.16)) ||
          (driverName === 'CPLX' && (parseFloat(value) < 0.70 || parseFloat(value) > 1.65))
        ) {
          let min, max;
          if (driverName === 'RELY') { min = 0.75; max = 1.40; }
          else if (driverName === 'DATA') { min = 0.94; max = 1.16; }
          else { min = 0.70; max = 1.65; }
          error = `Must be between ${min}-${max}`;
        }
        break;
      case 'phaseAdjustments.Design':
      case 'phaseAdjustments.Coding':
      case 'phaseAdjustments.Testing':
        if (isNaN(parseFloat(value))) error = 'Must be a number';
        break;
      default:
        break;
    }
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: error
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 验证所有字段
    let isValid = true;
    const newErrors = {};

    // 验证基本字段
    ['cocomoType', 'kloc', 'projectType'].forEach(field => {
      if (!formData[field]) {
        newErrors[field] = 'This field is required';
        isValid = false;
      }
    });

    // 验证COCOMO类型
    if (formData.cocomoType &&
        !['basic', 'intermediate', 'detailed'].includes(formData.cocomoType)) {
      newErrors.cocomoType = 'Must be one of basic, intermediate, detailed';
      isValid = false;
    }

    // 验证KLOC
    if (formData.kloc && (isNaN(parseFloat(formData.kloc)) || parseFloat(formData.kloc) <= 0)) {
      newErrors.kloc = 'Must be a number greater than 0';
      isValid = false;
    }

    // 验证项目类型
    if (formData.projectType &&
        !['Organic', 'Semi-detached', 'Embedded'].includes(formData.projectType)) {
      newErrors.projectType = 'Must be one of Organic, Semi-detached, Embedded';
      isValid = false;
    }

    // 只有当选择中级或高级COCOMO时才验证成本驱动因子
    if (formData.cocomoType === 'intermediate' || formData.cocomoType === 'detailed') {
      Object.entries(formData.costDrivers).forEach(([driver, value]) => {
        let min, max;
        if (driver === 'RELY') { min = 0.75; max = 1.40; }
        else if (driver === 'DATA') { min = 0.94; max = 1.16; }
        else if (driver === 'CPLX') { min = 0.70; max = 1.65; }

        if (isNaN(parseFloat(value)) || parseFloat(value) < min || parseFloat(value) > max) {
          newErrors[`costDrivers.${driver}`] = `Must be between ${min}-${max}`;
          isValid = false;
        }
      });
    }

    // 只有当选择高级COCOMO时才验证阶段调整
    if (formData.cocomoType === 'detailed') {
      Object.entries(formData.phaseAdjustments).forEach(([phase, value]) => {
        if (isNaN(parseFloat(value))) {
          newErrors[`phaseAdjustments.${phase}`] = 'Must be a number';
          isValid = false;
        }
      });
    }

    setErrors(newErrors);

    if (isValid) {
      try {
        const response = await fetch('http://your-api-url.com/calculate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        if (!response.ok) {
          throw new Error('Calculation failed, please try again');
        }

        const data = await response.json();
        setSubmittedData(data);
      } catch (error) {
        console.error('Error:', error);
        alert(error.message || 'Submission failed, please check your network connection');
      }
    }
  };

  const handleReset = () => {
    setFormData({
      cocomoType: '',
      kloc: '',
      projectType: '',
      costDrivers: {
        RELY: 1.0,
        DATA: 1.0,
        CPLX: 1.0
      },
      phaseAdjustments: {
        Design: 0,
        Coding: 0,
        Testing: 0
      }
    });
    setErrors({});
    setSubmittedData(null);
  };

  // 敏感度分析
    const [inputValues, setInputValues] = useState({
    initialCost: '',
    initialBenefit: '',
    changeCost: '',
    changeRevenue: '',
    developmentCostChange: 0,
    revenueAlteration: 0
  });

  const [analysisResults, setAnalysisResults] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setInputValues(prevValues => ({
      ...prevValues,
      [name]: value
    }));
    validateInputField(name, value);
  };

  const validateInputField = (name, value) => {
    let validationMessage = '';
    const numericValue = parseFloat(value);

    switch (name) {
      case 'initialCost':
        if (!value) validationMessage = '此字段为必填项';
        else if (isNaN(numericValue) || numericValue <= 0)
          validationMessage = '必须是正数';
        break;
      case 'initialBenefit':
        if (!value) validationMessage = '此字段为必填项';
        else if (isNaN(numericValue))
          validationMessage = '必须是有效数字';
        break;
      case 'changeCost':
        if (!value) validationMessage = '此字段为必填项';
        else if (isNaN(numericValue))
          validationMessage = '必须是有效数字';
        break;
      case 'changeRevenue':
        if (!value) validationMessage = '此字段为必填项';
        else if (isNaN(numericValue))
          validationMessage = '必须是有效数字';
        break;
      case 'developmentCostChange':
        if (isNaN(numericValue))
          validationMessage = '必须是有效数字';
        break;
      case 'revenueAlteration':
        if (isNaN(numericValue))
          validationMessage = '必须是有效数字';
        break;
      default:
        break;
    }

    setValidationErrors(prevErrors => ({
      ...prevErrors,
      [name]: validationMessage
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Validate all fields
    let isValid = true;
    const newValidationErrors = {};

    ['initialCost', 'initialBenefit', 'changeCost', 'changeRevenue', 'developmentCostChange', 'revenueAlteration'].forEach(field => {
      if (!inputValues[field] && field !== 'developmentCostChange' && field !== 'revenueAlteration') {
        newValidationErrors[field] = '此字段为必填项';
        isValid = false;
      } else if (isNaN(parseFloat(inputValues[field]))) {
        if (field === 'initialCost') {
          newValidationErrors[field] = '必须是正数';
        } else {
          newValidationErrors[field] = '必须是有效数字';
        }
        isValid = false;
      } else if (field === 'initialCost' && parseFloat(inputValues[field]) <= 0) {
        newValidationErrors[field] = '必须是正数';
        isValid = false;
      }
    });

    setValidationErrors(newValidationErrors);

    if (isValid) {
      // Calculate results
      const initialCost = parseFloat(inputValues.initialCost);
      const initialBenefit = parseFloat(inputValues.initialBenefit);
      const changeCost = parseFloat(inputValues.changeCost);
      const changeRevenue = parseFloat(inputValues.changeRevenue);
      const developmentCostChange = parseFloat(inputValues.developmentCostChange);
      const revenueAlteration = parseFloat(inputValues.revenueAlteration);

      const totalCost = initialCost + changeCost + developmentCostChange;
      const totalRevenue = initialBenefit + changeRevenue + revenueAlteration;
      const netBenefit = totalRevenue - totalCost;
      const roi = totalCost > 0 ? (netBenefit / totalCost) * 100 : 0;

      const analysisResult = {
        totalCost,
        totalRevenue,
        netBenefit,
        roi
      };

      setAnalysisResults(analysisResult);
    }
  };

  const handleFormReset = () => {
    setInputValues({
      initialCost: '',
      initialBenefit: '',
      changeCost: '',
      changeRevenue: '',
      developmentCostChange: 0,
      revenueAlteration: 0
    });
    setValidationErrors({});
    setAnalysisResults(null);
  };

  return (
    <div className="app-container">
      <h1 className="app-title">COCOMO Cost Estimation Calculator</h1>
      <CalculatorForm
        formData={formData}
        errors={errors}
        handleInputChange={handleInputChange}
        handleCostDriverChange={handleCostDriverChange}
        handlePhaseAdjustmentChange={handlePhaseAdjustmentChange}
        handleSubmit={handleSubmit}
        handleReset={handleReset}
        showCostDrivers={formData.cocomoType === 'intermediate' || formData.cocomoType === 'detailed'}
        showPhaseAdjustments={formData.cocomoType === 'detailed'}
      />
      {submittedData && <ResultDisplay result={submittedData} />}

      <h1 className="app-title">Sensitivity Analysis</h1>
      <CostBenefitForm
        formData={inputValues}
        errors={validationErrors}
        handleInputChange={handleFieldChange}
        handleSubmit={handleFormSubmit}
        handleReset={handleFormReset}
      />
      {analysisResults && <ResultDisplay results={analysisResults} />}
    </div>
  );
}

export default App;