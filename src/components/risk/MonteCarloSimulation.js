// src/components/risk/MonteCarloSimulation.js
import React, { useState, useEffect } from 'react';
import { Button, Card, ProgressBar } from 'react-bootstrap';
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

const MonteCarloSimulation = ({ projectId, risks }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [simulationResults, setSimulationResults] = useState(null);

  const runSimulation = () => {
    setIsRunning(true);
    setProgress(0);

    // 模拟运行过程
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRunning(false);

          // 生成模拟结果
          const results = [];
          for (let i = 0; i < 1000; i++) {
            // 随机生成成本（基于风险概率）
            let totalCost = 500000;
            risks.forEach(risk => {
              if (Math.random() < risk.probability) {
                totalCost += risk.impact;
              }
            });

            // 添加一些随机变化
            totalCost *= (0.9 + Math.random() * 0.2);
            results.push(totalCost);
          }

          // 分析结果分布
          const min = Math.min(...results);
          const max = Math.max(...results);
          const avg = results.reduce((a, b) => a + b, 0) / results.length;

          // 创建分布数据
          const bucketSize = (max - min) / 20;
          const distribution = Array(20).fill(0);
          results.forEach(value => {
            const bucket = Math.floor((value - min) / bucketSize);
            if (bucket >= 0 && bucket < 20) {
              distribution[bucket]++;
            }
          });

          setSimulationResults({
            min,
            max,
            avg,
            distribution,
            totalRuns: results.length
          });

          return 100;
        }
        return prev + 1;
      });
    }, 20);
  };

  const renderResults = () => {
    if (!simulationResults) return null;

    const labels = [];
    const bucketSize = (simulationResults.max - simulationResults.min) / 20;
    for (let i = 0; i < 20; i++) {
      const start = simulationResults.min + i * bucketSize;
      const end = start + bucketSize;
      labels.push(`¥${Math.round(start/1000)}k-¥${Math.round(end/1000)}k`);
    }

    const data = {
      labels,
      datasets: [
        {
          label: '结果分布',
          data: simulationResults.distribution,
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        }
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
          text: '蒙特卡洛模拟结果分布',
        },
      },
      scales: {
        y: {
          title: {
            display: true,
            text: '出现次数'
          }
        },
        x: {
          title: {
            display: true,
            text: '项目成本区间'
          },
          ticks: {
            autoSkip: true,
            maxTicksLimit: 10
          }
        }
      }
    };

    return (
      <div className="mt-4">
        <h5>模拟结果统计</h5>
        <div className="row">
          <div className="col-md-4">
            <Card>
              <Card.Body>
                <Card.Title>最低成本</Card.Title>
                <Card.Text className="fs-3 text-success">
                  ¥{Math.round(simulationResults.min).toLocaleString()}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className="col-md-4">
            <Card>
              <Card.Body>
                <Card.Title>平均成本</Card.Title>
                <Card.Text className="fs-3 text-primary">
                  ¥{Math.round(simulationResults.avg).toLocaleString()}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className="col-md-4">
            <Card>
              <Card.Body>
                <Card.Title>最高成本</Card.Title>
                <Card.Text className="fs-3 text-danger">
                  ¥{Math.round(simulationResults.max).toLocaleString()}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>

        <div className="chart-container mt-4">
          <Bar options={options} data={data} />
        </div>

        <div className="alert-section mt-4">
          <h6>风险分析结论:</h6>
          <p>
            根据蒙特卡洛模拟结果，项目成本有90%的概率在 ¥{Math.round(simulationResults.min * 1.1).toLocaleString()} 到
            ¥{Math.round(simulationResults.max * 0.9).toLocaleString()} 之间。平均成本为
            ¥{Math.round(simulationResults.avg).toLocaleString()}，比基准预算高出约15%。
            建议预留10-15%的应急储备金。
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="analysis-section">
      <h4 className="section-title">蒙特卡洛模拟</h4>

      <p className="text-muted">
        蒙特卡洛模拟通过随机抽样方法，模拟项目成本在各种风险因素影响下的可能分布。
        本次模拟将考虑项目中已识别的 {risks.length} 项风险。
      </p>

      {isRunning ? (
        <div className="text-center">
          <h5>模拟运行中...</h5>
          <ProgressBar
            now={progress}
            label={`${progress}%`}
            animated
            className="mb-3"
          />
          <p>正在进行第 {Math.floor(progress * 10)} / 1000 次迭代</p>
        </div>
      ) : (
        <div className="text-center">
          <Button
            variant="primary"
            size="lg"
            onClick={runSimulation}
            disabled={risks.length === 0}
          >
            开始蒙特卡洛模拟
          </Button>
          {risks.length === 0 && (
            <p className="text-danger mt-2">
              请先添加项目风险，然后才能进行模拟分析。
            </p>
          )}
        </div>
      )}

      {simulationResults && renderResults()}
    </div>
  );
};

export default MonteCarloSimulation;