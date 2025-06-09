// src/pages/CostEstimation.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs, Tab, Container, Card, Row, Col } from 'react-bootstrap';
import CocomoForm from '../components/cost/CocomoForm';
import FunctionPointForm from '../components/cost/FunctionPointForm';
import RegressionAnalysisForm from '../components/cost/RegressionAnalysisForm';
import CostComparisonChart from '../components/cost/CostComparisonChart';
import {
  calculateCocomo,
  calculateFunctionPoints,
  runRegressionAnalysis,
  getCostEstimates
} from '../services/costService';

export default function CostEstimation() {
  const { projectId } = useParams();
  const [activeTab, setActiveTab] = useState('cocomo');
  const [estimates, setEstimates] = useState([]);

  useEffect(() => {
    const loadEstimates = async () => {
      const data = await getCostEstimates(projectId);
      setEstimates(data);
    };
    loadEstimates();
  }, [projectId]);

  const handleCocomoSubmit = async (formData) => {
    const result = await calculateCocomo({ ...formData, projectId });
    setEstimates([...estimates, result]);
  };

  const handleFunctionPointsSubmit = async (formData) => {
    const result = await calculateFunctionPoints({ ...formData, projectId });
    setEstimates([...estimates, result]);
  };

  const handleRegressionSubmit = async (formData) => {
    const result = await runRegressionAnalysis({ ...formData, projectId });
    setEstimates([...estimates, result]);
  };

  return (
    <Container>
      <h2 className="mb-4">成本估算</h2>

      <Tabs activeKey={activeTab} onSelect={k => setActiveTab(k)} className="mb-3">
        <Tab eventKey="cocomo" title="COCOMO模型">
          <Card className="mt-3">
            <Card.Body>
              <CocomoForm onSubmit={handleCocomoSubmit} />
            </Card.Body>
          </Card>
        </Tab>
        <Tab eventKey="function-points" title="功能点分析">
          <Card className="mt-3">
            <Card.Body>
              <FunctionPointForm onSubmit={handleFunctionPointsSubmit} />
            </Card.Body>
          </Card>
        </Tab>
        <Tab eventKey="regression" title="回归分析">
          <Card className="mt-3">
            <Card.Body>
              <RegressionAnalysisForm onSubmit={handleRegressionSubmit} />
            </Card.Body>
          </Card>
        </Tab>
        <Tab eventKey="comparison" title="结果比较">
          <Card className="mt-3">
            <Card.Body>
              <h4>估算结果对比</h4>
              {estimates.length > 0 ? (
                <CostComparisonChart estimates={estimates} />
              ) : (
                <p>暂无估算数据，请先进行计算</p>
              )}

              <div className="mt-4">
                <h5>历史估算记录</h5>
                <Row>
                  {estimates.map(est => (
                    <Col md={4} key={est.estimate_id} className="mb-3">
                      <Card>
                        <Card.Body>
                          <Card.Title>{est.model_type}</Card.Title>
                          <Card.Text>
                            <strong>估算成本:</strong> ¥{est.estimated_cost.toFixed(2)}
                          </Card.Text>
                          <Card.Text>
                            <small className="text-muted">
                              {new Date(est.created_at).toLocaleString()}
                            </small>
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>
            </Card.Body>
          </Card>
        </Tab>
      </Tabs>
    </Container>
  );
}