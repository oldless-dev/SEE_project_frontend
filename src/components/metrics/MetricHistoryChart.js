// src/components/metrics/MetricHistoryChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MetricHistoryChart = ({ history }) => {
  if (!history || history.length === 0) return null;

  // 按日期排序
  const sortedHistory = [...history].sort((a, b) =>
    new Date(a.recorded_at) - new Date(b.recorded_at)
  );

  const labels = sortedHistory.map(item =>
    new Date(item.recorded_at).toLocaleDateString()
  );

  const data = {
    labels,
    datasets: [
      {
        label: '投资回报率 (ROI)',
        data: sortedHistory.map(item => item.roi * 100),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        yAxisID: 'y',
      },
      {
        label: '净现值 (NPV)',
        data: sortedHistory.map(item => item.npv / 1000),
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        yAxisID: 'y1',
      }
    ],
  };

  const options = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: '经济指标历史趋势',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              if (context.datasetIndex === 0) {
                label += context.parsed.y.toFixed(2) + '%';
              } else {
                label += '¥' + (context.parsed.y * 1000).toLocaleString();
              }
            }
            return label;
          }
        }
      }
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'ROI (%)'
        },
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        title: {
          display: true,
          text: 'NPV (千元)'
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <Line options={options} data={data} />
    </div>
  );
};

export default MetricHistoryChart;