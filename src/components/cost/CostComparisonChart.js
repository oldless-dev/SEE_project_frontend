// src/components/cost/CostComparisonChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CostComparisonChart = ({ estimates }) => {
  if (!estimates || estimates.length === 0) return null;

  // 按模型类型分组
  const models = [...new Set(estimates.map(e => e.model_type))];

  // 为每个模型获取最新的估算值
  const latestEstimates = models.map(model => {
    const modelEstimates = estimates.filter(e => e.model_type === model);
    return modelEstimates[modelEstimates.length - 1];
  });

  const data = {
    labels: latestEstimates.map(e => e.model_type),
    datasets: [
      {
        label: '估算成本 (¥)',
        data: latestEstimates.map(e => e.estimated_cost),
        backgroundColor: [
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 99, 132, 0.5)',
          'rgba(75, 192, 192, 0.5)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: '成本估算模型比较',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `¥${context.raw.toLocaleString()}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return '¥' + value.toLocaleString();
          }
        }
      }
    }
  };

  return (
    <div className="chart-container">
      <Bar data={data} options={options} />
    </div>
  );
};

export default CostComparisonChart;