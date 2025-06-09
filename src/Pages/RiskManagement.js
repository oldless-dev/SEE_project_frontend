// src/pages/RiskManagement.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs, Tab, Container, Card, Form, Button } from 'react-bootstrap';
import SensitivityAnalysis from '../components/risk/SensitivityAnalysis';
import DecisionTree from '../components/risk/DecisionTree';
import MonteCarloSimulation from '../components/risk/MonteCarloSimulation';
import { getProjectRisks } from '../services/riskService';

export default function RiskManagement() {
  const { projectId } = useParams();
  const [activeTab, setActiveTab] = useState('sensitivity');
  const [risks, setRisks] = useState([]);

  useEffect(() => {
    const loadRisks = async () => {
      const data = await getProjectRisks(projectId);
      setRisks(data);
    };
    loadRisks();
  }, [projectId]);

  return (
    <Container>
      <h2 className="mb-4">风险管理</h2>

      <Tabs activeKey={activeTab} onSelect={k => setActiveTab(k)} className="mb-3">
        <Tab eventKey="sensitivity" title="敏感性分析">
          <Card className="mt-3">
            <Card.Body>
              <SensitivityAnalysis projectId={projectId} risks={risks} />
            </Card.Body>
          </Card>
        </Tab>
        <Tab eventKey="decision-tree" title="决策树分析">
          <Card className="mt-3">
            <Card.Body>
              <DecisionTree projectId={projectId} risks={risks} />
            </Card.Body>
          </Card>
        </Tab>
        <Tab eventKey="monte-carlo" title="蒙特卡洛模拟">
          <Card className="mt-3">
            <Card.Body>
              <MonteCarloSimulation projectId={projectId} risks={risks} />
            </Card.Body>
          </Card>
        </Tab>
      </Tabs>

      <Card className="mt-4">
        <Card.Body>
          <h4>项目风险列表</h4>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>风险描述</th>
                  <th>发生概率</th>
                  <th>影响金额</th>
                  <th>风险值</th>
                  <th>分析类型</th>
                </tr>
              </thead>
              <tbody>
                {risks.map(risk => (
                  <tr key={risk.risk_id}>
                    <td>{risk.description}</td>
                    <td>{(risk.probability * 100).toFixed(2)}%</td>
                    <td>¥{risk.impact.toFixed(2)}</td>
                    <td>¥{(risk.probability * risk.impact).toFixed(2)}</td>
                    <td>{risk.analysis_type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Button variant="outline-primary">添加新风险</Button>
        </Card.Body>
      </Card>
    </Container>
  );
}