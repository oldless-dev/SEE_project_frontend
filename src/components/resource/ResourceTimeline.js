// src/components/resource/ResourceTimeline.js
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

const ResourceTimeline = ({ timelineData }) => {
  if (!timelineData || timelineData.length === 0) return null;

  const data = {
    labels: timelineData.map(item => item.week),
    datasets: [
      {
        label: '资源使用量',
        data: timelineData.map(item => item.usage),
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
      {
        label: '资源上限',
        data: timelineData.map(item => item.capacity),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        type: 'line',
        fill: false
      }
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: '资源使用时间线',
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: '资源使用量'
        }
      },
      x: {
        title: {
          display: true,
          text: '项目周数'
        }
      }
    }
  };

  return (
    <div className="chart-container mt-4">
      <Bar options={options} data={data} />
    </div>
  );
};

export default ResourceTimeline;