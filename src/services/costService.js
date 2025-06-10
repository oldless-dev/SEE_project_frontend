// 示例API服务
// src/services/costService.js
import axios from 'axios';

export function runRegressionAnalysis() {
}


export function calculateFunctionPoints() {
}


const API_URL = process.env.REACT_APP_API_URL;

export const calculateCocomo = async (data) => {
  const response = await axios.post(`${API_URL}/cost/cocomo`, data);
  return response.data;
};

export const getCostEstimates = async (projectId) => {
  const response = await axios.get(`${API_URL}/cost/estimates/${projectId}`);
  return response.data;
};
