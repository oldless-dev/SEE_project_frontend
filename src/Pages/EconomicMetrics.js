// src/pages/EconomicMetrics.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap';
import MetricResults from '../components/metrics/MetricResults';
import MetricHistoryChart from '../components/metrics/MetricHistoryChart';
import {
  calculateEconomicMetrics,
  getEconomicMetricsHistory
} from '../services/metricService';

export default function EconomicMetrics() {
  const { projectId } = useParams();
  const [formData, setFormData] = useState({
    initialInvestment: 0,
    discountRate: 0.1,
    cashFlows: [0, 0, 0, 0, 0]
  });
  const [results, setResults] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const loadHistory = async () => {
      const data = await getEconomicMetricsHistory(projectId);
      setHistory(data);
    };
    loadHistory();
  }, [projectId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: parseFloat(value) });
  };

  const handleCashFlowChange = (index, value) => {
    const newCashFlows = [...formData.cashFlows];
    newCashFlows[index] = parseFloat(value) || 0;
    setFormData({ ...formData, cashFlows: newCashFlows });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const metrics = await calculateEconomicMetrics({
      ...formData,
      projectId
    });
    setResults(metrics);
    setHistory([...history, metrics]);
  };

  return (
    <Container>
      <h2 className="mb-4">经济指标分析</h2>

      <Row>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>初始投资 (¥)</Form.Label>
                  <Form.Control
                    type="number"
                    name="initialInvestment"
                    value={formData.initialInvestment}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>折现率 (%)</Form.Label>
                  <Form.Control
                    type="number"
                    name="discountRate"
                    step="0.01"
                    value={formData.discountRate * 100}
                    onChange={(e) => setFormData({
                      ...formData,
                      discountRate: parseFloat(e.target.value) / 100
                    })}
                    required
                  />
                </Form.Group>

                <h5>现金流预测 (¥)</h5>
                {formData.cashFlows.map((flow, index) => (
                  <Form.Group key={index} className="mb-3">
                    <Form.Label>第 {index + 1} 年</Form.Label>
                    <Form.Control
                      type="number"
                      value={flow}
                      onChange={(e) => handleCashFlowChange(index, e.target.value)}
                      required
                    />
                  </Form.Group>
                ))}

                <Button variant="primary" type="submit">计算指标</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          {results && (
            <Card className="mb-4">
              <Card.Body>
                <MetricResults results={results} />
              </Card.Body>
            </Card>
          )}

          {history.length > 0 && (
            <Card>
              <Card.Body>
                <h5>历史指标趋势</h5>
                <MetricHistoryChart history={history} />
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
}