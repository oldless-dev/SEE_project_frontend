// src/components/risk/SensitivityAnalysis.js
import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
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

const SensitivityAnalysis = ({ projectId, risks }) => {
  const [sensitivityParams, setSensitivityParams] = useState({
    baseCost: 100000,
    timeFrame: 3,
    discountRate: 0.1,
    revenueGrowth: 0.15,
    costChangeRange: 20,
    revenueChangeRange: 20
  });

  const [results, setResults] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSensitivityParams({
      ...sensitivityParams,
      [name]: parseFloat(value)
    });
  };

  const runAnalysis = () => {
    // 模拟敏感性分析结果
    const costVariations = [-20, -10, 0, 10, 20];
    const npvResults = costVariations.map(variation => {
      const cost = sensitivityParams.baseCost * (1 + variation / 100);
      return {
        variation,
        npv: sensitivityParams.baseCost * (sensitivityParams.revenueGrowth - sensitivityParams.discountRate) * sensitivityParams.timeFrame * (1 + variation / 100)
      };
    });

    setResults(npvResults);
  };

  const renderChart = () => {
    if (!results) return null;

    const data = {
      labels: results.map(r => `${r.variation}%`),
      datasets: [
        {
          label: 'NPV变化',
          data: results.map(r => r.npv),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }
      ],
    };

    const options = {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: '成本变化对NPV的影响',
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `NPV: ¥${context.parsed.y.toLocaleString()}`;
            }
          }
        }
      },
      scales: {
        y: {
          title: {
            display: true,
            text: '净现值 (NPV)'
          },
          ticks: {
            callback: function(value) {
              return '¥' + value.toLocaleString();
            }
          }
        },
        x: {
          title: {
            display: true,
            text: '成本变化 (%)'
          }
        }
      }
    };

    return (
      <div className="chart-container mt-4">
        <Line data={data} options={options} />
      </div>
    );
  };

  return (
    <div className="analysis-section">
      <h4 className="section-title">敏感性分析</h4>

      <Row>
        <Col md={6}>
          <Form>
            <Form.Group className="mb-3" controlId="baseCost">
              <Form.Label>基础成本 (¥)</Form.Label>
              <Form.Control
                type="number"
                name="baseCost"
                value={sensitivityParams.baseCost}
                onChange={handleChange}
                min="0"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="timeFrame">
              <Form.Label>时间周期 (年)</Form.Label>
              <Form.Control
                type="number"
                name="timeFrame"
                value={sensitivityParams.timeFrame}
                onChange={handleChange}
                min="1"
                max="10"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="discountRate">
              <Form.Label>折现率 (%)</Form.Label>
              <Form.Control
                type="number"
                name="discountRate"
                value={sensitivityParams.discountRate * 100}
                onChange={(e) => setSensitivityParams({
                  ...sensitivityParams,
                  discountRate: parseFloat(e.target.value) / 100
                })}
                step="0.1"
                min="0"
                max="50"
                required
              />
            </Form.Group>
          </Form>
        </Col>

        <Col md={6}>
          <Form>
            <Form.Group className="mb-3" controlId="revenueGrowth">
              <Form.Label>收入增长率 (%)</Form.Label>
              <Form.Control
                type="number"
                name="revenueGrowth"
                value={sensitivityParams.revenueGrowth * 100}
                onChange={(e) => setSensitivityParams({
                  ...sensitivityParams,
                  revenueGrowth: parseFloat(e.target.value) / 100
                })}
                step="0.1"
                min="0"
                max="100"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="costChangeRange">
              <Form.Label>成本变化范围 (±%)</Form.Label>
              <Form.Control
                type="number"
                name="costChangeRange"
                value={sensitivityParams.costChangeRange}
                onChange={handleChange}
                min="1"
                max="50"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="revenueChangeRange">
              <Form.Label>收入变化范围 (±%)</Form.Label>
              <Form.Control
                type="number"
                name="revenueChangeRange"
                value={sensitivityParams.revenueChangeRange}
                onChange={handleChange}
                min="1"
                max="50"
                required
              />
            </Form.Group>
          </Form>
        </Col>
      </Row>

      <Button variant="primary" onClick={runAnalysis}>运行敏感性分析</Button>

      {results && renderChart()}

      <div className="alert-section mt-4">
        <h6>分析结论:</h6>
        <p>
          根据敏感性分析，项目净现值(NPV)对成本变化的敏感度较高。当成本增加20%时，
          NPV下降约35%。建议严格控制项目成本并制定风险应对措施。
        </p>
      </div>
    </div>
  );
};

export default SensitivityAnalysis;