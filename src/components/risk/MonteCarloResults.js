// src/components/risk/MonteCarloResults.js
import React from 'react';
import { Card, Row, Col, Table } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// 注册 Chart.js 组件
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MonteCarloResults = ({ results }) => {
  if (!results) return null;

  // 准备图表数据
  const npvValues = results.npv_values || [];

  // 计算基本统计数据
  const minNPV = Math.min(...npvValues);
  const maxNPV = Math.max(...npvValues);
  const medianNPV = npvValues.sort((a, b) => a - b)[Math.floor(npvValues.length / 2)];
  const stdDevNPV = Math.sqrt(npvValues.reduce((acc, val) => acc + Math.pow(val - results.mean_npv, 2), 0) / npvValues.length);

  // 计算负值比例
  const negativeNPVCount = npvValues.filter(v => v < 0).length;
  const negativeNPVPercentage = (negativeNPVCount / npvValues.length * 100).toFixed(2);

  // 为图表准备数据
  const getHistogramData = () => {
    const sortedValues = [...npvValues].sort((a, b) => a - b);
    const min = sortedValues[0];
    const max = sortedValues[sortedValues.length - 1];
    const range = max - min;
    const numBins = Math.min(10, npvValues.length); // 最多10个柱状图
    const binWidth = range / numBins;

    const bins = Array(numBins).fill(0);

    sortedValues.forEach(value => {
      const binIndex = Math.min(Math.floor((value - min) / binWidth), numBins - 1);
      bins[binIndex]++;
    });

    const labels = bins.map((_, i) => {
      const start = (min + i * binWidth).toFixed(0);
      const end = (min + (i + 1) * binWidth).toFixed(0);
      return `${start} - ${end}`;
    });

    return {
      labels,
      datasets: [{
        label: '模拟次数',
        data: bins,
        backgroundColor: 'rgba(67, 97, 238, 0.7)',
        borderColor: 'rgba(67, 97, 238, 1)',
        borderWidth: 1
      }]
    };
  };

  const chartData = getHistogramData();

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'NPV分布直方图'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: '模拟次数'
        }
      },
      x: {
        title: {
          display: true,
          text: 'NPV范围'
        }
      }
    }
  };

  return (
    <Card className="mt-4">
      <Card.Header as="h5">蒙特卡洛模拟结果</Card.Header>
      <Card.Body>
        <Row className="mb-4">
          <Col md={6}>
            <h6>基本统计数据</h6>
            <Table striped bordered>
              <tbody>
                <tr>
                  <td>平均NPV</td>
                  <td>{results.mean_npv.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>最小NPV</td>
                  <td>{minNPV.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>最大NPV</td>
                  <td>{maxNPV.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>中位数NPV</td>
                  <td>{medianNPV.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>NPV标准差</td>
                  <td>{stdDevNPV.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>NPV为负的概率</td>
                  <td>{negativeNPVPercentage}%</td>
                </tr>
              </tbody>
            </Table>
          </Col>
          <Col md={6}>
            <h6>NPV分布</h6>
            <div style={{ height: '250px' }}>
              <Bar data={chartData} options={chartOptions} />
            </div>
          </Col>
        </Row>

        <h6>模拟结果详情</h6>
        <div className="overflow-auto" style={{ maxHeight: '300px' }}>
          <Table striped bordered responsive>
            <thead>
              <tr>
                <th>模拟序号</th>
                <th>NPV值</th>
              </tr>
            </thead>
            <tbody>
              {npvValues.slice(0, 50).map((value, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{value.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        {npvValues.length > 50 && (
          <div className="text-center mt-2 text-muted">
            仅显示前50个模拟结果，共 {npvValues.length} 个结果
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default MonteCarloResults;